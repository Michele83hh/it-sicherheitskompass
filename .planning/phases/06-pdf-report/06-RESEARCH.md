# Phase 6: PDF Report - Research

**Researched:** 2026-02-06
**Domain:** PDF generation in Next.js serverless environments with React-PDF
**Confidence:** MEDIUM

## Summary

PDF generation in Next.js 16 App Router using @react-pdf/renderer faces known architectural challenges that require specific workarounds. The library is React component-based and supports server-side rendering, but direct use in App Router Route Handlers has documented compatibility issues with React 19 and Next.js 15+.

The standard approach uses **@react-pdf/renderer 4.3.2** (current stable) with a **Pages Router API pattern** even within App Router projects. This hybrid approach is the battle-tested solution for serverless environments like Vercel. Font registration is critical for German Umlaute (ä, ö, ü, ß) support - Inter font requires explicit TTF/WOFF registration via Font.register(). For i18n, translations must be passed as props to PDF components since react-pdf doesn't inherit context.

Key challenges include 10-second Vercel timeout constraints (optimize via minimal font embedding, avoid large images), ensuring character encoding for German text, and maintaining consistent styling between UI and PDF (react-pdf supports only a subset of CSS, no grid, flex behaves differently).

**Primary recommendation:** Use Pages Router API route (pages/api/pdf/route.ts) with renderToBuffer(), register Inter font with TTF files from Google Fonts, pass next-intl messages as props to PDF components, return blob with proper headers for download.

## Standard Stack

The established libraries/tools for PDF generation in Next.js serverless environments:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @react-pdf/renderer | 4.3.2 | PDF creation from React components | Industry standard for React-based PDF generation, supports server-side rendering, component-based approach |
| @react-pdf/font | latest | Font subsetting and registration | Bundled with renderer, handles custom font loading |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @ag-media/react-pdf-table | latest | Declarative table layouts | Complex tabular data (category scores, recommendations) |
| next-intl | 4.8.2 (already in project) | Internationalization | Providing translations as props to PDF components |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @react-pdf/renderer | puppeteer + @sparticuz/chromium | Puppeteer: full CSS support, but 50MB+ bundle size, slower cold starts, HTML-to-PDF conversion overhead |
| @react-pdf/renderer | pdf-lib | pdf-lib: lower-level API, no React components, manual layout calculations, better for PDF manipulation than creation |
| Pages Router API | App Router Route Handler | App Router: cleaner pattern but broken with React 19, causes "ba.Component is not a constructor" error |

**Installation:**
```bash
npm install @react-pdf/renderer @ag-media/react-pdf-table
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── [locale]/
│       └── results/
│           └── page.tsx              # Results page with download button
├── pages/
│   └── api/
│       └── pdf/
│           └── download.ts           # PDF generation Route Handler (Pages Router)
├── components/
│   └── pdf/
│       ├── PDFDocument.tsx           # Main PDF document wrapper
│       ├── PDFCoverPage.tsx          # First page with disclaimer
│       ├── PDFCompanyProfile.tsx     # Company info section
│       ├── PDFScoresTable.tsx        # 10 categories with traffic lights
│       ├── PDFRecommendations.tsx    # Action items
│       └── PDFLegalRefs.tsx          # Legal references (always German)
└── lib/
    ├── pdf/
    │   ├── fonts.ts                  # Font registration logic
    │   ├── styles.ts                 # PDF StyleSheet definitions
    │   └── utils.ts                  # PDF helper functions
    └── nis2/                         # Existing data sources
```

### Pattern 1: Pages Router API with renderToBuffer
**What:** Hybrid architecture using Pages Router for PDF generation even in App Router project
**When to use:** All serverless PDF generation on Vercel (only working pattern with Next.js 15+)
**Example:**
```typescript
// pages/api/pdf/download.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from '@/components/pdf/PDFDocument';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract data from request body or query params
    const { locale, company, scores, recommendations } = req.body;

    // Render PDF to buffer (no React context available)
    const pdfBuffer = await renderToBuffer(
      <PDFDocument
        locale={locale}
        messages={messages[locale]} // Pass translations as props
        company={company}
        scores={scores}
        recommendations={recommendations}
      />
    );

    // Return as downloadable file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="NIS2-Report-${Date.now()}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ error: 'PDF generation failed' });
  }
}
```

