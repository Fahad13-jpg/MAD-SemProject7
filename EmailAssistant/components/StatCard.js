// components/StatCard.js
// CLASS-BASED COMPONENT (Requirement B.3)
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

class StatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count || 0,
    };
  }

  // Method to increment count
  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    const { title, icon, color } = this.props;
    
    return (
      <Card style={styles.card} elevation={2} onPress={this.incrementCount}>
        <Card.Content style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <IconButton icon={icon} size={24} iconColor="#fff" />
          </View>
          <Text style={styles.number}>{this.state.count}</Text>
          <Text style={styles.label}>{title}</Text>
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: { flex: 1, marginHorizontal: 4, borderRadius: 15 },
  content: { alignItems: 'center', paddingVertical: 10 },
  iconContainer: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  number: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  label: { fontSize: 11, color: '#64748B', marginTop: 2 },
});

export default StatCard;