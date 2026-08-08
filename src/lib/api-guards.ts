import dns from 'dns';
import { promisify } from 'util';
import type { NextApiRequest, NextApiResponse } from 'next';

const lookup = promisify(dns.lookup);

/**
 * Adressbereiche, die von aussen nie Ziel einer Pruefung sein duerfen:
 * Loopback, private Netze, Link-Local (inkl. Cloud-Metadatendienst 169.254.169.254),
 * Carrier-Grade NAT und die IPv6-Entsprechungen.
 */
function isBlockedAddress(ip: string, family: number): boolean {
  if (family === 6) {
    const v6 = ip.toLowerCase();
    if (v6 === '::1' || v6 === '::') return true;
    if (v6.startsWith('fe80') || v6.startsWith('fc') || v6.startsWith('fd')) return true;
    // IPv4-gemappte Adressen wie ::ffff:127.0.0.1 mitpruefen
    const mapped = v6.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isBlockedAddress(mapped[1], 4);
    return false;
  }

  const p = ip.split('.').map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n))) return true;
  const [a, b] = p;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 169 && b === 254) return true;          // Link-Local + Metadaten
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a >= 224) return true;                         // Multicast, reserviert
  return false;
}

/**
 * Loest den Hostnamen auf und lehnt interne Ziele ab. Ohne diese Pruefung ist
 * jeder serverseitige Abruf einer nutzergelieferten URL ein SSRF-Vektor.
 */
export async function assertPublicHost(hostname: string): Promise<void> {
  const { address, family } = await lookup(hostname);
  if (isBlockedAddress(address, family)) {
    throw new Error('blocked_target');
  }
}

/**
 * Folgt Weiterleitungen von Hand und prueft jedes Ziel erneut — sonst genuegt
 * eine oeffentliche URL, die auf 127.0.0.1 weiterleitet, um die Sperre zu umgehen.
 */
export async function safeFetch(
  startUrl: string,
  init: RequestInit,
  maxRedirects = 3,
): Promise<Response> {
  let url = new URL(startUrl);

  for (let hop = 0; hop <= maxRedirects; hop++) {
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('blocked_protocol');
    }
    await assertPublicHost(url.hostname);

    const res = await fetch(url.toString(), { ...init, redirect: 'manual' });
    const location = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && location) {
      url = new URL(location, url);
      continue;
    }
    return res;
  }
  throw new Error('too_many_redirects');
}

/**
 * Speicherbasiertes Limit pro IP. Bewusst einfach gehalten: auf einer
 * serverlosen Plattform gilt es je Instanz, bremst aber Schleifen und
 * einfache Missbrauchsversuche wirksam.
 *
 * ponytail: In-Memory-Zaehler, kein geteilter Zustand. Reicht, solange kein
 * verteiltes Limit noetig ist — sonst Upstash/Redis davorschalten.
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  { limit = 10, windowMs = 60_000 } = {},
): boolean {
  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  // Pro Route zaehlen: sonst verbraucht der Website-Check das Budget des
  // E-Mail-Checks, obwohl beide nichts miteinander zu tun haben.
  const key = `${req.url?.split('?')[0] ?? 'unknown'}|${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
    res.status(429).json({ error: 'rate_limited', detail: 'Too many requests. Please try again later.' });
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Verhindert unbegrenztes Wachstum der Map bei vielen verschiedenen IPs.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
