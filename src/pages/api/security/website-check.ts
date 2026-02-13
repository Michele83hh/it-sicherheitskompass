import type { NextApiRequest, NextApiResponse } from 'next';

interface HeaderCheck {
  status: 'pass' | 'warn' | 'fail';
  value: string;
  detail: string;
}

interface WebsiteCheckResponse {
  url: string;
  https: HeaderCheck;
  hsts: HeaderCheck;
  csp: HeaderCheck;
  xFrameOptions: HeaderCheck;
  xContentType: HeaderCheck;
  referrerPolicy: HeaderCheck;
  permissionsPolicy: HeaderCheck;
  score: number;
}

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url: rawUrl } = req.body;
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ error: 'URL required' });
  }

  const url = normalizeUrl(rawUrl);

  const result: WebsiteCheckResponse = {
    url,
    https: { status: 'fail', value: '', detail: '' },
    hsts: { status: 'fail', value: '', detail: '' },
    csp: { status: 'fail', value: '', detail: '' },
    xFrameOptions: { status: 'fail', value: '', detail: '' },
    xContentType: { status: 'fail', value: '', detail: '' },
    referrerPolicy: { status: 'fail', value: '', detail: '' },
    permissionsPolicy: { status: 'fail', value: '', detail: '' },
    score: 0,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'IT-Sicherheitskompass Security Check/1.0' },
    });

    clearTimeout(timeout);

    const headers = response.headers;
    const finalUrl = response.url;

    // HTTPS Check
    if (finalUrl.startsWith('https://')) {
      result.https = { status: 'pass', value: 'HTTPS', detail: 'active' };
    } else {
      result.https = { status: 'fail', value: 'HTTP', detail: 'no_https' };
    }

    // HSTS
    const hsts = headers.get('strict-transport-security');
    if (hsts) {
      const hasPreload = hsts.includes('preload');
      const maxAgeMatch = hsts.match(/max-age=(\d+)/);
      const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : 0;
      result.hsts = {
        status: maxAge >= 31536000 ? 'pass' : 'warn',
        value: hsts.length > 80 ? hsts.substring(0, 80) + '...' : hsts,
        detail: hasPreload ? 'preload' : maxAge >= 31536000 ? 'strong' : 'weak',
      };
    } else {
      result.hsts = { status: 'fail', value: '', detail: 'missing' };
    }

    // CSP
    const csp = headers.get('content-security-policy');
    if (csp) {
      result.csp = {
        status: 'pass',
        value: csp.length > 80 ? csp.substring(0, 80) + '...' : csp,
        detail: 'present',
      };
    } else {
      result.csp = { status: 'fail', value: '', detail: 'missing' };
    }

    // X-Frame-Options
    const xfo = headers.get('x-frame-options');
    if (xfo) {
      result.xFrameOptions = {
        status: 'pass',
        value: xfo,
        detail: xfo.toLowerCase(),
      };
    } else {
      result.xFrameOptions = { status: 'warn', value: '', detail: 'missing' };
    }

    // X-Content-Type-Options
    const xcto = headers.get('x-content-type-options');
    if (xcto && xcto.toLowerCase() === 'nosniff') {
      result.xContentType = { status: 'pass', value: xcto, detail: 'nosniff' };
    } else {
      result.xContentType = { status: 'fail', value: xcto || '', detail: 'missing' };
    }

    // Referrer-Policy
    const rp = headers.get('referrer-policy');
    if (rp) {
      const strong = ['no-referrer', 'strict-origin-when-cross-origin', 'same-origin', 'strict-origin'];
      result.referrerPolicy = {
        status: strong.includes(rp.toLowerCase()) ? 'pass' : 'warn',
        value: rp,
        detail: rp.toLowerCase(),
      };
    } else {
      result.referrerPolicy = { status: 'warn', value: '', detail: 'missing' };
    }

    // Permissions-Policy
    const pp = headers.get('permissions-policy');
    if (pp) {
      result.permissionsPolicy = {
        status: 'pass',
        value: pp.length > 80 ? pp.substring(0, 80) + '...' : pp,
        detail: 'present',
      };
    } else {
      result.permissionsPolicy = { status: 'warn', value: '', detail: 'missing' };
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown';
    if (message.includes('abort')) {
      return res.status(408).json({ error: 'timeout', detail: 'Website did not respond within 10 seconds' });
    }
    return res.status(502).json({ error: 'fetch_failed', detail: message });
  }

  // Calculate score
  const checks = [result.https, result.hsts, result.csp, result.xFrameOptions, result.xContentType, result.referrerPolicy, result.permissionsPolicy];
  const maxPoints = checks.length;
  const earned = checks.reduce((sum, c) => sum + (c.status === 'pass' ? 1 : c.status === 'warn' ? 0.5 : 0), 0);
  result.score = Math.round((earned / maxPoints) * 100);

  return res.status(200).json(result);
}