### Pattern 2: Font Registration for German Characters
**What:** Explicit font registration to support Umlaute (ä, ö, ü, ß)
**When to use:** Before rendering any PDF component (once at module load)
**Example:**
```typescript
// lib/pdf/fonts.ts
import { Font } from '@react-pdf/renderer';

// Register Inter font with all weights (TTF format required)
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: '/fonts/Inter-Regular.ttf', // Public folder or URL
      fontWeight: 400,
    },
    {
      src: '/fonts/Inter-SemiBold.ttf',
      fontWeight: 600,
    },
    {
      src: '/fonts/Inter-Bold.ttf',
      fontWeight: 700,
    },
  ],
});

// Optional: Disable hyphenation if not needed
Font.registerHyphenationCallback(word => [word]);
```

### Pattern 3: I18n Props Passing (No Context)
**What:** Pass translations as props instead of using useTranslations hook
**When to use:** All PDF components (react-pdf doesn't support React context)
**Example:**
```typescript
// components/pdf/PDFDocument.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface PDFDocumentProps {
  locale: 'de' | 'en';
  messages: Record<string, string>; // Flattened translations
  company: CompanyProfile;
  scores: CategoryScore[];
}

const PDFDocument = ({ locale, messages, company, scores }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>{messages['pdf.title']}</Text>
      </View>
      {/* Legal refs ALWAYS in German, even if locale='en' */}
      <Text style={styles.legalRef}>{messages['pdf.legalRef.original']}</Text>
    </Page>
  </Document>
);
```

### Pattern 4: Table Layout with Flex
**What:** Use View components with flexDirection:"row" to simulate tables
**When to use:** Category scores table, recommendations list
**Example:**
```typescript
// components/pdf/PDFScoresTable.tsx (using @ag-media/react-pdf-table)
import { Table, TableHeader, TableCell, TableRow } from '@ag-media/react-pdf-table';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const PDFScoresTable = ({ categories, scores, messages }) => (
  <Table>
    <TableHeader>
      <TableCell style={styles.headerCell}>{messages['category']}</TableCell>
      <TableCell style={styles.headerCell}>{messages['score']}</TableCell>
      <TableCell style={styles.headerCell}>{messages['status']}</TableCell>
    </TableHeader>
    {categories.map((cat, idx) => (
      <TableRow key={cat.id}>
        <TableCell>{messages[`category.${cat.id}`]}</TableCell>
        <TableCell>{scores[idx]}%</TableCell>
        <TableCell>
          <TrafficLight score={scores[idx]} />
        </TableCell>
      </TableRow>
    ))}
  </Table>
);
```

### Anti-Patterns to Avoid
- **Using App Router Route Handlers directly:** Causes "ba.Component is not a constructor" error with React 19
- **Using useTranslations() in PDF components:** React context doesn't work in PDF rendering, pass messages as props
- **Loading fonts dynamically:** Register fonts at module load, not inside components
- **Assuming full CSS support:** react-pdf supports only subset (no grid, no media queries, flex behaves differently)
- **Client-side PDFDownloadLink with large data:** Causes browser memory issues, use server-side renderToBuffer

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Table layouts in PDFs | Custom View/Text flex arrangements | @ag-media/react-pdf-table | Handles row/column spanning, borders, cell padding, alignment - complex flex math already solved |
| Font subsetting | Manual TTF/WOFF subsetting tools | @react-pdf/font (built-in) | Automatically subsets fonts to only used characters, reduces file size |
| Traffic light icons | Custom SVG rendering | View with backgroundColor (circles with colors) | react-pdf SVG support is limited, simple colored circles are faster and smaller |
| Date formatting | Manual string manipulation | Intl.DateTimeFormat API | Locale-aware date formatting with timezone support |
| Page numbering | Manual page tracking | render={(props) => `${props.pageNumber} / ${props.totalPages}`} | Built-in render prop pattern in Page component |

**Key insight:** react-pdf has limited primitive support (no native table, limited SVG) - use proven libraries that work within these constraints rather than fighting the renderer.

## Common Pitfalls

### Pitfall 1: React 19 Version Mismatch
**What goes wrong:** Error "ba.Component is not a constructor" in App Router Route Handlers
**Why it happens:** @react-pdf/reconciler loads React 18.3.1 instead of React 19, version detection fails (React.version.startsWith('19') returns false)
**How to avoid:** Use Pages Router API routes (pages/api/) instead of App Router (app/api/)
**Warning signs:** TypeError during renderToBuffer/renderToStream, works in Pages Router but not App Router

### Pitfall 2: Missing Font Registration for Umlaute
**What goes wrong:** German characters (ä, ö, ü, ß) render as empty boxes or missing glyphs
**Why it happens:** Default fonts don't include extended Latin characters, font must be explicitly registered
**How to avoid:** Register Inter (or any font with German character support) via Font.register() with TTF/WOFF files before first render
**Warning signs:** English text renders fine, German special characters missing

### Pitfall 3: Context/Hooks Don't Work in PDFs
**What goes wrong:** useTranslations(), useContext(), etc. cause "hooks can only be called inside function components" error
**Why it happens:** PDF components are rendered server-side outside React tree, no context providers available
**How to avoid:** Pass all data (including translations) as props to PDF components
**Warning signs:** Error mentions "invalid hook call" or "context is undefined"

### Pitfall 4: Vercel 10-Second Timeout
**What goes wrong:** PDF generation times out on Vercel (function execution limit)
**Why it happens:** Large fonts (all weights embedded), high-res images, complex layouts with many pages
**How to avoid:**
  - Register only needed font weights (Regular + Bold, skip all 9 Inter weights)
  - Avoid embedding images > 100KB (use compression)
  - Limit PDF to essential content (no decorative elements)
  - Test with actual data volume (30 questions, 10 categories, 20 recommendations)
**Warning signs:** Local generation works, Vercel deployment times out or returns 504

### Pitfall 5: CSS Feature Assumptions
**What goes wrong:** Layouts break because expected CSS features don't exist (grid, media queries, :hover)
**Why it happens:** react-pdf implements subset of CSS, focused on print-friendly features
**How to avoid:**
  - Use flexbox only (no grid)
  - Absolute/fixed positioning works but avoid overuse
  - No pseudo-selectors, no animations, no transitions
  - Test early with react-pdf primitives
**Warning signs:** Styles that work in browser have no effect in PDF

### Pitfall 6: Image Format Compatibility
**What goes wrong:** JPEG 2000 or WebP images don't render in PDF
**Why it happens:** react-pdf uses pdfkit which supports limited image formats (JPEG, PNG)
**How to avoid:** Convert images to JPEG or PNG before embedding, or use react-pdf Image component with supported formats
**Warning signs:** Image components render blank spaces in PDF

## Code Examples

Verified patterns from official sources:

### Complete API Route Pattern
```typescript
// pages/api/pdf/download.ts
// Source: https://github.com/diegomura/react-pdf/discussions/2402
import { renderToBuffer } from '@react-pdf/renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from '@/components/pdf/PDFDocument';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { locale, company, scores, recommendations, messages } = req.body;

    // Render PDF to buffer (3-5 seconds typical)
    const buffer = await renderToBuffer(
      <PDFDocument
        locale={locale}
        messages={messages}
        company={company}
        scores={scores}
        recommendations={recommendations}
        generatedAt={new Date().toISOString()}
      />
    );

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="NIS2-Readiness-Report-${company.name}-${new Date().toISOString().split('T')[0]}.pdf"`
    );
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      error: 'PDF generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

