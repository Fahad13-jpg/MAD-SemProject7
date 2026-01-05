// Screens/SensorScreen.js - User Friendly Version
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, IconButton, Card, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Accelerometer } from 'expo-sensors';

const SensorScreen = ({ navigation }) => {
  const [movement, setMovement] = useState({ x: 0, y: 0, z: 0 });
  const [shakeCount, setShakeCount] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const lastShake = useRef(0);

  // Start listening to phone movement
  const startListening = () => {
    const sub = Accelerometer.addListener(data => {
      setMovement(data);
      
      // Detect shake gesture
      const totalMovement = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);
      const now = Date.now();
      
      // If phone is shaken hard enough and 1 second passed since last shake
      if (totalMovement > 2.5 && now - lastShake.current > 1000) {
        lastShake.current = now;
        setShakeCount(prev => {
          const newCount = prev + 1;
          Alert.alert(
            '🔄 Shake Detected!', 
            `Great! You shook the phone ${newCount} time${newCount > 1 ? 's' : ''}!\n\nIn a real app, this could refresh your emails.`
          );
          return newCount;
        });
      }
    });
    
    Accelerometer.setUpdateInterval(100);
    setSubscription(sub);
    setIsListening(true);
  };

  // Stop listening
  const stopListening = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsListening(false);
  };

  // Start on screen open
  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  // Toggle sensor on/off
  const toggleSensor = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Reset shake counter
  const resetCounter = () => {
    setShakeCount(0);
    Alert.alert('✅ Reset', 'Shake counter has been reset to 0!');
  };

  // Calculate movement intensity for display
  const getMovementLevel = () => {
    const total = Math.abs(movement.x) + Math.abs(movement.y) + Math.abs(movement.z);
    if (total < 1) return { level: 'Still', color: '#10B981', emoji: '😴' };
    if (total < 1.5) return { level: 'Light Movement', color: '#3B82F6', emoji: '🚶' };
    if (total < 2.5) return { level: 'Moving', color: '#F59E0B', emoji: '🏃' };
    return { level: 'Shaking!', color: '#EF4444', emoji: '🤸' };
  };

  const movementInfo = getMovementLevel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>📱 Motion Sensor</Text>
          <View style={{ width: 48 }} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        
        {/* Status Card */}
        <Card style={styles.statusCard} elevation={3}>
          <Card.Content style={styles.statusContent}>
            <View style={[styles.statusIndicator, { backgroundColor: isListening ? '#10B981' : '#EF4444' }]}>
              <Text style={styles.statusEmoji}>{isListening ? '👁️' : '😴'}</Text>
            </View>
            <Text style={styles.statusText}>
              Sensor is {isListening ? 'Active' : 'Paused'}
            </Text>
            <Text style={styles.statusSubtext}>
              {isListening ? 'Move your phone to see changes' : 'Tap button below to start'}
            </Text>
          </Card.Content>
        </Card>

        {/* Movement Display Card */}
        <Card style={styles.movementCard} elevation={2}>
          <Card.Content>
            <View style={styles.movementHeader}>
              <Text style={styles.cardTitle}>📊 Phone Movement</Text>
              <View style={[styles.levelBadge, { backgroundColor: movementInfo.color }]}>
                <Text style={styles.levelBadgeText}>{movementInfo.emoji} {movementInfo.level}</Text>
              </View>
            </View>
            
            {/* Movement Bars */}
            <View style={styles.movementBars}>
              <View style={styles.barRow}>
                <Text style={styles.barLabel}>↔️ Left-Right</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${Math.min(Math.abs(movement.x) * 50, 100)}%`, backgroundColor: '#EF4444' }]} />
                </View>
                <Text style={styles.barValue}>{Math.abs(movement.x).toFixed(1)}</Text>
              </View>
              
              <View style={styles.barRow}>
                <Text style={styles.barLabel}>↕️ Up-Down</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${Math.min(Math.abs(movement.y) * 50, 100)}%`, backgroundColor: '#10B981' }]} />
                </View>
                <Text style={styles.barValue}>{Math.abs(movement.y).toFixed(1)}</Text>
              </View>
              
              <View style={styles.barRow}>
                <Text style={styles.barLabel}>🔄 Forward-Back</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${Math.min(Math.abs(movement.z) * 50, 100)}%`, backgroundColor: '#3B82F6' }]} />
                </View>
                <Text style={styles.barValue}>{Math.abs(movement.z).toFixed(1)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Shake Counter Card */}
        <Card style={styles.shakeCard} elevation={3}>
          <LinearGradient colors={['#667eea', '#764ba2']} style={styles.shakeGradient}>
            <Text style={styles.shakeEmoji}>🔄</Text>
            <Text style={styles.shakeTitle}>Shake to Refresh</Text>
            <Text style={styles.shakeCount}>{shakeCount}</Text>
            <Text style={styles.shakeLabel}>Times Shaken</Text>
            <Text style={styles.shakeHint}>
              Shake your phone hard to trigger a refresh!{'\n'}
              This simulates "shake to refresh emails" feature.
            </Text>
          </LinearGradient>
        </Card>

        {/* Control Buttons */}
        <View style={styles.controls}>
          <Button 
            mode="contained" 
            onPress={toggleSensor}
            buttonColor={isListening ? '#EF4444' : '#10B981'}
            style={styles.controlButton}
            icon={isListening ? 'pause' : 'play'}
          >
            {isListening ? '⏸️ Pause Sensor' : '▶️ Start Sensor'}
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={resetCounter}
            style={styles.controlButton}
            icon="refresh"
          >
            🔄 Reset Counter
          </Button>
        </View>

        {/* Help Card */}
        <Card style={styles.helpCard} elevation={1}>
          <Card.Content>
            <Text style={styles.helpTitle}>💡 How it works</Text>
            <Text style={styles.helpText}>
              • Your phone has sensors that detect movement{'\n'}
              • The bars show how much you're moving the phone{'\n'}
              • Shake hard to trigger the "shake to refresh" action{'\n'}
              • This is used in many apps to refresh content!
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  content: { flex: 1, padding: 20 },
  
  // Status Card
  statusCard: { borderRadius: 20, marginBottom: 15 },
  statusContent: { alignItems: 'center', padding: 15 },
  statusIndicator: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statusEmoji: { fontSize: 30 },
  statusText: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  statusSubtext: { fontSize: 13, color: '#64748B', marginTop: 5 },
  
  // Movement Card
  movementCard: { borderRadius: 20, marginBottom: 15 },
  movementHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  levelBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  levelBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  movementBars: { gap: 12 },
  barRow: { flexDirection: 'row', alignItems: 'center' },
  barLabel: { width: 110, fontSize: 13, color: '#64748B' },
  barContainer: { flex: 1, height: 12, backgroundColor: '#E2E8F0', borderRadius: 6, marginHorizontal: 10, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 6 },
  barValue: { width: 35, fontSize: 13, fontWeight: '600', color: '#1E293B', textAlign: 'right' },
  
  // Shake Card
  shakeCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 15 },
  shakeGradient: { padding: 25, alignItems: 'center' },
  shakeEmoji: { fontSize: 40, marginBottom: 10 },
  shakeTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  shakeCount: { fontSize: 70, fontWeight: 'bold', color: 'white', marginVertical: 10 },
  shakeLabel: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },
  shakeHint: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 15, textAlign: 'center', lineHeight: 20 },
  
  // Controls
  controls: { gap: 10, marginBottom: 15 },
  controlButton: { borderRadius: 12 },
  
  // Help Card
  helpCard: { borderRadius: 20, backgroundColor: '#EEF2FF' },
  helpTitle: { fontSize: 16, fontWeight: 'bold', color: '#667eea', marginBottom: 10 },
  helpText: { fontSize: 14, color: '#475569', lineHeight: 22 },
});

export default SensorScreen;