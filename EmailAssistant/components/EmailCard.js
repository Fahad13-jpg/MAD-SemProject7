// components/EmailCard.js
// Custom Reusable Component with Props (Requirement B.6)
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar, Chip } from 'react-native-paper';

const EmailCard = ({ email, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(email)}>
      <Card style={[styles.card, email.unread && styles.unreadCard]} elevation={2}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Avatar.Text
              size={45}
              label={email.sender.charAt(0)}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={[styles.sender, email.unread && styles.bold]}>
                {email.sender}
              </Text>
              <Text style={styles.time}>{email.time}</Text>
            </View>
            {email.unread && <View style={styles.unreadDot} />}
          </View>
          
          <Text style={[styles.subject, email.unread && styles.bold]} numberOfLines={1}>
            {email.subject}
          </Text>
          
          <Text style={styles.preview} numberOfLines={2}>
            {email.preview}
          </Text>
          
          <Chip compact icon="tag" style={styles.chip}>
            {email.category}
          </Chip>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12, borderRadius: 15 },
  unreadCard: { borderLeftWidth: 4, borderLeftColor: '#667eea' },
  content: { paddingVertical: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { backgroundColor: '#667eea' },
  info: { flex: 1, marginLeft: 12 },
  sender: { fontSize: 15, color: '#1E293B' },
  time: { fontSize: 12, color: '#94A3B8' },
  bold: { fontWeight: 'bold' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#667eea' },
  subject: { fontSize: 14, color: '#1E293B', marginBottom: 6 },
  preview: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 10 },
  chip: { alignSelf: 'flex-start' },
});

export default EmailCard;