### Font Registration at Module Load
```typescript
// lib/pdf/fonts.ts
// Source: https://react-pdf.org/fonts
import { Font } from '@react-pdf/renderer';

// Register once at module load (not inside components)
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 700,
    },
  ],
});

// Optional: Disable hyphenation for German text
Font.registerHyphenationCallback((word) => {
  // Return word as-is (no syllable splitting)
  return [word];
});
```

### PDF Document Structure with Disclaimer
```typescript
// components/pdf/PDFDocument.tsx
// Source: react-pdf official patterns
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface PDFDocumentProps {
  locale: 'de' | 'en';
  messages: Record<string, string>;
  company: {
    name: string;
    sector: string;
    size: string;
    classification: string;
  };
  scores: Array<{ categoryId: string; score: number; status: string }>;
  recommendations: Array<{ id: string; priority: string; text: string }>;
  generatedAt: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 40,
  },
  disclaimer: {
    fontSize: 8,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f3f4f6',
    border: '1 solid #d1d5db',
  },
  header: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
  },
  metadata: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 20,
  },
});

const PDFDocument = ({ locale, messages, company, scores, recommendations, generatedAt }: PDFDocumentProps) => (
  <Document>
    {/* Cover page with disclaimer */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{messages['pdf.title']}</Text>

      <View style={styles.disclaimer}>
        <Text>{messages['pdf.disclaimer']}</Text>
      </View>

      <View style={styles.metadata}>
        <Text>Rechtsstand: 2024-01-17 (NIS2-Richtlinie (EU) 2022/2555)</Text>
        <Text>Erstellungsdatum: {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(generatedAt))}</Text>
      </View>

      {/* Company profile */}
      <PDFCompanyProfile company={company} messages={messages} />
    </Page>

    {/* Scores page */}
    <Page size="A4" style={styles.page}>
      <PDFScoresTable scores={scores} messages={messages} />
    </Page>

    {/* Recommendations page */}
    <Page size="A4" style={styles.page}>
      <PDFRecommendations recommendations={recommendations} messages={messages} locale={locale} />
    </Page>
  </Document>
);

export default PDFDocument;
```

