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
    fontSize: 10,
    padding: 40,
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
    fontSize: 14,
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
});
