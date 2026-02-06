import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFCompanyProfile, PDFMessages } from '@/lib/pdf/types';

interface PDFCompanyProfileProps {
  company: PDFCompanyProfile;
  messages: PDFMessages;
  locale: 'de' | 'en';
}

const PDFCompanyProfileComponent = ({ company, messages, locale }: PDFCompanyProfileProps) => {
  // Format numbers with locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(num);
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Get classification color
  const getClassificationColor = () => {
    switch (company.classificationCategory) {
      case 'besonders-wichtig':
        return COLORS.red;
      case 'wichtig':
        return COLORS.yellow;
      case 'nicht-betroffen':
        return COLORS.green;
      default:
        return COLORS.gray500;
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.companyProfile'] || 'Company Profile'}
      </Text>

      {/* Sector */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.sector'] || 'Sector'}:</Text>
        <Text style={styles.value}>{company.sectorName}</Text>
      </View>

      {/* Subsector (if present) */}
      {company.subsectorName && (
        <View style={styles.labelValue}>
          <Text style={styles.label}>{messages['pdf.subsector'] || 'Subsector'}:</Text>
          <Text style={styles.value}>{company.subsectorName}</Text>
        </View>
      )}

      {/* Employees */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.employees'] || 'Employees'}:</Text>
        <Text style={styles.value}>{formatNumber(company.employees)}</Text>
      </View>

      {/* Annual Revenue */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.annualRevenue'] || 'Annual Revenue'}:</Text>
        <Text style={styles.value}>{formatCurrency(company.annualRevenue)}</Text>
      </View>

      {/* Classification - with color */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.classification'] || 'Classification'}:</Text>
        <Text style={[styles.value, { fontWeight: 700, color: getClassificationColor() }]}>
          {company.classification}
        </Text>
      </View>

      {/* Legal Reference - ALWAYS in German */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>Rechtsgrundlage:</Text>
        <Text style={styles.value}>{company.legalReference}</Text>
      </View>
    </View>
  );
};

export default PDFCompanyProfileComponent;
