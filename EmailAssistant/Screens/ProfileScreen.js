// ProfileScreen.js
import React from 'react';
// import ProfileScreen from './Screens'
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  Avatar,
  Button,
  Chip,
  Surface,
  List,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="white"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        <View style={styles.profileHeader}>
          <Avatar.Text
            size={90}
            label="JD"
            style={styles.avatar}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>student@university.edu</Text>
          
          <Chip icon="check-decagram" style={styles.verifiedChip}>
            Verified Account
          </Chip>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <IconButton icon="email" size={24} iconColor="#667eea" />
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Total Emails</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <IconButton icon="send" size={24} iconColor="#10B981" />
              <Text style={styles.statNumber}>89</Text>
              <Text style={styles.statLabel}>Sent</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard} elevation={2}>
            <Card.Content style={styles.statContent}>
              <IconButton icon="robot" size={24} iconColor="#8B5CF6" />
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Auto-Replied</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard} elevation={2}>
          <Card.Title 
            title="Quick Actions" 
            titleVariant="titleLarge"
          />
          <Divider />
          
          <List.Item
            title="Edit Profile"
            description="Update your information"
            left={props => <List.Icon {...props} icon="account-edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Change Password"
            description="Update your password"
            left={props => <List.Icon {...props} icon="lock-reset" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Email Signature"
            description="Customize your signature"
            left={props => <List.Icon {...props} icon="draw" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* Account Info */}
        <Card style={styles.infoCard} elevation={2}>
          <Card.Title 
            title="Account Information" 
            titleVariant="titleLarge"
          />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>

            <Divider style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Type</Text>
              <Chip compact>Premium</Chip>
            </View>

            <Divider style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Storage Used</Text>
              <Text style={styles.infoValue}>2.4 GB / 15 GB</Text>
            </View>

            <Divider style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>N8N Workflow</Text>
              <Chip compact icon="check">Active</Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Preferences */}
        <Card style={styles.preferencesCard} elevation={2}>
          <Card.Title 
            title="Preferences" 
            titleVariant="titleLarge"
          />
          <Divider />

          <List.Item
            title="Email Categories"
            description="Work, Personal, Important"
            left={props => <List.Icon {...props} icon="tag-multiple" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Filter Settings"
            description="6 keywords configured"
            left={props => <List.Icon {...props} icon="filter" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Notification Settings"
            description="All notifications enabled"
            left={props => <List.Icon {...props} icon="bell-cog" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Settings')}
          />
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          icon="logout"
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutButton}
          textColor="#EF4444"
        >
          Logout
        </Button>

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
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatar: {
    backgroundColor: 'white',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
  },
  verifiedChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },
  statsContainer: {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 3,
  },
  actionsCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  infoCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  infoDivider: {
    marginVertical: 5,
  },
  preferencesCard: {
    borderRadius: 20,
    marginBottom: 15,
  },
  logoutButton: {
    borderRadius: 12,
    borderColor: '#FEE2E2',
    marginBottom: 10,
  },
});

export default ProfileScreen;