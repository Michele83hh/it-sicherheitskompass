// Side-effect import to register fonts before rendering
import '@/lib/pdf/fonts';

import { renderToBuffer } from '@react-pdf/renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from '@/components/pdf/PDFDocument';
import type { PDFPayload } from '@/lib/pdf/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: PDFPayload = req.body;

    // Validate payload has required fields
    if (!payload.locale || !payload.company || !payload.categories) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const buffer = await renderToBuffer(
      <PDFDocument payload={payload} />
    );

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `NIS2-Readiness-Report-${timestamp}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'PDF generation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
