// SettingsScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  List,
  Switch,
  Divider,
  Button,
  Surface
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

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
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 48 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="Account" 
            titleVariant="titleLarge"
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          
          <List.Item
            title="Email Account"
            description="student@gmail.com"
            left={props => <List.Icon {...props} icon="email" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Connected Services"
            description="Gmail, N8N Workflow"
            left={props => <List.Icon {...props} icon="link" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* App Settings */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="App Settings" 
            titleVariant="titleLarge"
            left={(props) => <List.Icon {...props} icon="cog" />}
          />
          <Divider />

          <List.Item
            title="Dark Mode"
            description="Enable dark theme"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color="#667eea"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Notifications"
            description="Push notifications for new emails"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#667eea"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Auto Sync"
            description="Automatically sync emails"
            left={props => <List.Icon {...props} icon="sync" />}
            right={() => (
              <Switch
                value={autoSync}
                onValueChange={setAutoSync}
                color="#667eea"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Language"
            description="English"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* N8N Settings */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="N8N Integration" 
            titleVariant="titleLarge"
            left={(props) => <List.Icon {...props} icon="robot" />}
          />
          <Divider />

          <List.Item
            title="Workflow Configuration"
            description="Manage workflow settings"
            left={props => <List.Icon {...props} icon="cog-sync" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Workflow')}
          />

          <Divider />

          <List.Item
            title="Filter Keywords"
            description="Manage email filters"
            left={props => <List.Icon {...props} icon="filter" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Auto-Reply Templates"
            description="Customize automatic responses"
            left={props => <List.Icon {...props} icon="message-reply-text" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* Support & About */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="Support & About" 
            titleVariant="titleLarge"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          <Divider />

          <List.Item
            title="Help Center"
            description="Get help and support"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-check" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />

          <Divider />

          <List.Item
            title="App Version"
            description="v1.0.0"
            left={props => <List.Icon {...props} icon="information-outline" />}
          />
        </Card>

        {/* Danger Zone */}
        <Card style={styles.dangerCard} elevation={2}>
          <Card.Content>
            <Text style={styles.dangerTitle}>Danger Zone</Text>
            <Text style={styles.dangerSubtitle}>
              Irreversible actions
            </Text>

            <Button
              mode="outlined"
              icon="logout"
              onPress={() => navigation.navigate('Login')}
              style={styles.dangerButton}
              textColor="#EF4444"
            >
              Logout
            </Button>

            <Button
              mode="outlined"
              icon="delete"
              onPress={() => {}}
              style={styles.dangerButton}
              textColor="#EF4444"
            >
              Delete Account
            </Button>
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
  card: {
    borderRadius: 20,
    marginBottom: 15,
  },
  dangerCard: {
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    marginBottom: 15,
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 5,
  },
  dangerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 15,
  },
  dangerButton: {
    marginBottom: 10,
    borderColor: '#FEE2E2',
    borderRadius: 12,
  },
});

export default SettingsScreen;