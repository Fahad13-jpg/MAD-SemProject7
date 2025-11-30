// ComposeEmailScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  TextInput,
  Button,
  Surface,
  Chip
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ComposeEmailScreen = ({ navigation }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!to || !subject || !body) {
      alert('Please fill all fields');
      return;
    }
    alert('Email sent successfully!');
    navigation.goBack();
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
            {/* To Field */}
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
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Subject Field */}
            <TextInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              left={<TextInput.Icon icon="text" />}
              placeholder="Enter subject"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Body Field */}
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
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                icon="attachment"
                onPress={() => {}}
                style={styles.actionButton}
                textColor="#667eea"
              >
                Attach
              </Button>

              <Button
                mode="outlined"
                icon="image"
                onPress={() => {}}
                style={styles.actionButton}
                textColor="#667eea"
              >
                Image
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* AI Suggestions Card */}
        <Card style={styles.aiCard} elevation={2}>
          <Card.Content>
            <View style={styles.aiHeader}>
              <IconButton icon="robot" size={24} iconColor="#667eea" />
              <Text style={styles.aiTitle}>AI Quick Replies</Text>
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

        {/* Send Button */}
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
  formCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  bodyInput: {
    marginBottom: 15,
    minHeight: 200,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
  aiCard: {
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    marginBottom: 15,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginLeft: 5,
  },
  aiSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 15,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    marginBottom: 5,
  },
  sendButton: {
    borderRadius: 12,
  },
  sendButtonContent: {
    paddingVertical: 8,
  },
});

export default ComposeEmailScreen;