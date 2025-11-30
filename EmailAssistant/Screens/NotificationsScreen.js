// NotificationsScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  Avatar,
  Chip,
  Button,
  Surface,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: 1,
      type: 'email',
      icon: 'email',
      iconColor: '#3B82F6',
      title: 'New Important Email',
      message: 'You have received an important email from Prof. Ahmed Khan',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      type: 'auto-reply',
      icon: 'robot',
      iconColor: '#10B981',
      title: 'Auto-Reply Sent',
      message: 'Automatic reply sent to HR Department',
      time: '15 min ago',
      unread: true,
    },
    {
      id: 3,
      type: 'workflow',
      icon: 'cog-sync',
      iconColor: '#8B5CF6',
      title: 'Workflow Processing',
      message: 'N8N workflow is processing 12 new emails',
      time: '30 min ago',
      unread: true,
    },
    {
      id: 4,
      type: 'success',
      icon: 'check-circle',
      iconColor: '#10B981',
      title: 'Emails Categorized',
      message: '8 emails marked as important, 4 as personal',
      time: '1 hour ago',
      unread: false,
    },
    {
      id: 5,
      type: 'reminder',
      icon: 'bell-ring',
      iconColor: '#F59E0B',
      title: 'Pending Replies',
      message: 'You have 3 emails waiting for your reply',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

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
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>{unreadCount} new alerts</Text>
          </View>
          <IconButton
            icon="check-all"
            iconColor="white"
            size={24}
            onPress={() => {}}
          />
        </View>
      </LinearGradient>

      {/* Stats Bar */}
      <Surface style={styles.statsBar} elevation={2}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{unreadCount}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
        <Divider style={styles.verticalDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{notifications.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <Divider style={styles.verticalDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </Surface>

      {/* Notifications List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <Card 
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.unread && styles.unreadCard
            ]}
            elevation={2}
          >
            <Card.Content style={styles.cardContent}>
              <Avatar.Icon
                size={50}
                icon={notification.icon}
                style={[styles.avatar, { backgroundColor: notification.iconColor }]}
              />
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text 
                    style={[
                      styles.notificationTitle,
                      notification.unread && styles.boldText
                    ]}
                  >
                    {notification.title}
                  </Text>
                  {notification.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
                
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Clear All Button */}
      <Surface style={styles.bottomContainer} elevation={4}>
        <Button
          mode="outlined"
          icon="delete-sweep"
          onPress={() => {}}
          style={styles.clearButton}
          textColor="#EF4444"
        >
          Clear All Notifications
        </Button>
      </Surface>
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
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },
  verticalDivider: {
    width: 1,
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    marginBottom: 12,
    borderRadius: 15,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 15,
    color: '#1E293B',
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  bottomContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  clearButton: {
    borderRadius: 12,
    borderColor: '#FEE2E2',
  },
});

export default NotificationsScreen;