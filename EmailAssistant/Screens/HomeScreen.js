// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.profilePic}>
            <Text style={styles.profileText}>👤</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.greeting}>Hello, User!</Text>
            <Text style={styles.subGreeting}>Welcome back 👋</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Email Overview</Text>
        
        <View style={styles.statsContainer}>
          {/* Card 1 */}
          <View style={[styles.statCard, styles.blueCard]}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>📧</Text>
            </View>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Total Emails</Text>
            <Text style={styles.statBadge}>Today</Text>
          </View>

          {/* Card 2 */}
          <View style={[styles.statCard, styles.redCard]}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>⚠️</Text>
            </View>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Important</Text>
            <Text style={styles.statBadge}>Urgent</Text>
          </View>

          {/* Card 3 */}
          <View style={[styles.statCard, styles.greenCard]}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>✅</Text>
            </View>
            <Text style={styles.statNumber}>16</Text>
            <Text style={styles.statLabel}>Processed</Text>
            <Text style={styles.statBadge}>Done</Text>
          </View>

          {/* Card 4 */}
          <View style={[styles.statCard, styles.purpleCard]}>
            <View style={styles.statIcon}>
              <Text style={styles.statIconText}>🤖</Text>
            </View>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Auto-Replied</Text>
            <Text style={styles.statBadge}>AI</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.actionBlue]}>
              <Text style={styles.actionIconText}>📨</Text>
            </View>
            <Text style={styles.actionText}>Compose</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.actionOrange]}>
              <Text style={styles.actionIconText}>📂</Text>
            </View>
            <Text style={styles.actionText}>Inbox</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.actionGreen]}>
              <Text style={styles.actionIconText}>⚙️</Text>
            </View>
            <Text style={styles.actionText}>N8N Flow</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.actionPink]}>
              <Text style={styles.actionIconText}>📊</Text>
            </View>
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Item 1 */}
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityEmoji}>✉️</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New Email from Prof. Ahmed</Text>
            <Text style={styles.activityTime}>5 minutes ago</Text>
          </View>
          <View style={styles.activityBadge}>
            <Text style={styles.activityBadgeText}>New</Text>
          </View>
        </View>

        {/* Activity Item 2 */}
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityEmoji}>🤖</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Auto-reply sent successfully</Text>
            <Text style={styles.activityTime}>15 minutes ago</Text>
          </View>
          <View style={[styles.activityBadge, styles.successBadge]}>
            <Text style={styles.activityBadgeText}>Done</Text>
          </View>
        </View>

        {/* Activity Item 3 */}
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <Text style={styles.activityEmoji}>⚙️</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>N8N workflow processed 12 emails</Text>
            <Text style={styles.activityTime}>30 minutes ago</Text>
          </View>
          <View style={[styles.activityBadge, styles.infoBadge]}>
            <Text style={styles.activityBadgeText}>Info</Text>
          </View>
        </View>
      </View>

      {/* Workflow Status */}
      <View style={styles.workflowSection}>
        <Text style={styles.sectionTitle}>N8N Workflow Status</Text>
        
        <View style={styles.workflowCard}>
          <View style={styles.workflowHeader}>
            <View style={styles.workflowInfo}>
              <Text style={styles.workflowTitle}>Email Filter Workflow</Text>
              <Text style={styles.workflowSubtitle}>Running smoothly</Text>
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

          <TouchableOpacity style={styles.workflowButton}>
            <Text style={styles.workflowButtonText}>View Workflow Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📧</Text>
          <Text style={styles.navLabel}>Emails</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navLabel}>Workflow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#EEF2FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileText: {
    fontSize: 24,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subGreeting: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  notificationButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FEF3C7',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  blueCard: {
    backgroundColor: '#DBEAFE',
  },
  redCard: {
    backgroundColor: '#FEE2E2',
  },
  greenCard: {
    backgroundColor: '#D1FAE5',
  },
  purpleCard: {
    backgroundColor: '#EDE9FE',
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIconText: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  statBadge: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 5,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '23%',
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionBlue: {
    backgroundColor: '#DBEAFE',
  },
  actionOrange: {
    backgroundColor: '#FED7AA',
  },
  actionGreen: {
    backgroundColor: '#D1FAE5',
  },
  actionPink: {
    backgroundColor: '#FCE7F3',
  },
  actionIconText: {
    fontSize: 26,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activityIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#F3F4F6',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  activityBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  successBadge: {
    backgroundColor: '#D1FAE5',
  },
  infoBadge: {
    backgroundColor: '#EDE9FE',
  },
  activityBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
  },
  workflowSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  workflowCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 3,
  },
  workflowSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
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
    color: '#059669',
  },
  workflowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  workflowStat: {
    alignItems: 'center',
  },
  workflowStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  workflowStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  workflowDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  workflowButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  workflowButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default HomeScreen;