import { StyleSheet } from '@react-pdf/renderer';

// Color constants matching the web UI
export const COLORS = {
  primary: '#1e40af',        // Blue-800
  primaryLight: '#dbeafe',   // Blue-100
  red: '#dc2626',
  redBg: '#fef2f2',
  yellow: '#ca8a04',
  yellowBg: '#fefce8',
  green: '#16a34a',
  greenBg: '#f0fdf4',
  emerald500: '#10b981',
  emeraldBg: '#ecfdf5',
  slate900: '#0f172a',
  slate800: '#1e293b',
  slate300: '#cbd5e1',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray500: '#6b7280',
  gray700: '#374151',
  gray900: '#111827',
  white: '#ffffff',
} as const;

export const TRAFFIC_LIGHT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  red: { bg: COLORS.redBg, text: COLORS.red, dot: COLORS.red },
  yellow: { bg: COLORS.yellowBg, text: COLORS.yellow, dot: COLORS.yellow },
  green: { bg: COLORS.greenBg, text: COLORS.green, dot: COLORS.green },
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 11,
    paddingTop: 48,
    paddingBottom: 56,
    paddingLeft: 40,
    paddingRight: 40,
    color: COLORS.gray900,
  },
  // Header
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.gray500,
    marginBottom: 20,
  },
  // Sections
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.gray900,
    marginBottom: 8,
    marginTop: 16,
  },
  // Disclaimer
  disclaimerBox: {
    padding: 12,
    backgroundColor: COLORS.gray100,
    border: `1 solid ${COLORS.gray300}`,
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 8,
    color: COLORS.gray700,
    lineHeight: 1.5,
  },
  // Metadata
  metadataText: {
    fontSize: 8,
    color: COLORS.gray500,
    marginBottom: 2,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    color: COLORS.gray500,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Traffic light dot
  trafficLightDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  // Score bar background
  scoreBarBg: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    flex: 1,
  },
  // Bold text
  bold: {
    fontWeight: 700,
  },
  // SemiBold text
  semiBold: {
    fontWeight: 600,
  },
  // Label-value pair
  labelValue: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 9,
    color: COLORS.gray500,
    width: 120,
  },
  value: {
    fontSize: 9,
    color: COLORS.gray900,
    flex: 1,
  },
  // Score display
  scoreDisplay: {
    fontSize: 32,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 8,
  },
  // Traffic light status text
  statusText: {
    fontSize: 9,
    marginLeft: 6,
  },
  // Table styles (flex-based)
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    padding: 8,
    borderBottom: `1 solid ${COLORS.gray300}`,
    fontWeight: 700,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: `1 solid ${COLORS.gray200}`,
    fontSize: 10,
  },
  tableCell: {
    fontSize: 10,
  },
  // Recommendation card
  recCard: {
    marginBottom: 20,
    borderLeft: `3 solid ${COLORS.primary}`,
    paddingLeft: 10,
    paddingVertical: 4,
  },
  recTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.gray900,
    marginBottom: 4,
  },
  recDescription: {
    fontSize: 10,
    color: COLORS.gray700,
    marginBottom: 4,
  },
  recFirstStep: {
    fontSize: 10,
    color: COLORS.gray900,
    marginBottom: 4,
  },
  recBadge: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  badge: {
    fontSize: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
  },
  // Horizontal rule
  hr: {
    borderBottom: `1 solid ${COLORS.gray300}`,
    marginVertical: 12,
  },
  // Page-level section header (themed pages in additional analysis)
  pageHeader: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 4,
  },
  // Sub-section title (within a section, smaller than sectionTitle)
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.gray900,
    marginBottom: 6,
    marginTop: 12,
  },
  // Note/disclaimer text at bottom of sections
  noteText: {
    fontSize: 7,
    color: COLORS.gray500,
    marginTop: 8,
    lineHeight: 1.4,
  },
  // Visual divider between sections on same page
  sectionDivider: {
    borderBottom: `0.5 solid ${COLORS.gray200}`,
    marginVertical: 16,
  },
  // Summary bar with overall percentage (DSGVO, ISO, Progress)
  summaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.gray50,
    borderRadius: 4,
    marginBottom: 12,
  },
  // Summary bar label
  summaryLabel: {
    fontSize: 9,
    color: COLORS.gray700,
    width: 140,
  },
  // Summary bar large percentage
  summaryPercentage: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.primary,
    width: 50,
  },
});
