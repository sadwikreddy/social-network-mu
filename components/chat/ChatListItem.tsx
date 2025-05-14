import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import Avatar from '@/components/ui/Avatar';
import { formatDistanceToNow } from 'date-fns';
import { Image } from 'lucide-react-native';
import { router } from 'expo-router';

type ChatListItemProps = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  time: string;
  unread: number;
  isOnline: boolean;
  hasMedia?: boolean;
  isGroup?: boolean;
};

export default function ChatListItem({
  id,
  name,
  message,
  avatar,
  time,
  unread,
  isOnline,
  hasMedia = false,
  isGroup = false,
}: ChatListItemProps) {
  const formattedTime = formatDistanceToNow(new Date(time), { addSuffix: true });
  
  const handlePress = () => {
    if (isGroup) {
      router.push(`/groups/${id}`);
    } else {
      router.push(`/messages/${id}`);
    }
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
      android_ripple={{ color: colors.neutral[200] }}
    >
      <Avatar 
        uri={avatar} 
        name={name} 
        size="md" 
        showStatus={!isGroup}
        isOnline={isOnline}
      />
      
      <View style={styles.content}>
        <View style={styles.firstRow}>
          <Text 
            style={[styles.name, unread > 0 && styles.unreadName]} 
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text style={[styles.time, unread > 0 && styles.unreadTime]}>
            {formattedTime}
          </Text>
        </View>
        
        <View style={styles.secondRow}>
          <View style={styles.messageContainer}>
            {hasMedia && (
              <Image 
                size={16} 
                color={unread > 0 ? colors.primary[500] : colors.neutral[500]} 
                style={styles.mediaIcon} 
              />
            )}
            <Text 
              style={[styles.message, unread > 0 && styles.unreadMessage]} 
              numberOfLines={1}
            >
              {message}
            </Text>
          </View>
          
          {unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {unread > 99 ? '99+' : unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
    flex: 1,
    marginRight: spacing.xs,
  },
  unreadName: {
    fontFamily: fonts.bold,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[500],
  },
  unreadTime: {
    color: colors.primary[500],
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
    flex: 1,
  },
  unreadMessage: {
    color: colors.neutral[800],
  },
  mediaIcon: {
    marginRight: spacing.xs,
  },
  unreadBadge: {
    backgroundColor: colors.primary[500],
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.white,
  },
});