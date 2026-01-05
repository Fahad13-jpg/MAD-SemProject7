// Screens/CameraScreen.js - Complete Camera with Gallery Upload
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Alert, Platform } from 'react-native';
import { Text, IconButton, Button, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);

  // Take photo with camera
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setPhoto(photoData.uri);
      } catch (error) {
        Alert.alert('Error', 'Could not take photo');
        console.error(error);
      }
    }
  };

  // Pick image from gallery/PC
  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Gallery permission is required');
        return;
      }

      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not pick image');
      console.error(error);
    }
  };

  // Save as profile picture
  const saveAsProfilePicture = async () => {
    try {
      await AsyncStorage.setItem('profilePicture', photo);
      Alert.alert(
        'Success! ✅', 
        'Profile picture updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Could not save profile picture');
    }
  };

  // Toggle camera facing
  const toggleCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  // Loading state
  if (!permission) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>📷 Camera</Text>
            <View style={{ width: 48 }} />
          </View>
        </LinearGradient>
        <View style={styles.centerContent}>
          <Text>Loading camera...</Text>
        </View>
      </View>
    );
  }

  // Permission not granted - Show upload option
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>📷 Camera</Text>
            <View style={{ width: 48 }} />
          </View>
        </LinearGradient>
        
        <View style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Card.Content style={styles.permissionContent}>
              <Text style={styles.permissionEmoji}>📷</Text>
              <Text style={styles.permissionTitle}>Camera Access</Text>
              <Text style={styles.permissionText}>
                Grant camera permission to take photos, or upload from gallery
              </Text>
              
              <Button 
                mode="contained" 
                onPress={requestPermission} 
                buttonColor="#667eea" 
                style={styles.permissionBtn}
                icon="camera"
              >
                Enable Camera
              </Button>
              
              <Text style={styles.orText}>— OR —</Text>
              
              <Button 
                mode="outlined" 
                onPress={pickImage} 
                style={styles.uploadBtn}
                icon="image"
              >
                Upload from Gallery / PC
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Show selected photo */}
        {photo && (
          <View style={styles.previewSection}>
            <Image source={{ uri: photo }} style={styles.previewSmall} />
            <View style={styles.previewActions}>
              <Button mode="outlined" onPress={() => setPhoto(null)}>Cancel</Button>
              <Button mode="contained" buttonColor="#10B981" onPress={saveAsProfilePicture}>
                Use as Profile
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }

  // Photo preview screen
  if (photo) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
          <View style={styles.headerContent}>
            <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => setPhoto(null)} />
            <Text style={styles.headerTitle}>📷 Preview</Text>
            <View style={{ width: 48 }} />
          </View>
        </LinearGradient>

        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          
          <Card style={styles.actionCard}>
            <Card.Content>
              <Text style={styles.actionTitle}>Use this photo?</Text>
              <View style={styles.actionButtons}>
                <Button 
                  mode="outlined" 
                  onPress={() => setPhoto(null)} 
                  style={styles.actionBtn}
                  icon="camera-retake"
                >
                  Retake
                </Button>
                <Button 
                  mode="contained" 
                  buttonColor="#10B981" 
                  onPress={saveAsProfilePicture} 
                  style={styles.actionBtn}
                  icon="check"
                >
                  Use as Profile
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    );
  }

  // Camera view
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>📷 Camera</Text>
          <IconButton icon="camera-flip" iconColor="white" size={24} onPress={toggleCamera} />
        </View>
      </LinearGradient>

      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        
        {/* Camera Controls */}
        <View style={styles.controls}>
          <View style={styles.controlsRow}>
            {/* Gallery Button */}
            <IconButton
              icon="image"
              size={30}
              iconColor="white"
              style={styles.sideButton}
              onPress={pickImage}
            />
            
            {/* Capture Button */}
            <IconButton
              icon="camera"
              size={50}
              iconColor="white"
              style={styles.captureButton}
              onPress={takePhoto}
            />
            
            {/* Flip Camera Button */}
            <IconButton
              icon="camera-flip"
              size={30}
              iconColor="white"
              style={styles.sideButton}
              onPress={toggleCamera}
            />
          </View>
          
          <Text style={styles.hintText}>Tap 📷 to capture or 🖼️ to upload</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingBottom: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  
  // Permission Screen
  permissionContainer: { flex: 1, backgroundColor: '#F8FAFC', padding: 20, justifyContent: 'center' },
  permissionCard: { borderRadius: 20 },
  permissionContent: { alignItems: 'center', padding: 20 },
  permissionEmoji: { fontSize: 60, marginBottom: 15 },
  permissionTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  permissionText: { fontSize: 15, color: '#64748B', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  permissionBtn: { width: '100%', borderRadius: 12, marginBottom: 15 },
  orText: { color: '#94A3B8', marginVertical: 15, fontSize: 14 },
  uploadBtn: { width: '100%', borderRadius: 12 },
  
  // Preview Section (for permission screen)
  previewSection: { backgroundColor: '#F8FAFC', padding: 20 },
  previewSmall: { width: '100%', height: 200, borderRadius: 15, marginBottom: 15 },
  previewActions: { flexDirection: 'row', justifyContent: 'space-around' },
  
  // Camera Screen
  cameraContainer: { flex: 1 },
  camera: { flex: 1 },
  controls: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 40, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  controlsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 30 },
  captureButton: { backgroundColor: '#667eea', borderRadius: 40, width: 80, height: 80 },
  sideButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25 },
  hintText: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 15, fontSize: 13 },
  
  // Preview Screen
  previewContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  preview: { flex: 1, margin: 20, borderRadius: 20 },
  actionCard: { margin: 20, marginTop: 0, borderRadius: 15 },
  actionTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#1E293B' },
  actionButtons: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, borderRadius: 12 },
});

export default CameraScreen;