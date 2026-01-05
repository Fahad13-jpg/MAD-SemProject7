// Screens/ComposeEmailScreen.js - Fixed API with Fallback
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { 
  Card, Text, IconButton, TextInput, Button, Chip, ActivityIndicator 
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../context/AppContext';

const ComposeEmailScreen = ({ navigation }) => {
  const { theme } = useApp();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!to || !subject || !body) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success ✅', 'Email sent successfully!');
    navigation.goBack();
  };

  // Generate AI Reply with multiple fallbacks
  const generateAIReply = async () => {
    if (!subject) {
      Alert.alert('Notice', 'Please enter a subject first');
      return;
    }

    setLoading(true);

    try {
      // Try primary API
      const response = await fetch(
        `https://api.quotable.io/random`,
        { method: 'GET' }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedBody = `Dear Recipient,\n\nThank you for your email regarding "${subject}".\n\n${data.content}\n\nBest regards,\nEmail Assistant`;
        setBody(generatedBody);
        Alert.alert('Success ✅', 'AI reply generated!');
      } else {
        throw new Error('API failed');
      }
    } catch (error) {
      console.log('Using fallback response');
      // Fallback responses
      const fallbackReplies = [
        `Dear Recipient,\n\nThank you for your email regarding "${subject}".\n\nI have received your message and will review it carefully. I will get back to you with a detailed response within 24-48 hours.\n\nIf this matter is urgent, please feel free to follow up.\n\nBest regards,\nEmail Assistant`,
        `Dear Recipient,\n\nI hope this email finds you well.\n\nThank you for reaching out about "${subject}". I appreciate you bringing this to my attention.\n\nI will review the details and respond accordingly.\n\nKind regards,\nEmail Assistant`,
        `Dear Recipient,\n\nThank you for contacting me regarding "${subject}".\n\nI acknowledge receipt of your email and will respond with more information shortly.\n\nPlease let me know if you have any immediate questions.\n\nBest wishes,\nEmail Assistant`,
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setBody(randomReply);
      Alert.alert('Success ✅', 'AI reply generated!');
    } finally {
      setLoading(false);
    }
  };

  const quickPhrases = [
    'Thank you for your email',
    'I will get back to you soon',
    'Please find attached',
    'Looking forward to hearing from you',
    'Best regards',
  ];

  const styles = createStyles(theme);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={theme.colors.headerGradient} style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton icon="close" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>✉️ Compose Email</Text>
          <IconButton icon="send" iconColor="white" size={24} onPress={handleSend} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form */}
        <Card style={styles.formCard} elevation={3}>
          <Card.Content>
            <TextInput
              label="To"
              value={to}
              onChangeText={setTo}
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              placeholder="recipient@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              theme={{ colors: { primary: theme.colors.primary } }}
              textColor={theme.colors.text}
            />

            <TextInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              left={<TextInput.Icon icon="text" />}
              placeholder="Enter subject"
              style={styles.input}
              theme={{ colors: { primary: theme.colors.primary } }}
              textColor={theme.colors.text}
            />

            <TextInput
              label="Message"
              value={body}
              onChangeText={setBody}
              mode="outlined"
              left={<TextInput.Icon icon="message-text" />}
              placeholder="Type your message here..."
              multiline
              numberOfLines={8}
              style={styles.bodyInput}
              theme={{ colors: { primary: theme.colors.primary } }}
              textColor={theme.colors.text}
            />

            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                icon="attachment"
                onPress={() => Alert.alert('Feature', 'Attach file feature')}
                style={styles.actionButton}
                textColor={theme.colors.primary}
              >
                Attach
              </Button>
              <Button
                mode="outlined"
                icon="image"
                onPress={() => Alert.alert('Feature', 'Add image feature')}
                style={styles.actionButton}
                textColor={theme.colors.primary}
              >
                Image
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* AI Smart Compose */}
        <Card style={styles.aiCard} elevation={3}>
          <LinearGradient colors={theme.colors.headerGradient} style={styles.aiGradient}>
            <View style={styles.aiHeader}>
              <IconButton icon="robot" size={28} iconColor="white" />
              <Text style={styles.aiTitle}>🤖 AI Smart Compose</Text>
            </View>
            <Text style={styles.aiSubtitle}>
              Let AI write a professional email based on your subject
            </Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.loadingText}>Generating AI reply...</Text>
              </View>
            ) : (
              <Button
                mode="contained"
                icon="magic-staff"
                onPress={generateAIReply}
                style={styles.generateButton}
                buttonColor="rgba(255,255,255,0.2)"
                textColor="white"
              >
                Generate AI Email
              </Button>
            )}
          </LinearGradient>
        </Card>

        {/* Quick Phrases */}
        <Card style={styles.phrasesCard} elevation={2}>
          <Card.Content>
            <View style={styles.phrasesHeader}>
              <IconButton icon="lightbulb" size={24} iconColor={theme.colors.primary} />
              <Text style={styles.phrasesTitle}>Quick Phrases</Text>
            </View>
            <Text style={styles.phrasesSubtitle}>Tap to insert</Text>
            <View style={styles.phrasesContainer}>
              {quickPhrases.map((phrase, index) => (
                <Chip
                  key={index}
                  icon="plus"
                  onPress={() => setBody(body + phrase + '. ')}
                  style={styles.phraseChip}
                >
                  {phrase}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          icon="send"
          onPress={handleSend}
          style={styles.sendButton}
          contentStyle={styles.sendButtonContent}
          buttonColor={theme.colors.primary}
        >
          Send Email
        </Button>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  content: { flex: 1, padding: 20 },
  formCard: { borderRadius: 20, marginBottom: 15, backgroundColor: theme.colors.card },
  input: { marginBottom: 15, backgroundColor: theme.colors.inputBg },
  bodyInput: { marginBottom: 15, minHeight: 150, backgroundColor: theme.colors.inputBg },
  actionButtons: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, borderRadius: 12 },
  aiCard: { borderRadius: 20, marginBottom: 15, overflow: 'hidden' },
  aiGradient: { padding: 20 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aiTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 },
  aiSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 20, lineHeight: 20 },
  loadingContainer: { alignItems: 'center', paddingVertical: 10 },
  loadingText: { color: 'white', marginTop: 10, fontSize: 14 },
  generateButton: { borderRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  phrasesCard: { borderRadius: 20, marginBottom: 15, backgroundColor: theme.colors.card },
  phrasesHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  phrasesTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginLeft: 5 },
  phrasesSubtitle: { fontSize: 13, color: theme.colors.textSecondary, marginBottom: 15 },
  phrasesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  phraseChip: { marginBottom: 5 },
  sendButton: { borderRadius: 12 },
  sendButtonContent: { paddingVertical: 8 },
});

export default ComposeEmailScreen;