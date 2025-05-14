import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getGroupMessages, groups, currentUser } from '@/constants/dummyData';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import Avatar from '@/components/ui/Avatar';
import { Info, ArrowLeft, MoreVertical, Users } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState(getGroupMessages(id || ''));
  const listRef = useRef<FlatList>(null);
  const router = useRouter();
  
  // Find the current group
  const group = groups.find(g => g.id === id);
  
  const handleSend = (text: string) => {
    const newMessage = {
      id: `new-msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    setMessages([newMessage, ...messages]);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [messages]);
  
  if (!group) {
    return <Text>Group not found</Text>;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable style={styles.headerButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.neutral[800]} />
            </Pressable>
          ),
          headerTitle: () => (
            <Pressable 
              style={styles.headerTitleContainer}
              onPress={() => {}}
            >
              <Avatar 
                uri={group.avatar} 
                name={group.name} 
                size="sm"
              />
              <View style={styles.headerTitleText}>
                <Text style={styles.headerName}>{group.name}</Text>
                <Text style={styles.headerStatus}>
                  {group.members.length} members
                </Text>
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable style={styles.headerButton}>
                <Users size={20} color={colors.neutral[800]} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Info size={20} color={colors.neutral[800]} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <MoreVertical size={20} color={colors.neutral[800]} />
              </Pressable>
            </View>
          ),
        }}
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item.text}
              time={item.createdAt}
              isCurrentUser={item.senderId === currentUser.id}
              read={true} // Group messages don't have individual read status
              media={item.media}
            />
          )}
          inverted
          contentContainerStyle={styles.messagesList}
        />
        
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoid: {
    flex: 1,
  },
  headerButton: {
    padding: spacing.xs,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    marginLeft: spacing.xs,
  },
  headerName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
  },
  headerStatus: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[500],
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  messagesList: {
    flexGrow: 1,
    paddingVertical: spacing.md,
  },
});