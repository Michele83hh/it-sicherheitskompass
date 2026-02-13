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
import './bsi-grundschutz/config';
import './iso27001/config';
import './soc2/config';
import './pci-dss/config';
import './c5/config';
import './nist-csf/config';
import './cis-controls/config';
import './iso22301/config';
import './owasp-asvs/config';
