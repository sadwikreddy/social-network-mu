import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, ArrowLeft } from 'lucide-react-native';
import { users } from '@/constants/dummyData';
import { router, Stack } from 'expo-router';

export default function AllFriendsScreen() {
  const startChat = (userId: string) => {
    router.push(`/messages/${userId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
          ),
          title: 'My Friends',
          headerShadowVisible: false,
        }}
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.friendCard}
            onPress={() => startChat(item.id)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendUsername}>@{item.username}</Text>
            </View>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => startChat(item.id)}
            >
              <MessageSquare size={20} color={colors.primary[500]} />
            </TouchableOpacity>
          </TouchableOpacity>
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
  listContent: {
    padding: spacing.md,
  },
  friendCard: {
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
  friendInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  friendName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
  },
  friendUsername: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
});