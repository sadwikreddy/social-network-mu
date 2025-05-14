import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, FileText, Users, Calendar, MessageSquare } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CreateScreen() {
  const options = [
    {
      id: 'post',
      icon: <Image size={24} color={colors.primary[600]} />,
      title: 'Create Post',
      description: 'Share photos, videos, or thoughts',
    },
    {
      id: 'story',
      icon: <FileText size={24} color={colors.accent[600]} />,
      title: 'Add Story',
      description: '24-hour visible updates',
    },
    {
      id: 'group',
      icon: <Users size={24} color={colors.success[500]} />,
      title: 'Create Group',
      description: 'Start a new community',
    },
    {
      id: 'event',
      icon: <Calendar size={24} color={colors.warning[500]} />,
      title: 'Schedule Event',
      description: 'Plan and organize meetups',
    },
    {
      id: 'chat',
      icon: <MessageSquare size={24} color={colors.error[500]} />,
      title: 'Start Chat',
      description: 'Begin a new conversation',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Create</Text>
      <ScrollView style={styles.content}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => router.push(`/create/${option.id}`)}
          >
            <View style={styles.iconContainer}>{option.icon}</View>
            <View style={styles.textContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  content: {
    flex: 1,
    padding: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
});