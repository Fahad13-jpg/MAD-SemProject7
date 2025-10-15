import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import HomeScreen from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />

          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
          />

          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}