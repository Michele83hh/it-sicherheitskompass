// src/lib/regulations/init.ts

/**
 * Import this file once at app root to register all regulations.
 * Each regulation's config.ts calls registerRegulation() on import.
 */

import './nis2/config';
import './dsgvo/config';
import './kritis/config';
import './dora/config';
import './tisax/config';
import './cra/config';
// Future regulations will be added here when their config.ts is created:
// import './bsi-grundschutz/config';
