// App.js - With AppProvider for Dark Mode
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from './context/AppContext';

// Screens
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';
import EmailListScreen from './Screens/EmailListScreen';
import EmailDetailScreen from './Screens/EmailDetailScreen';
import ComposeEmailScreen from './Screens/ComposeEmailScreen';
import WorkflowScreen from './Screens/WorkflowScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MapScreen from './Screens/MapScreen';
import CameraScreen from './Screens/CameraScreen';
import SensorScreen from './Screens/SensorScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
function MainTabs() {
  const { theme } = useApp();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.colors.card,
          position: 'absolute',
          elevation: 10,
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'EmailsTab') iconName = focused ? 'mail' : 'mail-outline';
          else if (route.name === 'SettingsTab') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="EmailsTab" component={EmailListScreen} options={{ tabBarLabel: 'Emails' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Main Navigator
function MainNavigator() {
  const { theme } = useApp();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="EmailList" component={EmailListScreen} />
        <Stack.Screen name="EmailDetail" component={EmailDetailScreen} />
        <Stack.Screen name="ComposeEmail" component={ComposeEmailScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="Workflow" component={WorkflowScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Sensor" component={SensorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// App with Providers
export default function App() {
  return (
    <AppProvider>
      <PaperProvider>
        <MainNavigator />
      </PaperProvider>
    </AppProvider>
  );
}