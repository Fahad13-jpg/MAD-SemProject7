// Screens/MapScreen.js - User Friendly Version
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import { Text, IconButton, Card, Button, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);

  // Get location when screen opens
  useEffect(() => {
    getLocation();
  }, []);

  // Function to get user's current location
  const getLocation = async () => {
    setLoading(true);
    try {
      // Step 1: Ask user for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Needed', 
          'Please allow location access to use this feature.'
        );
        setLoading(false);
        return;
      }

      // Step 2: Get current position from GPS
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation.coords);

      // Step 3: Convert coordinates to readable address
      try {
        let addressResult = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        if (addressResult.length > 0) {
          setAddress(addressResult[0]);
        }
      } catch (e) {
        console.log('Could not get address');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not find your location. Please try again.');
    }
    setLoading(false);
  };

  // Open Google Maps app
  const openInGoogleMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    }
  };

  // Open directions to office
  const openOfficeInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=24.8607,67.0011`;
    Linking.openURL(url);
  };

  // Office location (saved location)
  const officeLocation = {
    name: 'Email Assistant Office',
    city: 'Karachi, Pakistan'
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>📍 My Location</Text>
          <IconButton icon="refresh" iconColor="white" size={24} onPress={getLocation} />
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Finding your location...</Text>
          <Text style={styles.loadingSubtext}>This may take a few seconds</Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Your Location Card */}
          {location ? (
            <Card style={styles.mainCard} elevation={3}>
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.cardGradient}>
                <Text style={styles.cardEmoji}>📍</Text>
                <Text style={styles.cardTitle}>You Are Here!</Text>
                <Text style={styles.cardSubtitle}>Your current position</Text>
              </LinearGradient>
              <Card.Content style={styles.cardBody}>
                
                {/* Position Info - User Friendly */}
                <View style={styles.positionBox}>
                  <View style={styles.positionItem}>
                    <Text style={styles.positionLabel}>↕️ North-South Position</Text>
                    <Text style={styles.positionValue}>{location.latitude.toFixed(4)}°</Text>
                  </View>
                  <View style={styles.positionDivider} />
                  <View style={styles.positionItem}>
                    <Text style={styles.positionLabel}>↔️ East-West Position</Text>
                    <Text style={styles.positionValue}>{location.longitude.toFixed(4)}°</Text>
                  </View>
                </View>

                {/* Accuracy Info */}
                {location.accuracy && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>🎯</Text>
                    <Text style={styles.infoLabel}>Accuracy:</Text>
                    <Text style={styles.infoValue}>Within {Math.round(location.accuracy)} meters</Text>
                  </View>
                )}

                {/* Altitude Info */}
                {location.altitude && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>⛰️</Text>
                    <Text style={styles.infoLabel}>Height:</Text>
                    <Text style={styles.infoValue}>{Math.round(location.altitude)} meters above sea level</Text>
                  </View>
                )}

                <Button 
                  mode="contained" 
                  icon="map" 
                  onPress={openInGoogleMaps}
                  style={styles.mapButton}
                  buttonColor="#667eea"
                >
                  🗺️ View on Google Maps
                </Button>
              </Card.Content>
            </Card>
          ) : (
            <Card style={styles.errorCard} elevation={2}>
              <Card.Content style={styles.errorContent}>
                <Text style={styles.errorEmoji}>😕</Text>
                <Text style={styles.errorTitle}>Location Not Found</Text>
                <Text style={styles.errorText}>
                  We couldn't find your location. Please make sure:
                  {'\n'}• Location services are turned ON
                  {'\n'}• You've given permission to the app
                </Text>
                <Button mode="contained" onPress={getLocation} buttonColor="#667eea" style={styles.retryButton}>
                  Try Again
                </Button>
              </Card.Content>
            </Card>
          )}

          {/* Address Card */}
          {address && (
            <Card style={styles.card} elevation={2}>
              <Card.Content>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionEmoji}>🏠</Text>
                  <Text style={styles.sectionTitle}>Your Address</Text>
                </View>
                <Text style={styles.addressText}>
                  {[
                    address.name,
                    address.street,
                    address.city,
                    address.region,
                    address.country
                  ].filter(Boolean).join(', ')}
                </Text>
                {address.postalCode && (
                  <Text style={styles.postalCode}>Postal Code: {address.postalCode}</Text>
                )}
              </Card.Content>
            </Card>
          )}

          {/* Saved Location Card (Office) */}
          <Card style={styles.card} elevation={2}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEmoji}>🏢</Text>
                <Text style={styles.sectionTitle}>Saved Location</Text>
                <View style={styles.savedBadge}>
                  <Text style={styles.savedBadgeText}>⭐ Saved</Text>
                </View>
              </View>
              <Text style={styles.officeName}>{officeLocation.name}</Text>
              <Text style={styles.officeCity}>{officeLocation.city}</Text>
              
              <Button 
                mode="outlined" 
                icon="directions" 
                onPress={openOfficeInMaps}
                style={styles.directionsButton}
              >
                🧭 Get Directions
              </Button>
            </Card.Content>
          </Card>

          {/* Help Card */}
          <Card style={styles.helpCard} elevation={1}>
            <Card.Content>
              <Text style={styles.helpTitle}>💡 How it works</Text>
              <Text style={styles.helpText}>
                • Your phone uses GPS satellites to find your exact position{'\n'}
                • The position is shown as coordinates (numbers){'\n'}
                • Tap "View on Google Maps" to see it on a real map
              </Text>
            </Card.Content>
          </Card>

          <Button 
            mode="contained" 
            icon="refresh" 
            onPress={getLocation}
            style={styles.refreshButton}
            buttonColor="#667eea"
          >
            🔄 Refresh My Location
          </Button>

          <View style={{ height: 100 }} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  content: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 20, fontSize: 18, fontWeight: '600', color: '#1E293B' },
  loadingSubtext: { marginTop: 5, fontSize: 14, color: '#64748B' },
  
  // Main Card
  mainCard: { borderRadius: 20, marginBottom: 15, overflow: 'hidden' },
  cardGradient: { padding: 25, alignItems: 'center' },
  cardEmoji: { fontSize: 50, marginBottom: 10 },
  cardTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  cardSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  cardBody: { padding: 20 },
  
  // Position Box
  positionBox: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 15, padding: 15, marginBottom: 15 },
  positionItem: { flex: 1, alignItems: 'center' },
  positionDivider: { width: 1, backgroundColor: '#E2E8F0', marginHorizontal: 10 },
  positionLabel: { fontSize: 12, color: '#64748B', marginBottom: 5, textAlign: 'center' },
  positionValue: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  
  // Info Rows
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  infoIcon: { fontSize: 18, marginRight: 10 },
  infoLabel: { fontSize: 15, color: '#64748B', marginRight: 5 },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#1E293B', flex: 1, textAlign: 'right' },
  
  mapButton: { marginTop: 15, borderRadius: 12 },
  
  // Cards
  card: { borderRadius: 20, marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionEmoji: { fontSize: 24, marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', flex: 1 },
  savedBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  savedBadgeText: { color: '#D97706', fontSize: 12, fontWeight: 'bold' },
  
  addressText: { fontSize: 15, color: '#475569', lineHeight: 22 },
  postalCode: { fontSize: 14, color: '#64748B', marginTop: 8 },
  
  officeName: { fontSize: 17, fontWeight: '600', color: '#1E293B' },
  officeCity: { fontSize: 14, color: '#64748B', marginBottom: 15 },
  directionsButton: { borderRadius: 12 },
  
  // Help Card
  helpCard: { borderRadius: 20, marginBottom: 15, backgroundColor: '#EEF2FF' },
  helpTitle: { fontSize: 16, fontWeight: 'bold', color: '#667eea', marginBottom: 10 },
  helpText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  refreshButton: { borderRadius: 12, marginTop: 5 },
  
  // Error Card
  errorCard: { borderRadius: 20, marginBottom: 15 },
  errorContent: { alignItems: 'center', padding: 30 },
  errorEmoji: { fontSize: 60, marginBottom: 15 },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: '#EF4444', marginBottom: 10 },
  errorText: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  retryButton: { borderRadius: 12 },
});

export default MapScreen;