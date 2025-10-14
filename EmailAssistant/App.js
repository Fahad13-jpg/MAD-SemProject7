// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';

// Create stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />

        {/* Sign Up Screen */}
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
        />

        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}