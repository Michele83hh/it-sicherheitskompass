/**
 * BSI IT-Grundschutz Building Block URL Mapping
 *
 * Maps building block IDs to their specific pages on the BSI website.
 * URLs point to the Edition 2023 HTML landing pages (not direct PDF downloads).
 *
 * Source: https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/
 *         Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/
 *         IT-Grundschutz-Bausteine/Bausteine_Download_Edition_node.html
 */

const BSI_BASE =
  'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2023';

const BSI_STANDARDS_PAGE =
  'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/bsi-standards_node.html';

const BSI_BAUSTEINE_PAGE =
  'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/IT-Grundschutz-Bausteine/Bausteine_Download_Edition_node.html';

/**
 * Mapping from building block ID to BSI URL.
 * Verified against live BSI website (2026-02-06).
 */
const BSI_BUILDING_BLOCK_URLS: Record<string, string> = {
  // ISMS - Sicherheitsmanagement
  'ISMS.1': `${BSI_BASE}/01_ISMS_Sicherheitsmanagement/ISMS_1_Sicherheitsmanagement_Edition_2023.html`,

  // ORP - Organisation und Personal
  'ORP.1': `${BSI_BASE}/02_ORP_Organisation_und_Personal/ORP_1_Organisation_Edition_2023.html`,
  'ORP.2': `${BSI_BASE}/02_ORP_Organisation_und_Personal/ORP_2_Personal_Edition_2023.html`,
  'ORP.3': `${BSI_BASE}/02_ORP_Organisation_und_Personal/ORP_3_Sensibilisierung_und_Schulung_Editon_2023.html`,
  'ORP.4': `${BSI_BASE}/02_ORP_Organisation_und_Personal/ORP_4_Identitaets_und_Berechtigungsmanagement_Editon_2023.html`,
  'ORP.5': `${BSI_BASE}/02_ORP_Organisation_und_Personal/ORP_5_Compliance_Management_Anforderungsmanagement_Edition_2023.html`,

  // CON - Konzepte und Vorgehensweisen
  'CON.1': `${BSI_BASE}/03_CON_Konzepte_und_Vorgehensweisen/CON_1_Kryptokonzept_Edition_2023.html`,
  'CON.3': `${BSI_BASE}/03_CON_Konzepte_und_Vorgehensweisen/CON_3_Datensicherungskonzept_Edition_2023.html`,
  'CON.8': `${BSI_BASE}/03_CON_Konzepte_und_Vorgehensweisen/CON_8_Software_Entwicklung_Edition_2023.html`,

  // OPS - Betrieb
  'OPS.1.1.3': `${BSI_BASE}/04_OPS_Betrieb/OPS_1_1_3_Patch_und_Aenderungsmanagement_Edition_2023.html`,
  'OPS.1.1.5': `${BSI_BASE}/04_OPS_Betrieb/OPS_1_1_5_Protokollierung_Edition_2023.html`,
  'OPS.1.1.6': `${BSI_BASE}/04_OPS_Betrieb/OPS_1_1_6_Software_Tests_und_Freigaben_Edition_2023.html`,

  // DER - Detektion und Reaktion
  'DER.2.1': `${BSI_BASE}/05_DER_Detektion_und_Reaktion/DER_2_1_Behandlung_von_Sicherheitsvorfaellen_Edition_2023.html`,
  'DER.4': `${BSI_BASE}/05_DER_Detektion_und_Reaktion/DER_4_Notfallmanagement_Edition_2023.html`,

  // NET - Netze und Kommunikation
  'NET.4.1': `${BSI_BASE}/09_NET_Netze_und_Kommunikation/NET_4_1_TK_Anlagen_Edition_2023.html`,
  'NET.4.2': `${BSI_BASE}/09_NET_Netze_und_Kommunikation/NET_4_2_VoIP_Edition_2023.html`,

  // BSI Standards
  'BSI-Standard 200-3': BSI_STANDARDS_PAGE,
  'BSI-Standard 200-4': BSI_STANDARDS_PAGE,
  'BSI-Standard 100-4': BSI_STANDARDS_PAGE,
};

/**
 * Returns the BSI URL for the primary building block in a reference string.
 *
 * Input examples:
 *   "BSI-Standard 200-3, ISMS.1" → URL for BSI-Standard 200-3
 *   "ORP.1, ISMS.1" → URL for ORP.1
 *   "DER.2.1" → URL for DER.2.1
 *
 * Falls back to the Bausteine overview page if no specific URL is found.
 */
export function getBsiUrl(bsiReference: string): string {
  // Extract the first reference (before comma)
  const primary = bsiReference.split(',')[0].trim();

  return BSI_BUILDING_BLOCK_URLS[primary] ?? BSI_BAUSTEINE_PAGE;
}

/**
 * Returns the primary building block ID from a reference string.
 * Used to display a shorter link text.
 */
export function getPrimaryBsiBlock(bsiReference: string): string {
  return bsiReference.split(',')[0].trim();
}
