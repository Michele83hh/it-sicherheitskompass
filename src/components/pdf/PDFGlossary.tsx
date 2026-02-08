import { Text, View } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFMessages } from '@/lib/pdf/types';

interface PDFGlossaryProps {
  messages: PDFMessages;
}

const GLOSSARY_TERMS = [
  'isms', 'bia', 'rto', 'rpo', 'bcm', 'mfa',
  'pam', 'siem', 'soc', 'ioc', 'patchMgmt', 'zeroTrust',
  'riskTreatment', 'audit', 'compliance',
] as const;

const PDFGlossary = ({ messages }: PDFGlossaryProps) => {
  return (
    <View>
      <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 12, lineHeight: 1.4 }}>
        {messages['pdf.glossary.intro'] || 'Dieses Glossar erläutert die wichtigsten Fachbegriffe aus dem Report in verständlicher Sprache.'}
      </Text>

      {GLOSSARY_TERMS.map((termKey, idx) => {
        const term = messages[`pdf.glossary.${termKey}.term`] || termKey.toUpperCase();
        const definition = messages[`pdf.glossary.${termKey}.def`] || '';
        if (!definition) return null;

        return (
          <View
            key={termKey}
            wrap={false}
            style={{
              flexDirection: 'row',
              paddingVertical: 6,
              paddingHorizontal: 8,
              borderBottom: `0.5 solid ${COLORS.gray200}`,
              backgroundColor: idx % 2 === 0 ? COLORS.white : COLORS.gray50,
            }}
          >
            <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.primary, width: 110, paddingRight: 10 }}>
              {term}
            </Text>
            <Text style={{ fontSize: 8, color: COLORS.gray700, flex: 1, lineHeight: 1.4 }}>
              {definition}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PDFGlossary;
