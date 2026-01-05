// Screens/ProfileScreen.js - With Profile Picture Upload
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { 
  Card, Text, IconButton, Avatar, Button, Chip, List, Divider 
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('student@university.edu');

  // Load profile data on mount
  useEffect(() => {
    loadProfileData();
  }, []);

  // Reload when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfileData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadProfileData = async () => {
    try {
      // Load profile picture
      const savedPicture = await AsyncStorage.getItem('profilePicture');
      if (savedPicture) {
        setProfilePicture(savedPicture);
      }

      // Load user data
      const savedUser = await AsyncStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUserName(user.fullName || 'John Doe');
        setUserEmail(user.email || 'student@university.edu');
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery permission is required');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setProfilePicture(uri);
        await AsyncStorage.setItem('profilePicture', uri);
        Alert.alert('Success', 'Profile picture updated!');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick image');
    }
  };

  // Show options to change profile picture
  const showPictureOptions = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => navigation.navigate('Camera') },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Remove Photo', onPress: removeProfilePicture, style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Remove profile picture
  const removeProfilePicture = async () => {
    try {
      await AsyncStorage.removeItem('profilePicture');
      setProfilePicture(null);
      Alert.alert('Removed', 'Profile picture removed');
    } catch (error) {
      console.log('Error removing picture:', error);
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    const names = userName.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return userName.charAt(0) + (userName.charAt(1) || '');
  };

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
          {/* Clickable Profile Picture */}
          <TouchableOpacity onPress={showPictureOptions} style={styles.avatarContainer}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <Avatar.Text
                size={100}
                label={getInitials()}
                style={styles.avatar}
                labelStyle={styles.avatarLabel}
              />
            )}
            {/* Camera Icon Overlay */}
            <View style={styles.cameraOverlay}>
              <IconButton icon="camera" size={18} iconColor="white" style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
          
          <Chip icon="check-decagram" style={styles.verifiedChip} textStyle={{ color: 'white' }}>
            Verified Account
          </Chip>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Change Photo Button */}
        <Card style={styles.photoCard} elevation={2}>
          <Card.Content style={styles.photoCardContent}>
            <View style={styles.photoCardLeft}>
              <IconButton icon="camera" size={24} iconColor="#667eea" />
              <View>
                <Text style={styles.photoCardTitle}>Profile Photo</Text>
                <Text style={styles.photoCardSubtitle}>Tap to change your photo</Text>
              </View>
            </View>
            <Button mode="contained" onPress={showPictureOptions} buttonColor="#667eea" compact>
              Change
            </Button>
          </Card.Content>
        </Card>

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
          <Card.Title title="Quick Actions" titleVariant="titleLarge" />
          <Divider />
          
          <List.Item
            title="Edit Profile"
            description="Update your information"
            left={props => <List.Icon {...props} icon="account-edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Edit Profile', 'Coming soon!')}
          />
          <Divider />
          <List.Item
            title="Change Profile Photo"
            description="Take or upload a new photo"
            left={props => <List.Icon {...props} icon="camera" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={showPictureOptions}
          />
          <Divider />
          <List.Item
            title="Change Password"
            description="Update your password"
            left={props => <List.Icon {...props} icon="lock-reset" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert('Change Password', 'Coming soon!')}
          />
        </Card>

        {/* Account Info */}
        <Card style={styles.infoCard} elevation={2}>
          <Card.Title title="Account Information" titleVariant="titleLarge" />
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
              <Text style={styles.infoLabel}>N8N Workflow</Text>
              <Chip compact icon="check" style={{ backgroundColor: '#D1FAE5' }}>Active</Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Logout Button */}
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
                  await AsyncStorage.clear();
                  navigation.navigate('Login');
                }
              },
            ]);
          }}
          style={styles.logoutButton}
          textColor="#EF4444"
        >
          Logout
        </Button>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 50, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  backButton: { position: 'absolute', top: 50, left: 10, zIndex: 10 },
  profileHeader: { alignItems: 'center', paddingTop: 20 },
  
  // Avatar & Profile Picture
  avatarContainer: { position: 'relative', marginBottom: 15 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white' },
  avatar: { backgroundColor: 'white' },
  avatarLabel: { color: '#667eea', fontWeight: 'bold', fontSize: 36 },
  cameraOverlay: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundColor: '#667eea', 
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  cameraIcon: { margin: 0 },
  
  profileName: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 15 },
  verifiedChip: { backgroundColor: 'rgba(255,255,255,0.2)' },
  
  content: { flex: 1, padding: 20, marginTop: -20 },
  
  // Photo Card
  photoCard: { borderRadius: 15, marginBottom: 15 },
  photoCardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  photoCardLeft: { flexDirection: 'row', alignItems: 'center' },
  photoCardTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  photoCardSubtitle: { fontSize: 13, color: '#64748B' },
  
  // Stats
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statCard: { flex: 1, marginHorizontal: 4, borderRadius: 15 },
  statContent: { alignItems: 'center', paddingVertical: 10 },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', marginTop: 5 },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 3 },
  
  // Cards
  actionsCard: { borderRadius: 20, marginBottom: 15 },
  infoCard: { borderRadius: 20, marginBottom: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  infoLabel: { fontSize: 14, color: '#64748B' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  infoDivider: { marginVertical: 5 },
  
  logoutButton: { borderRadius: 12, borderColor: '#FEE2E2', marginBottom: 10 },
});

export default ProfileScreen;