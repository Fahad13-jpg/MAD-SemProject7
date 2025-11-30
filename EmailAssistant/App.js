// App.js - Static Navigation Configuration (Functional)
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Import all screens
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

// Create Stack
const Stack = createNativeStackNavigator();

// Define screens object (static-looking)
const screens = {
  Login: {
    screen: LoginScreen,
    options: { headerShown: false },
  },
  SignUp: {
    screen: SignUpScreen,
    options: { headerShown: false },
  },
  Home: {
    screen: HomeScreen,
    options: { headerShown: false },
  },
  EmailList: {
    screen: EmailListScreen,
    options: { headerShown: false },
  },
  EmailDetail: {
    screen: EmailDetailScreen,
    options: { headerShown: false },
  },
  ComposeEmail: {
    screen: ComposeEmailScreen,
    options: { headerShown: false, presentation: 'modal' },
  },
  Workflow: {
    screen: WorkflowScreen,
    options: { headerShown: false },
  },
  Notifications: {
    screen: NotificationsScreen,
    options: { headerShown: false },
  },
  Settings: {
    screen: SettingsScreen,
    options: { headerShown: false },
  },
  Profile: {
    screen: ProfileScreen,
    options: { headerShown: false },
  },
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {Object.keys(screens).map((name) => (
            <Stack.Screen
              key={name}
              name={name}
              component={screens[name].screen}
              options={screens[name].options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
