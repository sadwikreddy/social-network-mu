import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { groups } from '@/constants/dummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatListItem from '@/components/chat/ChatListItem';
import { Search, PlusCircle } from 'lucide-react-native';

export default function GroupsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const sortedGroups = [...groups].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const filteredGroups = sortedGroups.filter(group => {
    return group.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Groups</Text>
        <Pressable style={styles.newGroupButton}>
          <PlusCircle size={24} color={colors.primary[500]} />
        </Pressable>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.neutral[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search groups"
          placeholderTextColor={colors.neutral[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            id={item.id}
            name={item.name}
            message={item.lastMessage?.text || ''}
            avatar={item.avatar}
            time={item.updatedAt}
            unread={item.unreadCount}
            isOnline={true} // Groups don't have online status
            hasMedia={item.lastMessage?.media !== undefined}
            isGroup={true}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.groupsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.neutral[900],
  },
  newGroupButton: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
    height: 24,
    padding: 0,
  },
  groupsList: {
    paddingBottom: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginLeft: 72, // Avatar width (48) + left padding
  },
});