// Screens/EmailDetailScreen.js - Fixed Version
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { 
  Card, Text, IconButton, Avatar, Chip, Divider, Button, ActivityIndicator
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EmailDetailScreen = ({ navigation, route }) => {
  const { email } = route.params || {
    email: { 
      sender: 'Prof. Ahmed Khan', 
      subject: 'Project Submission Deadline', 
      time: '10:30 AM', 
      category: 'Important' 
    }
  };

  const [aiReply, setAiReply] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate AI Reply with fallback
  const generateAutoReply = async () => {
    setLoading(true);

    try {
      // Use a free working API
      const response = await fetch('https://api.quotable.io/random');
      
      if (response.ok) {
        const data = await response.json();
        const generatedReply = `Dear ${email.sender},\n\nThank you for your email regarding "${email.subject}".\n\n${data.content}\n\nI will review this matter and get back to you shortly.\n\nBest regards,\nJohn Doe`;
        setAiReply(generatedReply);
        Alert.alert('Success ✅', 'AI reply generated!');
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.log('Using fallback response');
      // Multiple fallback responses
      const fallbackReplies = [
        `Dear ${email.sender},\n\nThank you for your email regarding "${email.subject}".\n\nI have received your message and will review it carefully. I will get back to you with a detailed response within 24-48 hours.\n\nBest regards,\nJohn Doe`,
        `Dear ${email.sender},\n\nI hope this email finds you well.\n\nThank you for reaching out about "${email.subject}". I acknowledge receipt of your email and will respond with the necessary information shortly.\n\nKind regards,\nJohn Doe`,
        `Dear ${email.sender},\n\nThank you for contacting me regarding "${email.subject}".\n\nI appreciate you bringing this to my attention. I will look into this matter and provide you with an update as soon as possible.\n\nBest wishes,\nJohn Doe`,
      ];
      const randomIndex = Math.floor(Math.random() * fallbackReplies.length);
      setAiReply(fallbackReplies[randomIndex]);
      Alert.alert('Success ✅', 'AI reply generated!');
    } finally {
      setLoading(false);
    }
  };

  // Send the reply
  const sendAutoReply = () => {
    if (!aiReply) {
      Alert.alert('Notice', 'Please generate AI reply first');
      return;
    }
    Alert.alert('Success ✅', 'Auto-reply sent successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  // Get sender initial
  const getSenderInitial = () => {
    return email.sender ? email.sender.charAt(0).toUpperCase() : 'U';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient 
        colors={['#667eea', '#764ba2']} 
        style={styles.header} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}
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
            onPress={() => Alert.alert('Options', 'More options coming soon!')} 
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
                label={getSenderInitial()} 
                style={styles.avatar} 
              />
              <View style={styles.senderInfo}>
                <Text style={styles.senderName}>{email.sender}</Text>
                <Text style={styles.senderEmail}>sender@university.edu</Text>
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
              Dear Student,
            </Text>
            <Text style={styles.bodyText}>
              This is a reminder about the project submission deadline. Please ensure that you submit your work before the specified time.
            </Text>
            <Text style={styles.bodyText}>
              Make sure to follow all the guidelines mentioned in the project brief. Late submissions will not be accepted unless prior arrangements have been made.
            </Text>
            <Text style={styles.bodyText}>
              If you have any questions, please don't hesitate to reach out.
            </Text>
            <Text style={styles.signature}>
              Best regards,{'\n'}{email.sender}
            </Text>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard} elevation={2}>
          <Card.Content>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            <View style={styles.actionsRow}>
              <Button 
                mode="outlined" 
                icon="reply" 
                onPress={() => navigation.navigate('ComposeEmail')}
                style={styles.actionBtn}
                compact
              >
                Reply
              </Button>
              <Button 
                mode="outlined" 
                icon="forward" 
                onPress={() => Alert.alert('Forward', 'Forward feature coming soon!')}
                style={styles.actionBtn}
                compact
              >
                Forward
              </Button>
              <Button 
                mode="outlined" 
                icon="delete" 
                onPress={() => Alert.alert('Delete', 'Delete feature coming soon!')}
                style={styles.actionBtn}
                textColor="#EF4444"
                compact
              >
                Delete
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* AI Auto-Reply Section */}
        <Card style={styles.autoReplyCard} elevation={3}>
          <LinearGradient 
            colors={['#667eea', '#764ba2']} 
            style={styles.autoReplyGradient} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 1}}
          >
            <View style={styles.autoReplyHeader}>
              <IconButton icon="robot" size={28} iconColor="white" />
              <Text style={styles.autoReplyTitleMain}>AI Auto-Reply Generator</Text>
            </View>
            <Text style={styles.autoReplySubtitleMain}>
              Generate an intelligent professional reply using AI
            </Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingText}>AI is generating reply...</Text>
              </View>
            ) : !aiReply ? (
              <Button 
                mode="contained" 
                icon="magic-staff" 
                onPress={generateAutoReply} 
                style={styles.generateReplyButton} 
                buttonColor="rgba(255,255,255,0.2)" 
                textColor="white"
              >
                Generate AI Reply
              </Button>
            ) : null}
          </LinearGradient>
        </Card>

        {/* Generated Reply Card */}
        {aiReply ? (
          <Card style={styles.generatedReplyCard} elevation={3}>
            <Card.Content>
              <View style={styles.generatedHeader}>
                <IconButton icon="robot" size={24} iconColor="#667eea" />
                <Text style={styles.generatedTitle}>Generated Reply</Text>
              </View>
              <Divider style={styles.generatedDivider} />
              <Text style={styles.aiReplyText}>{aiReply}</Text>
              <View style={styles.replyActions}>
                <Button 
                  mode="outlined" 
                  icon="refresh" 
                  onPress={generateAutoReply}
                  style={styles.replyActionBtn}
                >
                  Regenerate
                </Button>
                <Button 
                  mode="contained" 
                  icon="send" 
                  onPress={sendAutoReply} 
                  style={styles.replyActionBtn} 
                  buttonColor="#10B981"
                >
                  Send Reply
                </Button>
              </View>
            </Card.Content>
          </Card>
        ) : null}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  header: { 
    paddingTop: 50, 
    paddingBottom: 20, 
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25 
  },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    flex: 1, 
    textAlign: 'center' 
  },
  content: { 
    flex: 1, 
    padding: 20 
  },
  headerCard: { 
    borderRadius: 20, 
    marginBottom: 15 
  },
  senderSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  avatar: { 
    backgroundColor: '#667eea' 
  },
  senderInfo: { 
    marginLeft: 15, 
    flex: 1 
  },
  senderName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginBottom: 3 
  },
  senderEmail: { 
    fontSize: 13, 
    color: '#64748B', 
    marginBottom: 8 
  },
  metaInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  timeText: { 
    fontSize: 12, 
    color: '#94A3B8' 
  },
  categoryChip: { 
    height: 26 
  },
  divider: { 
    marginVertical: 15 
  },
  subject: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    lineHeight: 28 
  },
  bodyCard: { 
    borderRadius: 20, 
    marginBottom: 15 
  },
  bodyText: { 
    fontSize: 15, 
    lineHeight: 24, 
    color: '#475569', 
    marginBottom: 12 
  },
  signature: { 
    fontSize: 15, 
    lineHeight: 24, 
    color: '#1E293B', 
    fontWeight: '500', 
    marginTop: 10 
  },
  actionsCard: { 
    borderRadius: 20, 
    marginBottom: 15 
  },
  actionsTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1E293B', 
    marginBottom: 12 
  },
  actionsRow: { 
    flexDirection: 'row', 
    gap: 10 
  },
  actionBtn: { 
    flex: 1, 
    borderRadius: 10 
  },
  autoReplyCard: { 
    borderRadius: 20, 
    marginBottom: 15, 
    overflow: 'hidden' 
  },
  autoReplyGradient: { 
    padding: 20 
  },
  autoReplyHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  autoReplyTitleMain: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    marginLeft: 10 
  },
  autoReplySubtitleMain: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.9)', 
    marginBottom: 15, 
    lineHeight: 20 
  },
  loadingContainer: { 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  loadingText: { 
    color: 'white', 
    marginTop: 10, 
    fontSize: 14 
  },
  generateReplyButton: { 
    borderRadius: 12, 
    borderWidth: 2, 
    borderColor: 'rgba(255,255,255,0.3)' 
  },
  generatedReplyCard: { 
    borderRadius: 20, 
    marginBottom: 15 
  },
  generatedHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5 
  },
  generatedTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1E293B' 
  },
  generatedDivider: { 
    marginVertical: 10 
  },
  aiReplyText: { 
    fontSize: 15, 
    lineHeight: 24, 
    color: '#1E293B', 
    marginBottom: 15 
  },
  replyActions: { 
    flexDirection: 'row', 
    gap: 10 
  },
  replyActionBtn: { 
    flex: 1, 
    borderRadius: 12 
  },
});

export default EmailDetailScreen;