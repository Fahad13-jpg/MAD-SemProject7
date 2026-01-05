// EmailListScreen.js - Updated with FlatList & Custom Components
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, IconButton, Searchbar, Chip, FAB } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import EmailCard from '../components/EmailCard';

const EmailListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const emails = [
    { id: '1', sender: 'Prof. Ahmed Khan', subject: 'Project Submission Deadline', preview: 'Please submit your semester project by next Friday...', time: '10:30 AM', category: 'Important', unread: true },
    { id: '2', sender: 'Sarah Wilson', subject: 'Meeting Tomorrow', preview: 'Hi, just reminder about our meeting tomorrow at 10 AM...', time: '9:15 AM', category: 'Work', unread: true },
    { id: '3', sender: 'Netflix', subject: 'New Shows This Week', preview: 'Check out the latest shows and movies added this week...', time: 'Yesterday', category: 'Personal', unread: false },
    { id: '4', sender: 'Bank Alert', subject: 'Account Statement', preview: 'Your monthly account statement is now available...', time: 'Yesterday', category: 'Personal', unread: false },
  ];

  const filters = ['All', 'Important', 'Work', 'Personal', 'Unread'];

  // Filter emails using array filter method (Requirement A.1)
  const filteredEmails = emails.filter(email => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Unread') return email.unread;
    return email.category === selectedFilter;
  });

  // Handle email press
  const handleEmailPress = (email) => {
    navigation.navigate('EmailDetail', { email });
  };

  // Render item for FlatList
  const renderEmail = ({ item }) => (
    <EmailCard email={item} onPress={handleEmailPress} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header} start={{x:0,y:0}} end={{x:1,y:1}}>
        <View style={styles.headerContent}>
          <IconButton icon="arrow-left" iconColor="white" size={24} onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>All Emails</Text>
          <IconButton icon="filter" iconColor="white" size={24} onPress={() => {}} />
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar placeholder="Search emails..." onChangeText={setSearchQuery} value={searchQuery} style={styles.searchBar} />
      </View>

      {/* Filter Chips - Using map (Requirement A.1) */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <Chip
            key={filter}
            selected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
            style={styles.filterChip}
          >
            {filter}
          </Chip>
        ))}
      </View>

      {/* Email Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {filteredEmails.length} emails • {emails.filter(e => e.unread).length} unread
        </Text>
      </View>

      {/* FlatList (Requirement B.4) */}
      <FlatList
        data={filteredEmails}
        renderItem={renderEmail}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <FAB icon="pencil" style={styles.fab} color="white" onPress={() => navigation.navigate('ComposeEmail')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingTop: 50, paddingBottom: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 15 },
  searchBar: { elevation: 2 },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, flexWrap: 'wrap', gap: 8 },
  filterChip: { marginRight: 5 },
  countContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  countText: { fontSize: 13, color: '#64748B' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#667eea' },
});

export default EmailListScreen;