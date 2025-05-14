import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Camera } from 'lucide-react-native';
import { users, currentUser } from '@/constants/dummyData';

export default function StoriesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Stories</Text>
      
      <ScrollView style={styles.content}>
        <View style={styles.storiesContainer}>
          <TouchableOpacity style={styles.addStoryCard}>
            <View style={styles.addStoryImageContainer}>
              <Image source={{ uri: currentUser.avatar }} style={styles.addStoryImage} />
              <View style={styles.addButton}>
                <Plus size={20} color={colors.white} />
              </View>
            </View>
            <Text style={styles.addStoryText}>Add Story</Text>
          </TouchableOpacity>

          {users.map((user) => (
            <TouchableOpacity key={user.id} style={styles.storyCard}>
              <View style={styles.storyImageContainer}>
                <Image source={{ uri: user.avatar }} style={styles.storyImage} />
                {user.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <Text style={styles.storyName} numberOfLines={1}>
                {user.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cameraSection}>
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={24} color={colors.white} />
            <Text style={styles.cameraText}>Create Story</Text>
          </TouchableOpacity>
        </View>
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
  },
  storiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
  },
  addStoryCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addStoryImageContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  addStoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.neutral[300],
  },
  addButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary[500],
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  addStoryText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.neutral[900],
  },
  storyCard: {
    width: '25%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  storyImageContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary[500],
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.white,
  },
  storyName: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.neutral[900],
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: spacing.xs,
  },
  cameraSection: {
    padding: spacing.md,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[500],
    padding: spacing.md,
    borderRadius: 12,
  },
  cameraText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.white,
    marginLeft: spacing.sm,
  },
});