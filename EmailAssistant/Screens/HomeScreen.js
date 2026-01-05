// HomeScreen.js - Updated (Bottom Nav Removed - Now using Tab Navigator)
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, IconButton, Surface, Avatar, Badge, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
const [profilePicture, setProfilePicture] = useState(null);
const [userName, setUserName] = useState('John');

useEffect(() => {
  loadProfileData();
}, []);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadProfileData();
  });
  return unsubscribe;
}, [navigation]);

const loadProfileData = async () => {
  try {
    const savedPicture = await AsyncStorage.getItem('profilePicture');
    if (savedPicture) setProfilePicture(savedPicture);
    
    const savedUser = await AsyncStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.fullName?.split(' ')[0] || 'John');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};
  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  {profilePicture ? (
    <Image source={{ uri: profilePicture }} style={styles.profileImage} />
  ) : (
    <Avatar.Text size={50} label="JD" style={styles.avatar} labelStyle={styles.avatarLabel} />
  )}
</TouchableOpacity>
            <View style={styles.greetingContainer}>
<Text style={styles.greeting}>Hello, {userName}! 👋</Text>
              <Text style={styles.subGreeting}>Welcome back to dashboard</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <IconButton
              icon="bell"
              size={24}
              iconColor="#FFFFFF"
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}
            />
            <Badge style={styles.badge} size={8} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Card style={styles.statCardLarge} elevation={3}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statCardContent}>
                <View>
                  <Text style={styles.statLargeNumber}>24</Text>
                  <Text style={styles.statLargeLabel}>Total Emails Today</Text>
                  <Text style={styles.statLargeSubtext}>+5 from yesterday</Text>
                </View>
                <View style={styles.statIconLarge}>
                  <Text style={styles.statIconEmoji}>📧</Text>
                </View>
              </View>
            </LinearGradient>
          </Card>

          <View style={styles.statsRow}>
            <Card style={styles.statCard} elevation={2}>
              <Card.Content style={styles.statCardContentSmall}>
                <View style={[styles.statIcon, styles.redIcon]}>
                  <IconButton icon="alert-circle" size={24} iconColor="#fff" />
                </View>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Important</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard} elevation={2}>
              <Card.Content style={styles.statCardContentSmall}>
                <View style={[styles.statIcon, styles.greenIcon]}>
                  <IconButton icon="check-circle" size={24} iconColor="#fff" />
                </View>
                <Text style={styles.statNumber}>16</Text>
                <Text style={styles.statLabel}>Processed</Text>
              </Card.Content>
            </Card>

            <Card style={styles.statCard} elevation={2}>
              <Card.Content style={styles.statCardContentSmall}>
                <View style={[styles.statIcon, styles.purpleIcon]}>
                  <IconButton icon="robot" size={24} iconColor="#fff" />
                </View>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Auto-Reply</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <Surface style={styles.actionCard} elevation={2}>
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.actionGradient}
              >
                <IconButton 
                  icon="email-edit" 
                  size={28} 
                  iconColor="#fff"
                  onPress={() => navigation.navigate('ComposeEmail')}
                />
              </LinearGradient>
              <Text style={styles.actionLabel}>Compose</Text>
            </Surface>

            <Surface style={styles.actionCard} elevation={2}>
              <LinearGradient
                colors={['#fa709a', '#fee140']}
                style={styles.actionGradient}
              >
                <IconButton 
                  icon="inbox" 
                  size={28} 
                  iconColor="#fff"
                  onPress={() => navigation.navigate('EmailList')}
                />
              </LinearGradient>
              <Text style={styles.actionLabel}>Inbox</Text>
            </Surface>

            <Surface style={styles.actionCard} elevation={2}>
              <LinearGradient
                colors={['#30cfd0', '#330867']}
                style={styles.actionGradient}
              >
                <IconButton 
                  icon="cog" 
                  size={28} 
                  iconColor="#fff"
                  onPress={() => navigation.navigate('Workflow')}
                />
              </LinearGradient>
              <Text style={styles.actionLabel}>N8N Flow</Text>
            </Surface>

            <Surface style={styles.actionCard} elevation={2}>
              <LinearGradient
                colors={['#a8edea', '#fed6e3']}
                style={styles.actionGradient}
              >
                <IconButton 
                  icon="chart-line" 
                  size={28} 
                  iconColor="#333"
                  onPress={() => {}}
                />
              </LinearGradient>
              <Text style={styles.actionLabel}>Analytics</Text>
            </Surface>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text 
              style={styles.seeAll}
              onPress={() => navigation.navigate('Notifications')}
            >
              See All →
            </Text>
          </View>

          <Card 
            style={styles.activityCard} 
            elevation={2}
            onPress={() => navigation.navigate('EmailList')}
          >
            <Card.Content style={styles.activityContent}>
              <View style={[styles.activityIcon, styles.activityBlue]}>
                <IconButton icon="email" size={20} iconColor="#fff" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>New Email from Prof. Ahmed</Text>
                <Text style={styles.activityTime}>5 minutes ago</Text>
              </View>
              <Surface style={styles.activityBadge} elevation={0}>
                <Text style={styles.badgeText}>New</Text>
              </Surface>
            </Card.Content>
          </Card>

          <Card style={styles.activityCard} elevation={2}>
            <Card.Content style={styles.activityContent}>
              <View style={[styles.activityIcon, styles.activityGreen]}>
                <IconButton icon="robot" size={20} iconColor="#fff" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Auto-reply sent successfully</Text>
                <Text style={styles.activityTime}>15 minutes ago</Text>
              </View>
              <Surface style={[styles.activityBadge, styles.successBadge]} elevation={0}>
                <Text style={styles.badgeText}>Done</Text>
              </Surface>
            </Card.Content>
          </Card>

          <Card 
            style={styles.activityCard} 
            elevation={2}
            onPress={() => navigation.navigate('Workflow')}
          >
            <Card.Content style={styles.activityContent}>
              <View style={[styles.activityIcon, styles.activityPurple]}>
                <IconButton icon="cog-sync" size={20} iconColor="#fff" />
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>N8N workflow processed 12 emails</Text>
                <Text style={styles.activityTime}>30 minutes ago</Text>
              </View>
              <Surface style={[styles.activityBadge, styles.infoBadge]} elevation={0}>
                <Text style={styles.badgeText}>Info</Text>
              </Surface>
            </Card.Content>
          </Card>
        </View>

        {/* Workflow Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>N8N Workflow Status</Text>
          <Card 
            style={styles.workflowCard} 
            elevation={3}
            onPress={() => navigation.navigate('Workflow')}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.workflowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.workflowHeader}>
                <View style={styles.workflowInfo}>
                  <Text style={styles.workflowTitle}>Email Filter Workflow</Text>
                  <Text style={styles.workflowSubtitle}>Running smoothly ✨</Text>
                </View>
                <View style={styles.statusIndicator}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>

              <View style={styles.workflowStats}>
                <View style={styles.workflowStat}>
                  <Text style={styles.workflowStatNumber}>24</Text>
                  <Text style={styles.workflowStatLabel}>Processed</Text>
                </View>
                <View style={styles.workflowDivider} />
                <View style={styles.workflowStat}>
                  <Text style={styles.workflowStatNumber}>8</Text>
                  <Text style={styles.workflowStatLabel}>Filtered</Text>
                </View>
                <View style={styles.workflowDivider} />
                <View style={styles.workflowStat}>
                  <Text style={styles.workflowStatNumber}>5</Text>
                  <Text style={styles.workflowStatLabel}>Auto-Replied</Text>
                </View>
              </View>

              <Surface style={styles.workflowButton} elevation={0}>
                <Text style={styles.workflowButtonText}>View Details →</Text>
              </Surface>
            </LinearGradient>
          </Card>
        </View>

        {/* Extra space for FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() => navigation.navigate('ComposeEmail')}
      />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    backgroundColor: '#fff',
  },
  avatarLabel: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subGreeting: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 2,
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'white' },
  headerRight: {
    position: 'relative',
  },
  notificationButton: {
    margin: 0,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EF4444',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  statsSection: {
    padding: 20,
    paddingTop: 25,
  },
  statCardLarge: {
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 20,
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLargeNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLargeLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    fontWeight: '600',
  },
  statLargeSubtext: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 3,
  },
  statIconLarge: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconEmoji: {
    fontSize: 35,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
  },
  statCardContentSmall: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  redIcon: {
    backgroundColor: '#EF4444',
  },
  greenIcon: {
    backgroundColor: '#10B981',
  },
  purpleIcon: {
    backgroundColor: '#8B5CF6',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAll: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionCard: {
    width: '23%',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionGradient: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  activityCard: {
    borderRadius: 15,
    marginBottom: 12,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activityIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityBlue: {
    backgroundColor: '#3B82F6',
  },
  activityGreen: {
    backgroundColor: '#10B981',
  },
  activityPurple: {
    backgroundColor: '#8B5CF6',
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  activityBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  successBadge: {
    backgroundColor: '#D1FAE5',
  },
  infoBadge: {
    backgroundColor: '#EDE9FE',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },
  workflowCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },
  workflowGradient: {
    padding: 20,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  workflowInfo: {
    flex: 1,
  },
  workflowTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workflowSubtitle: {
    fontSize: 13,
    color: '#E0E7FF',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  workflowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    paddingVertical: 15,
  },
  workflowStat: {
    alignItems: 'center',
  },
  workflowStatNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  workflowStatLabel: {
    fontSize: 11,
    color: '#E0E7FF',
    marginTop: 4,
  },
  workflowDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  workflowButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  workflowButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#667eea',
  },
});

export default HomeScreen;