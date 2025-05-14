import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  Lock, 
  UserPlus, 
  Globe, 
  MessageSquare, 
  Image, 
  CircleHelp as HelpCircle, 
  LogOut,
  Camera,
  Share2,
  FileText,
  Mic,
  MapPin,
  BellRing,
  Shield,
  Users
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [permissions, setPermissions] = React.useState({
    camera: true,
    photos: true,
    location: true,
    contacts: true,
    microphone: true,
    notifications: true,
    friendRequests: true,
    profileVisibility: 'public',
    tagging: true,
    sharing: true,
  });

  const togglePermission = (key: string) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sections = [
    {
      title: 'Profile & Privacy',
      items: [
        {
          icon: <Shield size={24} color={colors.primary[600]} />,
          title: 'Profile Visibility',
          description: 'Control who can see your profile',
          type: 'link',
        },
        {
          icon: <Users size={24} color={colors.success[500]} />,
          title: 'Friend Requests',
          description: 'Allow people to send you friend requests',
          type: 'switch',
          value: permissions.friendRequests,
          onValueChange: () => togglePermission('friendRequests'),
        },
        {
          icon: <Share2 size={24} color={colors.accent[600]} />,
          title: 'Post Sharing',
          description: 'Allow others to share your posts',
          type: 'switch',
          value: permissions.sharing,
          onValueChange: () => togglePermission('sharing'),
        },
      ],
    },
    {
      title: 'App Permissions',
      items: [
        {
          icon: <Camera size={24} color={colors.primary[500]} />,
          title: 'Camera Access',
          description: 'Allow camera access for photos and videos',
          type: 'switch',
          value: permissions.camera,
          onValueChange: () => togglePermission('camera'),
        },
        {
          icon: <Image size={24} color={colors.success[500]} />,
          title: 'Photo Library',
          description: 'Access to your photos and videos',
          type: 'switch',
          value: permissions.photos,
          onValueChange: () => togglePermission('photos'),
        },
        {
          icon: <Mic size={24} color={colors.warning[500]} />,
          title: 'Microphone',
          description: 'For voice messages and calls',
          type: 'switch',
          value: permissions.microphone,
          onValueChange: () => togglePermission('microphone'),
        },
        {
          icon: <MapPin size={24} color={colors.error[500]} />,
          title: 'Location',
          description: 'Share location in messages and posts',
          type: 'switch',
          value: permissions.location,
          onValueChange: () => togglePermission('location'),
        },
        {
          icon: <UserPlus size={24} color={colors.accent[500]} />,
          title: 'Contacts',
          description: 'Find friends from your contacts',
          type: 'switch',
          value: permissions.contacts,
          onValueChange: () => togglePermission('contacts'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <BellRing size={24} color={colors.primary[500]} />,
          title: 'Push Notifications',
          description: 'Messages, likes, and comments',
          type: 'switch',
          value: permissions.notifications,
          onValueChange: () => togglePermission('notifications'),
        },
        {
          icon: <Bell size={24} color={colors.warning[500]} />,
          title: 'Notification Settings',
          description: 'Customize notification preferences',
          type: 'link',
        },
      ],
    },
    {
      title: 'Content & Display',
      items: [
        {
          icon: <FileText size={24} color={colors.primary[500]} />,
          title: 'Content Preferences',
          description: 'Manage feed and content settings',
          type: 'link',
        },
        {
          icon: <Globe size={24} color={colors.accent[600]} />,
          title: 'Language',
          description: 'Choose your preferred language',
          type: 'link',
        },
      ],
    },
    {
      title: 'Support & About',
      items: [
        {
          icon: <HelpCircle size={24} color={colors.neutral[600]} />,
          title: 'Help Center',
          description: 'Get help and contact support',
          type: 'link',
        },
        {
          icon: <LogOut size={24} color={colors.error[500]} />,
          title: 'Log Out',
          description: 'Sign out of your account',
          type: 'button',
          danger: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Settings</Text>
      
      <ScrollView style={styles.content}>
        {sections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.title}
                style={[
                  styles.item,
                  itemIndex === section.items.length - 1 && styles.lastItem,
                  item.danger && styles.dangerItem,
                ]}
              >
                <View style={styles.itemContent}>
                  <View style={[
                    styles.iconContainer,
                    item.danger && styles.dangerIconContainer
                  ]}>
                    {item.icon}
                  </View>
                  <View style={styles.textContainer}>
                    <Text 
                      style={[
                        styles.itemTitle,
                        item.danger && styles.dangerText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                  </View>
                </View>
                
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: colors.neutral[300], true: colors.primary[500] }}
                    thumbColor={Platform.OS === 'ios' ? undefined : colors.white}
                    ios_backgroundColor={colors.neutral[300]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.neutral[900],
    padding: spacing.md,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.neutral[600],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  dangerItem: {
    backgroundColor: colors.error[50],
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  dangerIconContainer: {
    backgroundColor: colors.error[100],
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 2,
  },
  dangerText: {
    color: colors.error[700],
  },
  itemDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
});