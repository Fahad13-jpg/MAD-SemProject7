// Screens/SettingsScreen.js - With Working Dark Mode
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, IconButton, List, Switch, Divider, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';

const SettingsScreen = ({ navigation }) => {
  const { theme, isDarkMode, toggleDarkMode } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem('notifications');
      const savedAutoSync = await AsyncStorage.getItem('autoSync');
      if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
      if (savedAutoSync !== null) setAutoSync(JSON.parse(savedAutoSync));
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving:', error);
    }
  };

  const handleNotifications = (value) => { 
    setNotifications(value); 
    saveSetting('notifications', value); 
  };
  
  const handleAutoSync = (value) => { 
    setAutoSync(value); 
    saveSetting('autoSync', value); 
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    Alert.alert(
      isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode',
      isDarkMode ? 'Switched to Light Mode' : 'Switched to Dark Mode'
    );
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient colors={theme.colors.headerGradient} style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>⚙️ Settings</Text>
          <View style={{ width: 48 }} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Device Features */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="Device Features" 
            titleStyle={styles.cardTitleText}
            left={(props) => <List.Icon {...props} icon="cellphone" color={theme.colors.primary} />} 
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="📍 Location & Map"
            description="View your current location"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="map-marker" color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.textSecondary} />}
            onPress={() => navigation.navigate('Map')}
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="📷 Camera"
            description="Take or upload profile photo"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="camera" color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.textSecondary} />}
            onPress={() => navigation.navigate('Camera')}
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="📱 Motion Sensor"
            description="Shake to refresh emails"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="rotate-3d-variant" color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.textSecondary} />}
            onPress={() => navigation.navigate('Sensor')}
          />
        </Card>

        {/* App Settings */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="App Settings" 
            titleStyle={styles.cardTitleText}
            left={(props) => <List.Icon {...props} icon="cog" color={theme.colors.primary} />} 
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="🌙 Dark Mode"
            description={isDarkMode ? "Currently: Dark Mode" : "Currently: Light Mode"}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.primary} />}
            right={() => (
              <Switch 
                value={isDarkMode} 
                onValueChange={handleDarkModeToggle} 
                color={theme.colors.primary} 
              />
            )}
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="🔔 Notifications"
            description="Push notifications for new emails"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="bell" color={theme.colors.primary} />}
            right={() => (
              <Switch 
                value={notifications} 
                onValueChange={handleNotifications} 
                color={theme.colors.primary} 
              />
            )}
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="🔄 Auto Sync"
            description="Automatically sync emails"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="sync" color={theme.colors.primary} />}
            right={() => (
              <Switch 
                value={autoSync} 
                onValueChange={handleAutoSync} 
                color={theme.colors.primary} 
              />
            )}
          />
        </Card>

        {/* N8N Settings */}
        <Card style={styles.card} elevation={2}>
          <Card.Title 
            title="N8N Integration" 
            titleStyle={styles.cardTitleText}
            left={(props) => <List.Icon {...props} icon="robot" color={theme.colors.primary} />} 
          />
          <Divider style={{ backgroundColor: theme.colors.border }} />
          <List.Item
            title="Workflow Configuration"
            description="Manage N8N workflow settings"
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDesc}
            left={props => <List.Icon {...props} icon="cog-sync" color={theme.colors.primary} />}
            right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.textSecondary} />}
            onPress={() => navigation.navigate('Workflow')}
          />
        </Card>

        {/* Danger Zone */}
        <Card style={[styles.card, styles.dangerCard]} elevation={2}>
          <Card.Content>
            <Text style={styles.dangerTitle}>⚠️ Danger Zone</Text>
            <Button 
              mode="outlined" 
              icon="logout" 
              onPress={() => {
                Alert.alert('Logout', 'Are you sure?', [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Logout', 
                    style: 'destructive',
                    onPress: async () => {
                      await AsyncStorage.multiRemove(['currentUser', 'profilePicture']);
                      navigation.navigate('Login');
                    }
                  },
                ]);
              }} 
              textColor="#EF4444" 
              style={styles.dangerButton}
            >
              Logout
            </Button>
          </Card.Content>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  content: { flex: 1, padding: 20 },
  card: { borderRadius: 20, marginBottom: 15, backgroundColor: theme.colors.card },
  cardTitleText: { color: theme.colors.text },
  listTitle: { color: theme.colors.text },
  listDesc: { color: theme.colors.textSecondary },
  dangerCard: { backgroundColor: theme.dark ? '#3B1A1A' : '#FEF2F2' },
  dangerTitle: { fontSize: 18, fontWeight: 'bold', color: '#EF4444', marginBottom: 15 },
  dangerButton: { borderColor: '#FEE2E2', borderRadius: 12 },
});

export default SettingsScreen;