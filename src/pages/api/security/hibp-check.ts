import type { NextApiRequest, NextApiResponse } from 'next';

interface Breach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  DataClasses: string[];
  IsVerified: boolean;
  LogoPath: string;
  Description: string;
}

interface HibpCheckResponse {
  email: string;
  breachCount: number;
  breaches: {
    name: string;
    title: string;
    domain: string;
    date: string;
    dataClasses: string[];
    verified: boolean;
  }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.HIBP_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'not_configured',
      detail: 'HIBP API key not configured. Set HIBP_API_KEY environment variable.',
    });
  }

  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address required' });
  }

  const sanitized = email.trim().toLowerCase();

  try {
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(sanitized)}?truncateResponse=false`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'IT-Sicherheitskompass',
        },
      }
    );

    if (response.status === 404) {
      // No breaches found — good news
      const result: HibpCheckResponse = { email: sanitized, breachCount: 0, breaches: [] };
      return res.status(200).json(result);
    }

    if (response.status === 429) {
      return res.status(429).json({ error: 'rate_limited', detail: 'Too many requests. Please try again later.' });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'hibp_error', detail: `HIBP returned ${response.status}` });
    }

    const breaches: Breach[] = await response.json();

    const result: HibpCheckResponse = {
      email: sanitized,
      breachCount: breaches.length,
      breaches: breaches.map((b) => ({
        name: b.Name,
        title: b.Title,
        domain: b.Domain,
        date: b.BreachDate,
        dataClasses: b.DataClasses,
        verified: b.IsVerified,
      })),
    };

    return res.status(200).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown';
    return res.status(502).json({ error: 'fetch_failed', detail: message });
  }
}