### Client-Side Download Button
```typescript
// app/[locale]/results/DownloadPDFButton.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface DownloadPDFButtonProps {
  company: CompanyProfile;
  scores: CategoryScore[];
  recommendations: Recommendation[];
}

export default function DownloadPDFButton({ company, scores, recommendations }: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const locale = useLocale();
  const t = useTranslations();

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Flatten next-intl messages for PDF props
      const messages = {
        'pdf.title': t('pdf.title'),
        'pdf.disclaimer': t('pdf.disclaimer'),
        'category.risk_management': t('category.risk_management'),
        // ... flatten all needed translations
      };

      const response = await fetch('/api/pdf/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          company,
          scores,
          recommendations,
          messages,
        }),
      });

      if (!response.ok) throw new Error('PDF generation failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NIS2-Report-${company.name}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert(t('pdf.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isGenerating}>
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? t('pdf.generating') : t('pdf.download')}
    </Button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| PDFDownloadLink (client-side) | renderToBuffer in API route | Next.js 13+ App Router | Client-side causes memory issues with large data, server-side more reliable |
| Custom font subsetting tools | Built-in @react-pdf/font subsetting | v2.0+ | Automatic character subsetting reduces file size without manual tooling |
| Puppeteer for all PDF generation | @react-pdf/renderer for component-based PDFs | 2020+ | Lighter bundle, faster cold starts, better DX for structured documents (reports, invoices) |
| Manual table layouts with View/Text | @ag-media/react-pdf-table | 2022+ | Declarative table API, handles complex layouts (spanning, borders) |

**Deprecated/outdated:**
- **next.config.js serverComponentsExternalPackages**: Required before Next.js 14.1.1 to prevent crashes, no longer needed in 14.1.1+
- **PDFViewer component for server rendering**: Only works in browser, use renderToBuffer for server-side
- **Dynamic imports with ssr:false for PDFDownloadLink**: Still needed for client-side, but server-side rendering is now preferred pattern

## Open Questions

Things that couldn't be fully resolved:

1. **Exact cold start time on Vercel with font registration**
   - What we know: renderToBuffer typically takes 3-5 seconds, font registration adds 500ms-1s
   - What's unclear: Impact of CDN-hosted fonts (Google Fonts URLs) vs. local fonts in public/ folder on Vercel cold start
   - Recommendation: Test both approaches in Vercel deployment, measure with Vercel Analytics. If timeout issues persist, use local fonts in public/ folder to avoid network latency.

2. **Inter font variable vs static for @react-pdf/renderer**
   - What we know: Variable fonts are OpenType format, react-pdf only supports TTF/WOFF, OpenType Variable fonts do not work properly
   - What's unclear: Whether Inter's static TTF files from Google Fonts include all German characters (ä, ö, ü, ß, ẞ)
   - Recommendation: Use static TTF files from Google Fonts (explicitly supports Latin Extended), verify in test PDF with sample German text containing all Umlaute.

3. **Legal reference rendering (always German) in English PDF**
   - What we know: Requirements state legal refs must stay in German original even in English UI version
   - What's unclear: Best UX pattern - show German text only, or German with English translation note, or German with tooltip
   - Recommendation: For PDF (no interactivity), show German text with small note "(Original German text, as legally required)" in English PDFs. Define in messages/en.json: "pdf.legalRef.note": "Original German text as per legal requirements".

4. **Traffic light icon implementation**
   - What we know: SVG support is limited in react-pdf, colored circles with View + backgroundColor work reliably
   - What's unclear: Whether to use emoji (🔴🟡🟢), unicode symbols (●), or styled View components
   - Recommendation: Use View with borderRadius:"50%" and backgroundColor (red/yellow/green hex colors). Most reliable, works in all PDF viewers, accessible (include score percentage as text).

5. **Performance with 30 questions + 20 recommendations**
   - What we know: Typical renderToBuffer takes 3-5 seconds, Vercel timeout is 10 seconds (Hobby plan) or 60 seconds (Pro plan)
   - What's unclear: Whether a 3-4 page PDF with this data volume fits within 10-second limit consistently
   - Recommendation: Test with maximum data volume (all 30 questions answered, all 20 recommendations shown). If timeout occurs, optimize fonts (only Regular + Bold weights), avoid images, or upgrade to Pro plan (60s timeout).

## Sources

### Primary (HIGH confidence)
- @react-pdf/renderer GitHub issues #2460, #2994, #2402 - App Router compatibility, renderToBuffer patterns
- @react-pdf/renderer npm package page - Current version (4.3.2), compatibility with React 19
- React-PDF official documentation (react-pdf.org) - Font registration, API, limitations

### Secondary (MEDIUM confidence)
- [NextJS 14 and react-pdf integration](https://benhur-martins.medium.com/nextjs-14-and-react-pdf-integration-ccd38b1fd515) - Next.js 14 compatibility notes
- [Render PDF server-side with NextJS 13.x.x Discussion](https://github.com/diegomura/react-pdf/discussions/2402) - Verified Pages Router pattern
- [Next.js App Router PDF generation Gist](https://gist.github.com/hajek-raven/d05204c948f773bbeff311b681a79df8) - Working Puppeteer alternative pattern
- [Google Webfonts Helper - Inter](https://gwfh.mranftl.com/fonts/inter?subsets=latin) - TTF/WOFF2 download for font registration
- [Creating PDF in React/Next.js: A Complete Guide](https://dominikfrackowiak.com/en/blog/react-pdf-with-next-js) - General patterns and examples
- [@ag-media/react-pdf-table GitHub](https://github.com/ag-media/react-pdf-table) - Declarative table library for react-pdf

### Tertiary (LOW confidence)
- WebSearch results for "react-pdf common mistakes" - General community observations, not verified with official sources
- Performance optimization discussions (GitHub #1691) - Dated 2023, may not reflect current optimizations
- Various blog posts on pdf-lib vs react-pdf tradeoffs - Anecdotal, not benchmarked for this specific use case

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - @react-pdf/renderer 4.3.2 is verified current version, widely used in production
- Architecture: MEDIUM - Pages Router pattern is confirmed workaround but feels like "hack", not official recommendation
- Pitfalls: HIGH - React 19 version mismatch, font registration, context issues are all documented in official GitHub issues
- Performance (10s timeout): LOW - No authoritative benchmarks for 3-4 page report with this specific data volume on Vercel

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days) - react-pdf is stable library, font/i18n patterns unlikely to change rapidly, but Next.js versions evolve quickly (monitor for Next.js 16 improvements)
