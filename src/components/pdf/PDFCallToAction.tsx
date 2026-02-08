import { Text, View } from '@react-pdf/renderer';
import { COLORS } from '@/lib/pdf/styles';
import type { PDFMessages } from '@/lib/pdf/types';

interface PDFCallToActionProps {
  messages: PDFMessages;
  overallPercentage: number;
}

const PDFCallToAction = ({ messages, overallPercentage }: PDFCallToActionProps) => {
  const targetPercentage = Math.min(overallPercentage + 40, 95);

  return (
    <View style={{ flex: 1 }}>
      {/* Blue accent bar */}
      <View style={{ width: 40, height: 3, backgroundColor: COLORS.primary, marginBottom: 20 }} />

      {/* Title */}
      <Text style={{ fontSize: 22, fontWeight: 700, color: COLORS.gray900, marginBottom: 6 }}>
        {messages['pdf.cta.title'] || 'Ihr nächster Schritt'}
      </Text>

      <Text style={{ fontSize: 10, color: COLORS.gray500, marginBottom: 24 }}>
        {messages['pdf.cta.subtitle'] || 'Von der Analyse zur Umsetzung — so geht es weiter.'}
      </Text>

      {/* 3 options */}
      <View style={{ gap: 12, marginBottom: 24 }}>
        {/* Option 1: Quick Start */}
        <View style={{
          borderLeft: `3 solid ${COLORS.green}`,
          backgroundColor: COLORS.greenBg,
          padding: 14,
          borderRadius: 4,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <View style={{
              backgroundColor: COLORS.green,
              width: 20, height: 20, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.white }}>1</Text>
            </View>
            <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900 }}>
              {messages['pdf.cta.option1Title'] || 'Quick Wins sofort umsetzen'}
            </Text>
          </View>
          <Text style={{ fontSize: 9, color: COLORS.gray700, lineHeight: 1.5, paddingLeft: 28 }}>
            {messages['pdf.cta.option1Text'] || 'Starten Sie mit den als "Schnell" markierten Maßnahmen aus der Roadmap. Viele davon können intern umgesetzt werden — ohne externe Kosten, mit sofortiger Wirkung.'}
          </Text>
        </View>

        {/* Option 2: Expert Call */}
        <View style={{
          borderLeft: `3 solid ${COLORS.primary}`,
          backgroundColor: COLORS.primaryLight,
          padding: 14,
          borderRadius: 4,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <View style={{
              backgroundColor: COLORS.primary,
              width: 20, height: 20, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.white }}>2</Text>
            </View>
            <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900 }}>
              {messages['pdf.cta.option2Title'] || 'Ergebnisse mit Experten besprechen'}
            </Text>
          </View>
          <Text style={{ fontSize: 9, color: COLORS.gray700, lineHeight: 1.5, paddingLeft: 28 }}>
            {messages['pdf.cta.option2Text'] || 'Vereinbaren Sie ein 30-minütiges Erstgespräch, um die Ergebnisse einzuordnen und einen individuellen Umsetzungsplan zu entwickeln. Kostenfrei und unverbindlich.'}
          </Text>
        </View>

        {/* Option 3: Full implementation */}
        <View style={{
          borderLeft: `3 solid ${COLORS.yellow}`,
          backgroundColor: COLORS.yellowBg,
          padding: 14,
          borderRadius: 4,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <View style={{
              backgroundColor: COLORS.yellow,
              width: 20, height: 20, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 10, fontWeight: 700, color: COLORS.white }}>3</Text>
            </View>
            <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray900 }}>
              {messages['pdf.cta.option3Title'] || 'Begleitete NIS2-Umsetzung starten'}
            </Text>
          </View>
          <Text style={{ fontSize: 9, color: COLORS.gray700, lineHeight: 1.5, paddingLeft: 28 }}>
            {messages['pdf.cta.option3Text'] || 'Mit einem strukturierten Umsetzungsprogramm erreichen Sie innerhalb von 6–12 Monaten NIS2-Konformität — aufgeteilt in machbare Etappen, passend zu Ihrem Budget.'}
          </Text>
        </View>
      </View>

      {/* Starter package — No-Brainer entry offer */}
      <View style={{
        backgroundColor: COLORS.greenBg,
        border: `1 solid ${COLORS.green}`,
        borderRadius: 4,
        padding: 12,
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 9, fontWeight: 700, color: COLORS.green, marginBottom: 4 }}>
          {messages['pdf.cta.starterTitle'] || 'Empfohlen: NIS2-Startcheck'}
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, lineHeight: 1.5 }}>
          {messages['pdf.cta.starterText'] || 'Quick-Win-Maßnahmen aus Stufe 1 umsetzen — intern oder begleitet. Danach wissen Sie: Wo stehen Sie, was fordert die Behörde, und was kostet Phase 2/3 wirklich?'}
        </Text>
      </View>

      {/* Motivating stat box */}
      <View style={{
        backgroundColor: COLORS.gray50,
        border: `1 solid ${COLORS.gray200}`,
        borderRadius: 4,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 2 }}>
            {messages['pdf.cta.currentLabel'] || 'Heute'}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: 700, color: COLORS.red }}>
            {Math.round(overallPercentage)}%
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ height: 3, backgroundColor: COLORS.gray200, borderRadius: 2 }}>
            <View style={{ width: '60%', height: 3, backgroundColor: COLORS.primary, borderRadius: 2 }} />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 9, color: COLORS.gray500, marginBottom: 2 }}>
            {messages['pdf.cta.targetLabel'] || 'In 12 Monaten'}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: 700, color: COLORS.green }}>
            {targetPercentage}%
          </Text>
        </View>
      </View>

      {/* Contact — action-oriented with clear framing */}
      <View style={{
        backgroundColor: COLORS.primaryLight,
        border: `1 solid ${COLORS.primary}`,
        borderRadius: 4,
        padding: 16,
      }}>
        <Text style={{ fontSize: 11, fontWeight: 700, color: COLORS.primary, marginBottom: 4, textAlign: 'center' }}>
          {messages['pdf.cta.contactTitle'] || 'Nächster Schritt: Erstgespräch vereinbaren'}
        </Text>
        <Text style={{ fontSize: 8, color: COLORS.gray700, marginBottom: 8, textAlign: 'center', lineHeight: 1.4 }}>
          {messages['pdf.cta.contactSubtitle'] || '30 Minuten, kostenlos: Ihre Top-3-Lücken besprechen, Kostenschätzung prüfen, persönlichen Fahrplan erhalten.'}
        </Text>
        <View style={{
          borderTop: `0.5 solid ${COLORS.primary}`,
          paddingTop: 8,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: COLORS.gray900, marginBottom: 2 }}>
            {messages['pdf.cta.contactPlaceholder'] || 'Ihr NIS2-Berater: [Name / Firma]'}
          </Text>
          <Text style={{ fontSize: 9, color: COLORS.gray700 }}>
            {messages['pdf.cta.contactDetails'] || '[E-Mail] | [Telefon] | [Calendly-Link]'}
          </Text>
        </View>
      </View>

      {/* Urgency note */}
      <View style={{
        backgroundColor: COLORS.redBg,
        border: `1 solid ${COLORS.red}`,
        borderRadius: 4,
        padding: 10,
        marginBottom: 16,
      }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: COLORS.red, marginBottom: 2 }}>
          {messages['pdf.cta.urgencyTitle'] || 'NIS2-Umsetzungsgesetz in Kraft'}
        </Text>
        <Text style={{ fontSize: 7, color: COLORS.gray700, lineHeight: 1.4 }}>
          {messages['pdf.cta.urgencyText'] || 'Das NIS2-Umsetzungsgesetz ist seit dem 06.12.2025 in Kraft — Aufsichtsmaßnahmen können jederzeit beginnen. Die Behörden erwarten jetzt nachweisbare Schritte.'}
        </Text>
      </View>

      {/* Flex spacer */}
      <View style={{ flex: 1 }} />

      {/* Bottom note */}
      <Text style={{ fontSize: 7, color: COLORS.gray500, textAlign: 'center' }}>
        {messages['pdf.cta.footerNote'] || 'Dieser Report wurde automatisch generiert. Alle Angaben ohne Gewähr. Keine Rechtsberatung.'}
      </Text>
    </View>
  );
};

export default PDFCallToAction;
