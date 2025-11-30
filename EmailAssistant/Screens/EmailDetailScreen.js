// EmailDetailScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  Surface, 
  Avatar,
  Button,
  Chip,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EmailDetailScreen = ({ navigation, route }) => {
  const { email } = route.params || {
    email: {
      sender: 'Prof. Ahmed Khan',
      subject: 'Project Submission Deadline',
      time: '10:30 AM',
      category: 'Important',
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Email Details</Text>
          <IconButton
            icon="dots-vertical"
            iconColor="white"
            size={24}
            onPress={() => {}}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Email Header Card */}
        <Card style={styles.headerCard} elevation={3}>
          <Card.Content>
            <View style={styles.senderSection}>
              <Avatar.Text
                size={55}
                label={email.sender.charAt(0)}
                style={styles.avatar}
              />
              <View style={styles.senderInfo}>
                <Text style={styles.senderName}>{email.sender}</Text>
                <Text style={styles.senderEmail}>professor@university.edu</Text>
                <View style={styles.metaInfo}>
                  <Text style={styles.timeText}>{email.time}</Text>
                  <Chip compact icon="tag" style={styles.categoryChip}>
                    {email.category}
                  </Chip>
                </View>
              </View>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.subject}>{email.subject}</Text>
          </Card.Content>
        </Card>

        {/* Email Body Card */}
        <Card style={styles.bodyCard} elevation={2}>
          <Card.Content>
            <Text style={styles.bodyText}>
              Dear Students,{'\n\n'}
              
              I hope this email finds you well. This is a reminder regarding the upcoming 
              semester project submission deadline.{'\n\n'}
              
              <Text style={styles.boldText}>Important Details:</Text>{'\n'}
              • <Text style={styles.boldText}>Deadline:</Text> Next Friday, 5:00 PM{'\n'}
              • <Text style={styles.boldText}>Format:</Text> PDF Document{'\n'}
              • <Text style={styles.boldText}>Submission:</Text> Through LMS Portal{'\n\n'}
              
              Please make sure to include the following in your project:{'\n'}
              1. Complete source code{'\n'}
              2. Documentation (README file){'\n'}
              3. Screenshots of working application{'\n'}
              4. Project presentation slides{'\n\n'}
              
              Late submissions will not be accepted unless you have a valid reason and 
              prior approval from the department.{'\n\n'}
              
              If you have any questions or concerns, please feel free to reach out during 
              office hours or reply to this email.{'\n\n'}
              
              Best regards,{'\n'}
              Prof. Ahmed Khan{'\n'}
              Department of Computer Science
            </Text>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <Card style={styles.actionsCard} elevation={2}>
          <Card.Content>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            
            <Button
              mode="contained"
              icon="reply"
              onPress={() => navigation.navigate('ComposeEmail')}
              style={styles.actionButton}
              buttonColor="#667eea"
            >
              Reply
            </Button>

            <Button
              mode="outlined"
              icon="reply-all"
              onPress={() => {}}
              style={styles.actionButton}
              textColor="#667eea"
            >
              Reply All
            </Button>

            <Button
              mode="outlined"
              icon="share"
              onPress={() => {}}
              style={styles.actionButton}
              textColor="#667eea"
            >
              Forward
            </Button>
          </Card.Content>
        </Card>

        {/* N8N Auto-Reply Section */}
        <Card style={styles.autoReplyCard} elevation={2}>
          <Card.Content>
            <View style={styles.autoReplyHeader}>
              <IconButton icon="robot" size={24} iconColor="#667eea" />
              <Text style={styles.autoReplyTitle}>N8N Auto-Reply</Text>
            </View>
            
            <Text style={styles.autoReplyText}>
              AI suggests: "Thank you for the reminder, Professor. I will submit 
              the project before the deadline."
            </Text>

            <Button
              mode="contained-tonal"
              icon="send"
              onPress={() => {}}
              style={styles.autoReplyButton}
            >
              Send Auto-Reply
            </Button>
          </Card.Content>
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  senderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: '#667eea',
  },
  senderInfo: {
    marginLeft: 15,
    flex: 1,
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 3,
  },
  senderEmail: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  categoryChip: {
    height: 26,
  },
  divider: {
    marginVertical: 15,
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 28,
  },
  bodyCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1E293B',
  },
  actionsCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
  },
  actionButton: {
    marginBottom: 10,
    borderRadius: 12,
  },
  autoReplyCard: {
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
  },
  autoReplyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  autoReplyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginLeft: 5,
  },
  autoReplyText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  autoReplyButton: {
    borderRadius: 12,
  },
});

export default EmailDetailScreen;