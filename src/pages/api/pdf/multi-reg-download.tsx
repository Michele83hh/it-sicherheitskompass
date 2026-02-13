// Side-effect import to register fonts before rendering
import '@/lib/pdf/fonts';

import { renderToBuffer } from '@react-pdf/renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import PDFMultiRegDocument from '@/components/pdf/PDFMultiRegDocument';
import type { MultiRegPDFPayload } from '@/lib/pdf/multi-reg-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: MultiRegPDFPayload = req.body;

    // Validate payload
    if (!payload.locale || !payload.entries || payload.entries.length === 0) {
      return res.status(400).json({ error: 'Invalid payload: need locale and at least one entry' });
    }

    const buffer = await renderToBuffer(
      <PDFMultiRegDocument payload={payload} />
    );

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `IT-Sicherheitskompass-Gesamtbericht-${timestamp}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('Multi-reg PDF generation error:', error);
    res.status(500).json({
      error: 'PDF generation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
