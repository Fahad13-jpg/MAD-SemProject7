// ComposeEmailScreen.js - With AI API Integration
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  TextInput,
  Button,
  LinearProgress,
  Chip,
  ActivityIndicator
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ComposeEmailScreen = ({ navigation }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  // RapidAPI Configuration
  const RAPIDAPI_KEY = 'fd1f757311mshddaf7a541332913p188a75jsna1b4eac9d91e'; // Replace with your key
  const RAPIDAPI_HOST = 'free-chatgpt-api.p.rapidapi.com';

  const handleSend = () => {
    if (!to || !subject || !body) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Email sent successfully!');
    navigation.goBack();
  };

  // Generate AI Email Reply
  const generateAIReply = async () => {
    if (!subject) {
      Alert.alert('Notice', 'Please enter a subject first to generate AI reply');
      return;
    }

    setLoading(true);

    try {
      const promptText = `Write a professional email reply for the subject: "${subject}". Keep it concise and formal.`;

      const response = await fetch(
        `https://free-chatgpt-api.p.rapidapi.com/chat-completion-one?prompt=${encodeURIComponent(promptText)}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': RAPIDAPI_HOST
          }
        }
      );

      const data = await response.json();

      if (data && data.response) {
        setBody(data.response);
        Alert.alert('Success', 'AI reply generated successfully!');
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('API Error:', error);
      const fallbackReply = `Dear Recipient,\n\nThank you for your email regarding "${subject}". I will review and respond shortly.\n\nBest regards,\nJohn Doe`;
      setBody(fallbackReply);
      Alert.alert('Demo Mode', 'AI-generated reply added! (Using demo data)');
    } finally {
      setLoading(false);
    }
  };

  const aiSuggestions = [
    'Thank you for your email',
    'I will get back to you soon',
    'Please find attached',
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <IconButton
            icon="close"
            iconColor="white"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Compose Email</Text>
          <IconButton
            icon="send"
            iconColor="white"
            size={24}
            onPress={handleSend}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form Card */}
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
              theme={{ colors: { primary: '#667eea' } }}
            />

            <TextInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              left={<TextInput.Icon icon="text" />}
              placeholder="Enter subject"
              style={styles.input}
              theme={{ colors: { primary: '#667eea' } }}
            />

            <TextInput
              label="Message"
              value={body}
              onChangeText={setBody}
              mode="outlined"
              left={<TextInput.Icon icon="message-text" />}
              placeholder="Type your message here..."
              multiline
              numberOfLines={10}
              style={styles.bodyInput}
              theme={{ colors: { primary: '#667eea' } }}
            />

            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                icon="attachment"
                onPress={() => Alert.alert('Feature', 'Attach file feature')}
                style={styles.actionButton}
                textColor="#667eea"
              >
                Attach
              </Button>

              <Button
                mode="outlined"
                icon="image"
                onPress={() => Alert.alert('Feature', 'Add image feature')}
                style={styles.actionButton}
                textColor="#667eea"
              >
                Image
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* AI Smart Compose */}
        <Card style={styles.aiGenerateCard} elevation={3}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.aiGenerateGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.aiGenerateHeader}>
              <IconButton icon="robot" size={28} iconColor="white" />
              <Text style={styles.aiGenerateTitle}>AI Smart Compose</Text>
            </View>

            <Text style={styles.aiGenerateSubtitle}>
              Let AI write a professional email for you based on the subject
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

        {/* AI Quick Suggestions */}
        <Card style={styles.aiCard} elevation={2}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <IconButton icon="lightbulb" size={24} iconColor="#667eea" />
              <Text style={styles.aiTitle}>Quick Phrases</Text>
            </View>

            <Text style={styles.aiSubtitle}>
              Tap to insert suggested text
            </Text>

            <View style={styles.suggestionsContainer}>
              {aiSuggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  icon="plus"
                  onPress={() => setBody(body + suggestion + '. ')}
                  style={styles.suggestionChip}
                >
                  {suggestion}
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
          buttonColor="#667eea"
        >
          Send Email
        </Button>

        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  content: { flex: 1, padding: 20 },
  formCard: { borderRadius: 20, marginBottom: 15 },
  input: { marginBottom: 15 },
  bodyInput: { marginBottom: 15, minHeight: 200 },
  actionButtons: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, borderRadius: 12 },
  aiGenerateCard: { borderRadius: 20, marginBottom: 15, overflow: 'hidden' },
  aiGenerateGradient: { padding: 20 },
  aiGenerateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  aiGenerateTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 10 },
  aiGenerateSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 20, lineHeight: 20 },
  loadingContainer: { alignItems: 'center', paddingVertical: 10 },
  loadingText: { color: 'white', marginTop: 10, fontSize: 14 },
  generateButton: { borderRadius: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  aiCard: { borderRadius: 20, backgroundColor: '#EEF2FF', marginBottom: 15 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  aiTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginLeft: 5 },
  aiSubtitle: { fontSize: 13, color: '#64748B', marginBottom: 15 },
  suggestionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestionChip: { marginBottom: 5 },
  sendButton: { borderRadius: 12 },
  sendButtonContent: { paddingVertical: 8 },
});

export default ComposeEmailScreen;
