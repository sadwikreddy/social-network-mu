import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, UserPlus, Check } from 'lucide-react-native';
import { users } from '@/constants/dummyData';

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests, setFriendRequests] = useState<string[]>([]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFriendRequest = (userId: string) => {
    setFriendRequests(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Find Friends</Text>

      <View style={styles.searchContainer}>
        <Search size={20} color={colors.neutral[500]} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userUsername}>@{item.username}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.addButton,
                friendRequests.includes(item.id) && styles.addButtonActive
              ]}
              onPress={() => toggleFriendRequest(item.id)}
            >
              {friendRequests.includes(item.id) ? (
                <Check size={20} color={colors.white} />
              ) : (
                <UserPlus size={20} color={colors.primary[500]} />
              )}
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.neutral[900],
    padding: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    margin: spacing.md,
    padding: spacing.sm,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
  },
  listContent: {
    padding: spacing.md,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  userName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
  },
  userUsername: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonActive: {
    backgroundColor: colors.primary[500],
  },
});