import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS } from '@/lib/pdf/styles';
import type { PDFProgress, PDFMessages } from '@/lib/pdf/types';

interface PDFProgressProps {
  progress: PDFProgress;
  messages: PDFMessages;
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'not-started': { bg: COLORS.gray100, text: COLORS.gray700 },
  'in-progress': { bg: '#dbeafe', text: '#1e40af' },
  'completed': { bg: '#dcfce7', text: '#166534' },
};

const PDFProgressSection = ({ progress, messages }: PDFProgressProps) => {
  const isAtZero = progress.completionPercentage === 0 && progress.completed === 0 && progress.inProgress === 0;

  return (
    <View>
      {/* Overall progress bar */}
      <View wrap={false} style={[styles.summaryBar, { flexDirection: 'column', padding: 12 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, width: '100%' }}>
          <Text style={{ fontSize: 9, color: COLORS.gray700 }}>
            {isAtZero
              ? (messages['pdf.progress.startPointTitle'] || 'Ihr Startpunkt')
              : (messages['pdf.progress.overall'] || 'Overall Progress')
            }
          </Text>
          <Text style={styles.summaryPercentage}>
            {progress.completionPercentage}%
          </Text>
        </View>

        {/* Bar */}
        <View style={{ height: 8, backgroundColor: COLORS.gray200, borderRadius: 4, marginBottom: 8 }}>
          <View style={{
            width: `${Math.min(progress.completionPercentage, 100)}%`,
            height: 8,
            backgroundColor: COLORS.green,
            borderRadius: 4,
          }} />
        </View>

        {/* Positive reframing when at 0% */}
        {isAtZero ? (
          <View style={{
            backgroundColor: COLORS.primaryLight,
            border: `1 solid ${COLORS.primary}`,
            borderRadius: 4,
            padding: 8,
          }}>
            <Text style={{ fontSize: 8, color: COLORS.primary, lineHeight: 1.4 }}>
              {messages['pdf.progress.startPointText'] || 'Sie haben noch keine Maßnahme als umgesetzt markiert — das ist Ihr Ausgangspunkt. Mit den Quick Wins aus der Roadmap können Sie sofort starten.'}
            </Text>
          </View>
        ) : (
          /* Status counts */
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray300 }} />
              <Text style={{ fontSize: 8, color: COLORS.gray700 }}>
                {progress.notStarted} {messages['pdf.progress.notStarted'] || 'Not Started'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#3b82f6' }} />
              <Text style={{ fontSize: 8, color: COLORS.gray700 }}>
                {progress.inProgress} {messages['pdf.progress.inProgress'] || 'In Progress'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.green }} />
              <Text style={{ fontSize: 8, color: COLORS.gray700 }}>
                {progress.completed} {messages['pdf.progress.completed'] || 'Completed'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Per-recommendation list */}
      {progress.items.map((item, index) => {
        const sc = STATUS_COLORS[item.status] || STATUS_COLORS['not-started'];
        return (
          <View
            key={index}
            wrap={false}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 4,
              paddingHorizontal: 6,
              borderBottom: `0.5 solid ${COLORS.gray200}`,
              backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.gray50,
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 8, color: COLORS.gray900, flex: 1 }}>
              {item.title}
            </Text>
            <View style={{
              backgroundColor: sc.bg,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 3,
            }}>
              <Text style={{ fontSize: 7, fontWeight: 600, color: sc.text }}>
                {messages[`pdf.progress.status.${item.status}`] || item.status}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default PDFProgressSection;
