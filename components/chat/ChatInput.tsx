import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import { colors, fonts, spacing, radii } from '@/constants/theme';
import { PlusCircle, Send, Smile, Paperclip } from 'lucide-react-native';

type ChatInputProps = {
  onSend: (message: string) => void;
  onAttachment?: () => void;
};

export default function ChatInput({ onSend, onAttachment }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.attachButton} onPress={onAttachment}>
        <Paperclip size={22} color={colors.primary[500]} />
      </Pressable>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.neutral[500]}
          multiline
          maxHeight={100}
        />
        <Pressable style={styles.emojiButton}>
          <Smile size={22} color={colors.neutral[600]} />
        </Pressable>
      </View>
      
      <Pressable 
        style={[
          styles.sendButton, 
          !message.trim() && styles.sendButtonDisabled
        ]} 
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Send size={20} color={colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    marginHorizontal: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
    paddingVertical: spacing.sm,
    maxHeight: 100,
  },
  emojiButton: {
    padding: spacing.xs,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
});