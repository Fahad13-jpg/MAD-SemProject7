// LoginScreen.js - With Firebase Authentication
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Card, 
  Divider, 
  IconButton,
  Surface,
  ActivityIndicator
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      // Call Firebase login
      const result = await AuthService.login(email, password);

      if (result.success) {
        // Save user to AsyncStorage for session
        await AsyncStorage.setItem('currentUser', JSON.stringify(result.user));
        
        Alert.alert('Success', `Welcome back, ${result.user.fullName}!`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Surface style={styles.logoCircle} elevation={5}>
          <Text style={styles.logoEmoji}>📧</Text>
        </Surface>
        <Text style={styles.appTitle}>Email Assistant</Text>
        <Text style={styles.appSubtitle}>Powered by AI & N8N</Text>
      </LinearGradient>

      {/* Login Card */}
      <Card style={styles.loginCard} elevation={8}>
        <Card.Content>
          <Text style={styles.welcomeTitle}>Welcome Back! 👋</Text>
          <Text style={styles.welcomeSubtitle}>
            Login to manage your emails smartly
          </Text>

          {/* Email Input */}
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            left={<TextInput.Icon icon="email" color="#667eea" />}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            theme={{ colors: { primary: '#667eea' } }}
            disabled={loading}
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" color="#667eea" />}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            theme={{ colors: { primary: '#667eea' } }}
            disabled={loading}
          />

          {/* Forgot Password */}
          <Button 
            mode="text" 
            onPress={() => Alert.alert('Info', 'Contact admin to reset password')} 
            compact
            style={styles.forgotButton}
            labelStyle={{ color: '#667eea' }}
          >
            Forgot Password?
          </Button>

          {/* Login Button */}
          <Button 
            mode="contained" 
            onPress={handleLogin}
            contentStyle={styles.loginButtonContent}
            style={styles.loginButton}
            buttonColor="#667eea"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              'Login to Dashboard'
            )}
          </Button>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <Divider style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Surface style={styles.socialButton} elevation={2}>
              <IconButton 
                icon="google" 
                size={28} 
                iconColor="#EA4335"
                onPress={() => Alert.alert('Coming Soon', 'Google login coming soon!')}
              />
              <Text style={styles.socialText}>Google</Text>
            </Surface>

            <Surface style={styles.socialButton} elevation={2}>
              <IconButton 
                icon="facebook" 
                size={28} 
                iconColor="#1877F2"
                onPress={() => Alert.alert('Coming Soon', 'Facebook login coming soon!')}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </Surface>

            <Surface style={styles.socialButton} elevation={2}>
              <IconButton 
                icon="microsoft" 
                size={28} 
                iconColor="#00A4EF"
                onPress={() => Alert.alert('Coming Soon', 'Outlook login coming soon!')}
              />
              <Text style={styles.socialText}>Outlook</Text>
            </Surface>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Button 
              mode="text" 
              onPress={() => navigation.navigate('SignUp')} 
              compact
              labelStyle={styles.signupButton}
            >
              Sign Up Free
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🔐 Data stored securely in Firebase
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoEmoji: {
    fontSize: 45,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 15,
    color: 'white',
    opacity: 0.9,
  },
  loginCard: {
    margin: 20,
    marginTop: -40,
    borderRadius: 25,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    color: '#1E293B',
  },
  welcomeSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.7,
    color: '#64748B',
  },
  input: {
    marginBottom: 15,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -10,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 12,
  },
  loginButtonContent: {
    paddingVertical: 6,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 11,
    opacity: 0.6,
    color: '#64748B',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  socialText: {
    fontSize: 12,
    marginTop: -5,
    color: '#475569',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#64748B',
  },
  signupButton: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    color: '#64748B',
  },
});

export default LoginScreen;