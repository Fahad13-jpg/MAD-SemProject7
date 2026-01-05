// components/CustomButton.js
// Custom Reusable Component with Props (Requirement B.6)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconButton } from 'react-native-paper';

const CustomButton = ({ 
  title, 
  onPress, 
  icon, 
  colors = ['#667eea', '#764ba2'],
  style 
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <LinearGradient colors={colors} style={styles.gradient} start={{x:0,y:0}} end={{x:1,y:1}}>
        {icon && <IconButton icon={icon} size={20} iconColor="white" style={styles.icon} />}
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 12, overflow: 'hidden', marginVertical: 5 },
  gradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 20 },
  icon: { margin: 0, marginRight: -5 },
  text: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default CustomButton;