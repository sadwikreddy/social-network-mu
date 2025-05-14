import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing, shadows } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { currentUser } from '@/constants/dummyData';
import Avatar from '@/components/ui/Avatar';
import { router } from 'expo-router';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon, 
  Heart,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react-native';

export default function ProfileScreen() {
  const menuItems = [
    {
      id: 'courses',
      icon: <BookOpen size={22} color={colors.primary[600]} />,
      title: 'My Courses',
      description: 'View enrolled courses',
      route: '/profile/courses'
    },
    {
      id: 'events',
      icon: <Calendar size={22} color={colors.accent[600]} />,
      title: 'My Events',
      description: 'Calendar and upcoming events',
      route: '/profile/events'
    },
    {
      id: 'saved',
      icon: <Heart size={22} color={colors.error[500]} />,
      title: 'Saved Messages',
      description: 'View your important messages',
      route: '/profile/saved'
    },
    {
      id: 'media',
      icon: <ImageIcon size={22} color={colors.success[500]} />,
      title: 'Shared Media',
      description: 'Photos, videos and documents',
      route: '/profile/media'
    },
    {
      id: 'settings',
      icon: <Settings size={22} color={colors.neutral[700]} />,
      title: 'Settings',
      description: 'Privacy and notifications',
      route: '/settings'
    },
    {
      id: 'logout',
      icon: <LogOut size={22} color={colors.error[700]} />,
      title: 'Log Out',
      description: 'Sign out from your account',
      danger: true,
      onPress: () => router.replace('/auth/login')
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.coverPhoto}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} 
              style={styles.coverPhotoImage}
            />
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => router.push('/settings')}
            >
              <Settings size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Avatar
              uri={currentUser.avatar}
              name={currentUser.name}
              size="xl"
              showStatus
              isOnline={currentUser.isOnline}
            />
            
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.username}>@{currentUser.username}</Text>
            
            <Text style={styles.bio}>{currentUser.bio}</Text>
            
            <View style={styles.statsRow}>
              <TouchableOpacity 
                style={styles.statItem}
                onPress={() => router.push('/friends/all')}
              >
                <Text style={styles.statNumber}>128</Text>
                <Text style={styles.statLabel}>Friends</Text>
              </TouchableOpacity>
              <View style={styles.statDivider} />
              <TouchableOpacity 
                style={styles.statItem}
                onPress={() => router.push('/groups')}
              >
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>Groups</Text>
              </TouchableOpacity>
              <View style={styles.statDivider} />
              <TouchableOpacity 
                style={styles.statItem}
                onPress={() => router.push('/profile/courses')}
              >
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/messages')}
          >
            <MessageSquare size={20} color={colors.primary[500]} />
            <Text style={styles.actionText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/profile/media')}
          >
            <ImageIcon size={20} color={colors.primary[500]} />
            <Text style={styles.actionText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/profile/saved')}
          >
            <Heart size={20} color={colors.primary[500]} />
            <Text style={styles.actionText}>Favorites</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => item.onPress ? item.onPress() : router.push(item.route)}
            >
              <View style={styles.menuItemContent}>
                <View 
                  style={[
                    styles.menuIconContainer,
                    item.danger && styles.menuIconContainerDanger
                  ]}
                >
                  {item.icon}
                </View>
                <View style={styles.menuTexts}>
                  <Text 
                    style={[
                      styles.menuTitle, 
                      item.danger && styles.menuTitleDanger
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.appVersion}>MU Connect v1.0.0</Text>
        </View>
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
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    paddingBottom: spacing.md,
  },
  coverPhoto: {
    height: 150,
    position: 'relative',
  },
  coverPhotoImage: {
    width: '100%',
    height: '100%',
  },
  settingsButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: -40,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.neutral[900],
    marginTop: spacing.sm,
  },
  username: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[500],
    marginBottom: spacing.sm,
  },
  bio: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[700],
    textAlign: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  statNumber: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.neutral[900],
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral[300],
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.neutral[700],
    marginTop: spacing.xs,
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuIconContainerDanger: {
    backgroundColor: colors.error[50],
  },
  menuTexts: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 2,
  },
  menuTitleDanger: {
    color: colors.error[700],
  },
  menuDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[500],
  },
  footer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  appVersion: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[500],
  },
});