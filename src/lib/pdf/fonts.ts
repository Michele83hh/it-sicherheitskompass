import { Font } from '@react-pdf/renderer';

// Register Inter font at module load (not inside components)
// Using local woff2 files from Google Fonts CDN for reliable rendering
Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.woff2', fontWeight: 400 },
    { src: '/fonts/Inter-Bold.woff2', fontWeight: 700 },
  ],
});

// Disable hyphenation for German text (prevents incorrect word breaks)
Font.registerHyphenationCallback((word: string) => [word]);
