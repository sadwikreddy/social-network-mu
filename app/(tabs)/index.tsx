import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, ScrollView, TextInput } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { users, currentUser } from '@/constants/dummyData';
import Avatar from '@/components/ui/Avatar';
import { Bell, Search, Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const recentlyActive = [...users].sort(() => 0.5 - Math.random()).slice(0, 6);
  
  const events = [
    {
      id: 'event1',
      title: 'CS Department Mixer',
      date: 'Today, 6:00 PM',
      location: 'Computer Science Building',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'event2',
      title: 'Study Group: Algorithms',
      date: 'Tomorrow, 3:00 PM',
      location: 'University Library, Room 302',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 'event3',
      title: 'Campus Basketball Tournament',
      date: 'Saturday, 12:00 PM',
      location: 'MU Sports Center',
      image: 'https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {currentUser.name.split(' ')[0]}</Text>
          <Text style={styles.subGreeting}>Welcome back to MU Connect</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable 
            style={styles.iconContainer}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={24} color={colors.neutral[700]} />
            <View style={styles.notificationBadge} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchRow}>
          <Pressable 
            style={styles.searchBar}
            onPress={handleSearch}
          >
            <Search size={20} color={colors.neutral[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search people, groups, events..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Active</Text>
          </View>
          <FlatList
            horizontal
            data={recentlyActive}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.activeUser}
                onPress={() => router.push(`/messages/${item.id}`)}
              >
                <Avatar 
                  uri={item.avatar} 
                  name={item.name} 
                  size="md"
                  showStatus
                  isOnline={item.isOnline}
                />
                <Text style={styles.activeUserName} numberOfLines={1}>
                  {item.name.split(' ')[0]}
                </Text>
              </Pressable>
            )}
            style={styles.activeUsersList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <Pressable 
              style={styles.viewAll}
              onPress={() => router.push('/profile/events')}
            >
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          </View>
          {events.map((event) => (
            <Pressable 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => router.push(`/events/${event.id}`)}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Study Groups</Text>
            <Pressable 
              style={styles.viewAll}
              onPress={() => router.push('/groups')}
            >
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          </View>
          <View style={styles.studyGroupsRow}>
            <Pressable 
              style={styles.studyGroupCard}
              onPress={() => router.push('/groups/mobile-dev')}
            >
              <View style={styles.studyGroupMembersRow}>
                <View style={styles.studyGroupMembers}>
                  <Avatar uri={users[0].avatar} size="xs" style={styles.groupMember1} />
                  <Avatar uri={users[1].avatar} size="xs" style={styles.groupMember2} />
                  <Avatar uri={users[2].avatar} size="xs" style={styles.groupMember3} />
                </View>
                <Text style={styles.studyGroupMemberCount}>+12</Text>
              </View>
              <Text style={styles.studyGroupName}>Mobile Development</Text>
              <Text style={styles.studyGroupDetails}>Meeting tomorrow at 4 PM</Text>
            </Pressable>
            <Pressable 
              style={styles.studyGroupCard}
              onPress={() => router.push('/groups/calculus')}
            >
              <View style={styles.studyGroupMembersRow}>
                <View style={styles.studyGroupMembers}>
                  <Avatar uri={users[3].avatar} size="xs" style={styles.groupMember1} />
                  <Avatar uri={users[4].avatar} size="xs" style={styles.groupMember2} />
                  <Avatar uri={users[5].avatar} size="xs" style={styles.groupMember3} />
                </View>
                <Text style={styles.studyGroupMemberCount}>+8</Text>
              </View>
              <Text style={styles.studyGroupName}>Calculus III</Text>
              <Text style={styles.studyGroupDetails}>Daily sessions from 5-7 PM</Text>
            </Pressable>
          </View>
          <Pressable 
            style={styles.createStudyGroup}
            onPress={() => router.push('/groups/create')}
          >
            <Plus size={24} color={colors.primary[500]} />
            <Text style={styles.createStudyGroupText}>Create a new study group</Text>
          </Pressable>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.neutral[900],
  },
  subGreeting: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: spacing.xs / 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error[500],
    borderWidth: 2,
    borderColor: colors.neutral[100],
  },
  searchRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[900],
    marginLeft: spacing.xs,
  },
  section: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.neutral[900],
  },
  viewAll: {
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.xs,
  },
  viewAllText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[500],
  },
  activeUsersList: {
    flexGrow: 0,
    marginLeft: -spacing.xs,
  },
  activeUser: {
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    width: 70,
  },
  activeUserName: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[700],
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfo: {
    padding: spacing.md,
  },
  eventTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  eventDate: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[600],
    marginBottom: spacing.xs / 2,
  },
  eventLocation: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
  studyGroupsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studyGroupCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    width: '48%',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  studyGroupMembersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  studyGroupMembers: {
    flexDirection: 'row',
    position: 'relative',
    height: 32,
    width: 70,
  },
  groupMember1: {
    position: 'absolute',
    left: 0,
    zIndex: 3,
    borderWidth: 2,
    borderColor: colors.white,
  },
  groupMember2: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
    borderWidth: 2,
    borderColor: colors.white,
  },
  groupMember3: {
    position: 'absolute',
    left: 32,
    zIndex: 1,
    borderWidth: 2,
    borderColor: colors.white,
  },
  studyGroupMemberCount: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[600],
  },
  studyGroupName: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  studyGroupDetails: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.neutral[600],
  },
  createStudyGroup: {
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary[100],
    borderStyle: 'dashed',
  },
  createStudyGroupText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[500],
    marginLeft: spacing.xs,
  },
  spacer: {
    height: 30,
  },
});