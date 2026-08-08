import { describe, it, expect } from 'vitest';
import { assertPublicHost } from './api-guards';

/**
 * IP-Literale loest dns.lookup ohne Netzwerkzugriff direkt auf — der Test
 * prueft damit die Sperrlogik, nicht die Namensaufloesung.
 */
describe('assertPublicHost', () => {
  const blocked = [
    '127.0.0.1',        // Loopback
    '169.254.169.254',  // Cloud-Metadatendienst
    '10.0.0.1',         // privates Netz
    '172.16.0.1',       // privates Netz
    '172.31.255.254',   // obere Grenze 172.16/12
    '192.168.1.1',      // privates Netz
    '100.64.0.1',       // CGNAT
    '0.0.0.0',
    '224.0.0.1',        // Multicast
    '::1',              // IPv6 Loopback
    'fd00::1',          // IPv6 Unique Local
    'fe80::1',          // IPv6 Link-Local
  ];

  for (const ip of blocked) {
    it(`lehnt ${ip} ab`, async () => {
      await expect(assertPublicHost(ip)).rejects.toThrow('blocked_target');
    });
  }

  const allowed = ['8.8.8.8', '1.1.1.1', '172.15.0.1', '172.32.0.1', '93.184.216.34'];

  for (const ip of allowed) {
    it(`laesst ${ip} zu`, async () => {
      await expect(assertPublicHost(ip)).resolves.toBeUndefined();
    });
  }
});
