import path from 'path';
import { Font } from '@react-pdf/renderer';

// Register Inter font at module load (not inside components)
// Must use absolute filesystem paths for server-side PDF rendering
const fontsDir = path.join(process.cwd(), 'public', 'fonts');

Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(fontsDir, 'Inter-Regular.ttf'), fontWeight: 400 },
    { src: path.join(fontsDir, 'Inter-Bold.ttf'), fontWeight: 700 },
  ],
});

// Disable hyphenation for German text (prevents incorrect word breaks)
Font.registerHyphenationCallback((word: string) => [word]);
