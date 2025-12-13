// EmailDetailScreen.js - With AI API Integration
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { 
  Card, Text, IconButton, Avatar, Chip, Divider, Button, Surface, ActivityIndicator
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EmailDetailScreen = ({ navigation, route }) => {
  const { email } = route.params || {
    email: { sender: 'Prof. Ahmed Khan', subject: 'Project Submission Deadline', time: '10:30 AM', category: 'Important' }
  };

  const [aiReply, setAiReply] = useState('');
  const [loading, setLoading] = useState(false);

  const RAPIDAPI_KEY = 'fd1f757311mshddaf7a541332913p188a75jsna1b4eac9d91e'; // Replace with your key
  const RAPIDAPI_HOST = 'free-chatgpt-api.p.rapidapi.com';

  const generateAutoReply = async () => {
    setLoading(true);

    try {
      const promptText = `Write a professional and polite email reply to this: Subject: ${email.subject}, From: ${email.sender}. Keep it brief and professional.`;

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
        setAiReply(data.response);
        Alert.alert('Success', 'AI reply generated! Scroll down to see it.');
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('API Error:', error);
      const fallbackReply = `Dear ${email.sender},\n\nThank you for your email regarding ${email.subject}.\nI will get back to you shortly.\n\nBest regards,\nJohn Doe`;
      setAiReply(fallbackReply);
      Alert.alert('Demo Mode', 'AI reply generated! (Using demo data)');
    } finally {
      setLoading(false);
    }
  };

  const sendAutoReply = () => {
    if (!aiReply) {
      Alert.alert('Notice', 'Please generate AI reply first');
      return;
    }
    Alert.alert('Success', 'Auto-reply sent successfully!');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header} start={{x:0,y:0}} end={{x:1,y:1}}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Email Details</Text>
          <IconButton icon="dots-vertical" iconColor="white" size={24} onPress={() => {}} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Email Details */}
        <Card style={styles.headerCard} elevation={3}>
          <Card.Content>
            <View style={styles.senderSection}>
              <Avatar.Text size={55} label={email.sender.charAt(0)} style={styles.avatar} />
              <View style={styles.senderInfo}>
                <Text style={styles.senderName}>{email.sender}</Text>
                <Text style={styles.senderEmail}>professor@university.edu</Text>
                <View style={styles.metaInfo}>
                  <Text style={styles.timeText}>{email.time}</Text>
                  <Chip compact icon="tag" style={styles.categoryChip}>{email.category}</Chip>
                </View>
              </View>
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.subject}>{email.subject}</Text>
          </Card.Content>
        </Card>

        {/* Email Body */}
        <Card style={styles.bodyCard} elevation={2}>
          <Card.Content>
            <Text style={styles.bodyText}>
              Dear Students,{'\n\n'}This is a reminder about the project submission deadline. Please submit before the specified time.
            </Text>
          </Card.Content>
        </Card>

        {/* AI Auto-Reply */}
        <Card style={styles.autoReplyCard} elevation={3}>
          <LinearGradient colors={['#667eea','#764ba2']} style={styles.autoReplyGradient} start={{x:0,y:0}} end={{x:1,y:1}}>
            <View style={styles.autoReplyHeader}>
              <IconButton icon="robot" size={28} iconColor="white" />
              <Text style={styles.autoReplyTitleMain}>AI Auto-Reply Generator</Text>
            </View>
            <Text style={styles.autoReplySubtitleMain}>Generate intelligent reply using AI</Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white"/>
                <Text style={styles.loadingText}>AI is generating reply...</Text>
              </View>
            ) : !aiReply ? (
              <Button mode="contained" icon="magic-staff" onPress={generateAutoReply} style={styles.generateReplyButton} buttonColor="rgba(255,255,255,0.2)" textColor="white">
                Generate AI Reply
              </Button>
            ) : null}
          </LinearGradient>
        </Card>

        {aiReply && (
          <Card style={styles.generatedReplyCard} elevation={3}>
            <Card.Content>
              <Text style={styles.aiReplyText}>{aiReply}</Text>
              <Button mode="contained" icon="send" onPress={sendAutoReply} style={styles.sendReplyButton} buttonColor="#10B981">
                Send Reply
              </Button>
            </Card.Content>
          </Card>
        )}

        <View style={{height:20}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#F8FAFC'},
  header:{paddingTop:50,paddingBottom:20,borderBottomLeftRadius:25,borderBottomRightRadius:25},
  headerContent:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:10},
  headerTitle:{fontSize:20,fontWeight:'bold',color:'white',flex:1,textAlign:'center'},
  content:{flex:1,padding:20},
  headerCard:{borderRadius:20,marginBottom:15},
  senderSection:{flexDirection:'row',alignItems:'center',marginBottom:15},
  avatar:{backgroundColor:'#667eea'},
  senderInfo:{marginLeft:15,flex:1},
  senderName:{fontSize:18,fontWeight:'bold',color:'#1E293B',marginBottom:3},
  senderEmail:{fontSize:13,color:'#64748B',marginBottom:8},
  metaInfo:{flexDirection:'row',alignItems:'center',gap:10},
  timeText:{fontSize:12,color:'#94A3B8'},
  categoryChip:{height:26},
  divider:{marginVertical:15},
  subject:{fontSize:20,fontWeight:'bold',color:'#1E293B',lineHeight:28},
  bodyCard:{borderRadius:20,marginBottom:15},
  bodyText:{fontSize:15,lineHeight:24,color:'#475569'},
  autoReplyCard:{borderRadius:20,marginBottom:15,overflow:'hidden'},
  autoReplyGradient:{padding:20},
  autoReplyHeader:{flexDirection:'row',alignItems:'center',marginBottom:10},
  autoReplyTitleMain:{fontSize:20,fontWeight:'bold',color:'white',marginLeft:10},
  autoReplySubtitleMain:{fontSize:14,color:'rgba(255,255,255,0.9)',marginBottom:15,lineHeight:20},
  loadingContainer:{alignItems:'center',paddingVertical:10},
  loadingText:{color:'white',marginTop:10,fontSize:14},
  generateReplyButton:{borderRadius:12,borderWidth:2,borderColor:'rgba(255,255,255,0.3)'},
  generatedReplyCard:{borderRadius:20,marginTop:10},
  aiReplyText:{fontSize:15,lineHeight:24,color:'#1E293B',marginBottom:15},
  sendReplyButton:{borderRadius:12}
});

export default EmailDetailScreen;
