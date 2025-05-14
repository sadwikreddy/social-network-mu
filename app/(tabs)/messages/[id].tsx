import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getChatMessages, chats, currentUser } from '@/constants/dummyData';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import Avatar from '@/components/ui/Avatar';
import { Phone, Video, ArrowLeft, MoreVertical } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState(getChatMessages(id || ''));
  const listRef = useRef<FlatList>(null);
  const router = useRouter();
  
  // Find the current chat
  const chat = chats.find(c => c.id === id);
  
  // Get the other participant
  const otherParticipant = chat?.participants.find(
    participant => participant.id !== currentUser.id
  );

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
  
  if (!chat || !otherParticipant) {
    return <Text>Chat not found</Text>;
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
                uri={otherParticipant.avatar} 
                name={otherParticipant.name} 
                size="sm"
                showStatus
                isOnline={otherParticipant.isOnline}
              />
              <View style={styles.headerTitleText}>
                <Text style={styles.headerName}>{otherParticipant.name}</Text>
                <Text style={styles.headerStatus}>
                  {otherParticipant.isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable style={styles.headerButton}>
                <Phone size={20} color={colors.neutral[800]} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Video size={20} color={colors.neutral[800]} />
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
              read={item.read}
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