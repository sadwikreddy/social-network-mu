import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors, fonts, spacing, radii } from '@/constants/theme';
import { Check, FileText } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

type ChatBubbleProps = {
  message: string;
  time: string;
  isCurrentUser: boolean;
  read: boolean;
  media?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
    size?: string;
  };
};

export default function ChatBubble({
  message,
  time,
  isCurrentUser,
  read,
  media,
}: ChatBubbleProps) {
  const formattedTime = formatDistanceToNow(new Date(time), { addSuffix: true });

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
        ]}
      >
        {media && media.type === 'image' && (
          <Image source={{ uri: media.url }} style={styles.mediaImage} />
        )}
        
        {media && media.type === 'document' && (
          <Pressable style={styles.documentContainer}>
            <View style={styles.documentIconContainer}>
              <FileText size={24} color={colors.primary[500]} />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentName} numberOfLines={1}>
                {media.name}
              </Text>
              <Text style={styles.documentSize}>{media.size}</Text>
            </View>
          </Pressable>
        )}

        {message && <Text style={styles.messageText}>{message}</Text>}
        
        <View style={styles.messageFooter}>
          <Text style={styles.timeText}>{formattedTime}</Text>
          {isCurrentUser && (
            <View style={styles.readStatus}>
              <Check 
                size={14} 
                color={read ? colors.primary[500] : colors.neutral[400]} 
              />
              <Check 
                size={14} 
                color={read ? colors.primary[500] : colors.neutral[400]} 
                style={styles.secondCheck} 
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
    marginRight: spacing.md,
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
    marginLeft: spacing.md,
  },
  bubble: {
    padding: spacing.sm,
    borderRadius: radii.md,
  },
  currentUserBubble: {
    backgroundColor: colors.primary[100],
  },
  otherUserBubble: {
    backgroundColor: colors.neutral[100],
  },
  messageText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.xs / 2,
  },
  timeText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.neutral[500],
    marginRight: spacing.xs,
  },
  readStatus: {
    flexDirection: 'row',
  },
  secondCheck: {
    marginLeft: -8,
  },
  mediaImage: {
    width: '100%',
    height: 200,
    borderRadius: radii.sm,
    marginBottom: spacing.xs,
  },
  documentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.xs,
    borderRadius: radii.sm,
    marginBottom: spacing.xs,
  },
  documentIconContainer: {
    padding: spacing.xs,
    backgroundColor: colors.primary[50],
    borderRadius: radii.xs,
    marginRight: spacing.xs,
  },
  documentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  documentName: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[900],
  },
  documentSize: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 2,
  },
});