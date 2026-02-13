import type { NextApiRequest, NextApiResponse } from 'next';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);
const resolveMx = promisify(dns.resolveMx);

interface CheckResult {
  status: 'pass' | 'warn' | 'fail';
  value: string;
  detail: string;
}

interface EmailCheckResponse {
  domain: string;
  spf: CheckResult;
  dmarc: CheckResult;
  dkim: CheckResult;
  mx: CheckResult;
  score: number;
}

function extractDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  // Remove protocol
  domain = domain.replace(/^https?:\/\//, '');
  // If email, take domain part
  if (domain.includes('@')) domain = domain.split('@').pop()!;
  // Remove paths/ports
  domain = domain.split('/')[0].split(':')[0];
  return domain;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { domain: rawDomain } = req.body;
  if (!rawDomain || typeof rawDomain !== 'string') {
    return res.status(400).json({ error: 'Domain required' });
  }

  const domain = extractDomain(rawDomain);
  if (!domain || domain.length < 3 || !domain.includes('.')) {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  const result: EmailCheckResponse = {
    domain,
    spf: { status: 'fail', value: '', detail: '' },
    dmarc: { status: 'fail', value: '', detail: '' },
    dkim: { status: 'fail', value: '', detail: '' },
    mx: { status: 'fail', value: '', detail: '' },
    score: 0,
  };

  // SPF Check
  try {
    const txtRecords = await resolveTxt(domain);
    const spfRecord = txtRecords.flat().find((r) => r.startsWith('v=spf1'));
    if (spfRecord) {
      const hasAll = spfRecord.includes('-all');
      const hasSoftFail = spfRecord.includes('~all');
      result.spf = {
        status: hasAll ? 'pass' : hasSoftFail ? 'warn' : 'warn',
        value: spfRecord.length > 100 ? spfRecord.substring(0, 100) + '...' : spfRecord,
        detail: hasAll ? 'strict' : hasSoftFail ? 'softfail' : 'permissive',
      };
    } else {
      result.spf = { status: 'fail', value: '', detail: 'missing' };
    }
  } catch {
    result.spf = { status: 'fail', value: '', detail: 'no_txt_records' };
  }

  // DMARC Check
  try {
    const dmarcRecords = await resolveTxt(`_dmarc.${domain}`);
    const dmarcRecord = dmarcRecords.flat().find((r) => r.startsWith('v=DMARC1'));
    if (dmarcRecord) {
      const policyMatch = dmarcRecord.match(/p=(\w+)/);
      const policy = policyMatch ? policyMatch[1] : 'none';
      result.dmarc = {
        status: policy === 'reject' ? 'pass' : policy === 'quarantine' ? 'warn' : 'warn',
        value: dmarcRecord.length > 100 ? dmarcRecord.substring(0, 100) + '...' : dmarcRecord,
        detail: policy,
      };
    } else {
      result.dmarc = { status: 'fail', value: '', detail: 'missing' };
    }
  } catch {
    result.dmarc = { status: 'fail', value: '', detail: 'missing' };
  }

  // DKIM Check (try common selectors)
  const selectors = ['default', 'google', 'selector1', 'selector2', 'k1', 'mail', 'dkim'];
  let dkimFound = false;
  for (const selector of selectors) {
    try {
      const dkimRecords = await resolveTxt(`${selector}._domainkey.${domain}`);
      const dkimRecord = dkimRecords.flat().find((r) => r.includes('v=DKIM1') || r.includes('p='));
      if (dkimRecord) {
        result.dkim = {
          status: 'pass',
          value: `${selector}._domainkey`,
          detail: selector,
        };
        dkimFound = true;
        break;
      }
    } catch {
      // selector not found, try next
    }
  }
  if (!dkimFound) {
    result.dkim = { status: 'warn', value: '', detail: 'not_found' };
  }

  // MX Check
  try {
    const mxRecords = await resolveMx(domain);
    if (mxRecords.length > 0) {
      const sorted = mxRecords.sort((a, b) => a.priority - b.priority);
      result.mx = {
        status: 'pass',
        value: sorted.map((r) => `${r.priority} ${r.exchange}`).join(', '),
        detail: `${mxRecords.length}_records`,
      };
    } else {
      result.mx = { status: 'fail', value: '', detail: 'missing' };
    }
  } catch {
    result.mx = { status: 'fail', value: '', detail: 'missing' };
  }

  // Calculate score
  const checks = [result.spf, result.dmarc, result.dkim, result.mx];
  const points = checks.reduce((sum, c) => sum + (c.status === 'pass' ? 25 : c.status === 'warn' ? 12 : 0), 0);
  result.score = points;

  return res.status(200).json(result);
}
