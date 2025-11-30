// WorkflowScreen.js
import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  Surface, 
  Chip,
  Switch,
  List,
  Divider,
  ProgressBar
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const WorkflowScreen = ({ navigation }) => {
  const [autoReplyEnabled, setAutoReplyEnabled] = React.useState(true);
  const [filterEnabled, setFilterEnabled] = React.useState(true);
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);

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
          <Text style={styles.headerTitle}>N8N Workflow</Text>
          <IconButton
            icon="refresh"
            iconColor="white"
            size={24}
            onPress={() => {}}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <Card style={styles.statusCard} elevation={3}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.statusGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statusContent}>
              <IconButton icon="check-circle" size={40} iconColor="white" />
              <Text style={styles.statusTitle}>Workflow Active</Text>
              <Text style={styles.statusSubtitle}>Running smoothly since 2 hours</Text>
            </View>
          </LinearGradient>
        </Card>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Processed</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Filtered</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Auto-Replied</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Workflow Settings */}
        <Card style={styles.settingsCard} elevation={2}>
          <Card.Title 
            title="Workflow Settings" 
            titleVariant="titleLarge"
            left={(props) => <IconButton {...props} icon="cog" />}
          />
          <Divider />

          <List.Item
            title="Auto-Reply Emails"
            description="Automatically reply to non-important emails"
            left={props => <List.Icon {...props} icon="robot" />}
            right={() => (
              <Switch
                value={autoReplyEnabled}
                onValueChange={setAutoReplyEnabled}
                color="#667eea"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Email Filtering"
            description="Filter important emails from inbox"
            left={props => <List.Icon {...props} icon="filter" />}
            right={() => (
              <Switch
                value={filterEnabled}
                onValueChange={setFilterEnabled}
                color="#667eea"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Smart Notifications"
            description="Get notified for important emails only"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notificationEnabled}
                onValueChange={setNotificationEnabled}
                color="#667eea"
              />
            )}
          />
        </Card>

        {/* Activity Log */}
        <Card style={styles.activityCard} elevation={2}>
          <Card.Title 
            title="Recent Activity" 
            titleVariant="titleLarge"
            left={(props) => <IconButton {...props} icon="history" />}
          />
          <Divider />

          <List.Item
            title="Workflow Started"
            description="2 hours ago"
            left={props => <List.Icon {...props} icon="play-circle" color="#10B981" />}
          />

          <List.Item
            title="8 Emails Filtered"
            description="1 hour ago"
            left={props => <List.Icon {...props} icon="filter-check" color="#3B82F6" />}
          />

          <List.Item
            title="5 Auto-Replies Sent"
            description="30 minutes ago"
            left={props => <List.Icon {...props} icon="send-check" color="#8B5CF6" />}
          />

          <List.Item
            title="Notification Sent"
            description="10 minutes ago"
            left={props => <List.Icon {...props} icon="bell-ring" color="#F59E0B" />}
          />
        </Card>

        {/* Keywords Card */}
        <Card style={styles.keywordsCard} elevation={2}>
          <Card.Title 
            title="Filter Keywords" 
            titleVariant="titleLarge"
            left={(props) => <IconButton {...props} icon="tag-multiple" />}
          />
          <Card.Content>
            <Text style={styles.keywordsSubtitle}>
              Emails containing these keywords are marked as important
            </Text>

            <View style={styles.keywordsContainer}>
              <Chip icon="tag">urgent</Chip>
              <Chip icon="tag">important</Chip>
              <Chip icon="tag">deadline</Chip>
              <Chip icon="tag">interview</Chip>
              <Chip icon="tag">meeting</Chip>
              <Chip icon="tag">project</Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Performance Card */}
        <Card style={styles.performanceCard} elevation={2}>
          <Card.Title 
            title="Performance" 
            titleVariant="titleLarge"
            left={(props) => <IconButton {...props} icon="chart-line" />}
          />
          <Card.Content>
            <Text style={styles.performanceLabel}>Success Rate</Text>
            <ProgressBar progress={0.95} color="#10B981" style={styles.progressBar} />
            <Text style={styles.performanceValue}>95%</Text>

            <Text style={styles.performanceLabel}>Response Time</Text>
            <ProgressBar progress={0.85} color="#3B82F6" style={styles.progressBar} />
            <Text style={styles.performanceValue}> 2 seconds</Text>
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
  statusCard: {
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
  statusGradient: {
    padding: 30,
    alignItems: 'center',
  },
  statusContent: {
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  statusSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },
  settingsCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  activityCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  keywordsCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  keywordsSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 15,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  performanceCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  performanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 10,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  performanceValue: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default WorkflowScreen;