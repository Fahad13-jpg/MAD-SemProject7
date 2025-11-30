// SignUpScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Card, 
  Divider, 
  IconButton, 
  Checkbox, 
  ProgressBar,
  Surface,
  Chip
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to Terms and Conditions');
      return;
    }
    navigation.navigate('Home');
  };

  // Password strength calculation - Matching color theme
  const passwordStrength = Math.min(password.length / 12, 1);
  const getStrengthColor = () => {
    if (password.length < 8) return '#EF4444';
    if (password.length < 10) return '#F59E0B';
    return '#10B981';
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient - Matching Home/Login Screen */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <IconButton
          icon="arrow-left"
          iconColor="white"
          size={26}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Surface style={styles.iconCircle} elevation={5}>
          <Text style={styles.headerEmoji}>🎉</Text>
        </Surface>
        <Text style={styles.headerTitle}>Join Us Today!</Text>
        <Text style={styles.headerSubtitle}>Create your free account</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Form Card */}
        <Card style={styles.formCard} elevation={8}>
          <Card.Content>
            {/* Full Name */}
            <TextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              mode="outlined"
              left={<TextInput.Icon icon="account" color="#667eea" />}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Email */}
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              left={<TextInput.Icon icon="email" color="#667eea" />}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Password */}
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
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <ProgressBar 
                  progress={passwordStrength} 
                  color={getStrengthColor()}
                  style={styles.progressBar} 
                />
                <Chip 
                  icon={password.length >= 8 ? "check" : "alert"}
                  compact
                  style={[styles.strengthChip, { backgroundColor: getStrengthColor() }]}
                  textStyle={styles.chipText}
                >
                  {password.length < 8 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong'}
                </Chip>
              </View>
            )}

            {/* Confirm Password */}
            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-check" color="#667eea" />}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#667eea',
                },
              }}
            />

            {/* Terms Checkbox */}
            <Surface style={styles.checkboxSurface} elevation={1}>
              <Checkbox
                status={agreeTerms ? 'checked' : 'unchecked'}
                onPress={() => setAgreeTerms(!agreeTerms)}
                color="#667eea"
              />
              <Text style={styles.checkboxText}>
                I agree to <Text style={styles.linkText}>Terms & Conditions</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </Surface>

            {/* Sign Up Button */}
            <Button 
              mode="contained" 
              onPress={handleSignUp}
              contentStyle={styles.signupButtonContent}
              style={styles.signupButton}
              buttonColor="#667eea"
            >
              Create My Account
            </Button>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
              <Divider style={styles.divider} />
            </View>

            {/* Social Sign Up */}
            <View style={styles.socialContainer}>
              <Surface style={styles.socialButton} elevation={2}>
                <IconButton icon="google" size={26} iconColor="#EA4335" />
              </Surface>
              <Surface style={styles.socialButton} elevation={2}>
                <IconButton icon="facebook" size={26} iconColor="#1877F2" />
              </Surface>
              <Surface style={styles.socialButton} elevation={2}>
                <IconButton icon="apple" size={26} iconColor="#000000" />
              </Surface>
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Button 
                mode="text" 
                onPress={() => navigation.navigate('Login')} 
                compact
                labelStyle={styles.loginButton}
              >
                Login Here
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={{ height: 30 }} />
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
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  iconCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerEmoji: {
    fontSize: 38,
  },
  headerTitle: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  formCard: {
    margin: 20,
    marginTop: -30,
    borderRadius: 25,
  },
  input: {
    marginBottom: 12,
  },
  strengthContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  strengthChip: {
    alignSelf: 'flex-start',
  },
  chipText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  checkboxSurface: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: '#F1F5F9',
  },
  checkboxText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 13,
    color: '#475569',
  },
  linkText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  signupButtonContent: {
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
    justifyContent: 'center',
    gap: 15,
    marginBottom: 15,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginButton: {
    fontWeight: 'bold',
    color: '#667eea',
  },
});

export default SignUpScreen;// SignUpScreen.js
