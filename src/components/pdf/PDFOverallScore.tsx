import { Text, View } from '@react-pdf/renderer';
import { styles, COLORS, TRAFFIC_LIGHT_COLORS } from '@/lib/pdf/styles';
import type { PDFPayload, PDFMessages } from '@/lib/pdf/types';

interface PDFOverallScoreProps {
  overallScore: PDFPayload['overallScore'];
  messages: PDFMessages;
}

const PDFOverallScore = ({ overallScore, messages }: PDFOverallScoreProps) => {
  const trafficLightColor = TRAFFIC_LIGHT_COLORS[overallScore.trafficLight];

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.sectionTitle}>
        {messages['pdf.overallScore'] || 'Overall Readiness Level'}
      </Text>

      {/* Large percentage display with traffic light dot */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View
          style={[
            styles.trafficLightDot,
            { backgroundColor: trafficLightColor.dot, width: 16, height: 16, marginRight: 8 },
          ]}
        />
        <Text style={styles.scoreDisplay}>{overallScore.percentage}%</Text>
      </View>

      {/* Completion rate */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.completionRate'] || 'Completion Rate'}:</Text>
        <Text style={styles.value}>{overallScore.completionRate}%</Text>
      </View>

      {/* Questions answered */}
      <View style={styles.labelValue}>
        <Text style={styles.label}>{messages['pdf.answeredQuestions'] || 'Answered Questions'}:</Text>
        <Text style={styles.value}>
          {overallScore.answeredQuestions} / {overallScore.totalQuestions}
        </Text>
      </View>
    </View>
  );
};

export default PDFOverallScore;
