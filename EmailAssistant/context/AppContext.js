// context/AppContext.js - With Dark Mode Support
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Responsive helper
export const responsive = {
  width,
  height,
  isSmall: width < 375,
  isMedium: width >= 375 && width < 414,
  isLarge: width >= 414,
  scale: (size) => (width / 375) * size,
};

// Light Theme
const lightTheme = {
  dark: false,
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    inputBg: '#FFFFFF',
    headerGradient: ['#667eea', '#764ba2'],
  },
};

// Dark Theme
const darkTheme = {
  dark: true,
  colors: {
    primary: '#818CF8',
    secondary: '#A78BFA',
    success: '#34D399',
    danger: '#F87171',
    warning: '#FBBF24',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    inputBg: '#1E293B',
    headerGradient: ['#4F46E5', '#7C3AED'],
  },
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);

  // Load settings on app start
  useEffect(() => {
    loadSettings();
  }, []);

  // Update theme when dark mode changes
  useEffect(() => {
    setTheme(isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  const loadSettings = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }

      const savedDarkMode = await AsyncStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const login = async (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('currentUser');
  };

  return (
    <AppContext.Provider value={{ 
      theme,
      isDarkMode,
      toggleDarkMode,
      user, 
      setUser, 
      isLoggedIn, 
      login, 
      logout,
      responsive,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

export default AppContext;