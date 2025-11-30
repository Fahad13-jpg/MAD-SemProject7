// EmailListScreen.js

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Card, 
  Text, 
  IconButton, 
  Surface, 
  Searchbar,
  Chip,
  FAB,
  Avatar,
  Divider
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EmailListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const emails = [
    {
      id: 1,
      sender: 'Prof. Ahmed Khan',
      subject: 'Project Submission Deadline',
      preview: 'Please submit your semester project by next Friday...',
      time: '10:30 AM',
      category: 'Important',
      unread: true,
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      subject: 'Meeting Tomorrow',
      preview: 'Hi, just reminder about our meeting tomorrow at 10 AM...',
      time: '9:15 AM',
      category: 'Work',
      unread: true,
    },
    {
      id: 3,
      sender: 'Netflix',
      subject: 'New Shows This Week',
      preview: 'Check out the latest shows and movies added this week...',
      time: 'Yesterday',
      category: 'Personal',
      unread: false,
    },
    {
      id: 4,
      sender: 'Bank Alert',
      subject: 'Account Statement',
      preview: 'Your monthly account statement is now available...',
      time: 'Yesterday',
      category: 'Personal',
      unread: false,
    },
  ];

  const filters = ['All', 'Important', 'Work', 'Personal', 'Unread'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            iconColor="white"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>All Emails</Text>
          <IconButton
            icon="filter"
            iconColor="white"
            size={24}
            onPress={() => {}}
          />
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search emails..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <Chip
            key={filter}
            selected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
            style={styles.filterChip}
            textStyle={selectedFilter === filter && styles.selectedChipText}
          >
            {filter}
          </Chip>
        ))}
      </ScrollView>

      {/* Email Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {emails.length} emails • {emails.filter(e => e.unread).length} unread
        </Text>
      </View>

      {/* Email List */}
      <ScrollView style={styles.emailList} showsVerticalScrollIndicator={false}>
        {emails.map((email) => (
          <Card 
            key={email.id}
            style={[styles.emailCard, email.unread && styles.unreadCard]}
            elevation={2}
            onPress={() => navigation.navigate('EmailDetail', { email })}
          >
            <Card.Content style={styles.emailContent}>
              <View style={styles.emailHeader}>
                <Avatar.Text
                  size={45}
                  label={email.sender.charAt(0)}
                  style={styles.avatar}
                />
                <View style={styles.emailInfo}>
                  <Text 
                    style={[styles.senderName, email.unread && styles.boldText]}
                    numberOfLines={1}
                  >
                    {email.sender}
                  </Text>
                  <Text style={styles.emailTime}>{email.time}</Text>
                </View>
                {email.unread && (
                  <View style={styles.unreadDot} />
                )}
              </View>

              <Text 
                style={[styles.emailSubject, email.unread && styles.boldText]}
                numberOfLines={1}
              >
                {email.subject}
              </Text>
              
              <Text style={styles.emailPreview} numberOfLines={2}>
                {email.preview}
              </Text>

              <View style={styles.emailFooter}>
                <Chip compact icon="tag" style={styles.categoryChip}>
                  {email.category}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="pencil"
        style={styles.fab}
        color="white"
        onPress={() => navigation.navigate('ComposeEmail')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    elevation: 2,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterContent: {
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  selectedChipText: {
    color: 'white',
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  countText: {
    fontSize: 13,
    color: '#64748B',
  },
  emailList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emailCard: {
    marginBottom: 12,
    borderRadius: 15,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  emailContent: {
    paddingVertical: 12,
  },
  emailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#667eea',
  },
  emailInfo: {
    flex: 1,
    marginLeft: 12,
  },
  senderName: {
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 2,
  },
  emailTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  boldText: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#667eea',
  },
  emailSubject: {
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 6,
  },
  emailPreview: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
  },
  emailFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChip: {
    height: 28,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#667eea',
  },
});

export default EmailListScreen;