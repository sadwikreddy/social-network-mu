import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { Camera, Image as ImageIcon, X, Users, Calendar, Clock, MapPin } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { currentUser } from '@/constants/dummyData';

export default function CreateScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...newImages]);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'post':
        return 'Create Post';
      case 'story':
        return 'Add Story';
      case 'group':
        return 'Create Group';
      case 'event':
        return 'Schedule Event';
      case 'chat':
        return 'Start Chat';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'post':
        return "What's on your mind?";
      case 'story':
        return 'Add a caption...';
      case 'group':
        return 'Group description...';
      case 'event':
        return 'Event description...';
      case 'chat':
        return 'Type a message...';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen 
        options={{
          title: getTitle(),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
          ),
        }} 
      />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.name}>{currentUser.name}</Text>
            {type === 'post' && (
              <TouchableOpacity style={styles.privacyButton}>
                <Users size={16} color={colors.primary[600]} />
                <Text style={styles.privacyText}>Friends</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {(type === 'group' || type === 'event') && (
          <TextInput
            style={styles.titleInput}
            placeholder={type === 'group' ? 'Group Name' : 'Event Title'}
            value={title}
            onChangeText={setTitle}
          />
        )}

        {type === 'event' && (
          <View style={styles.eventDetails}>
            <View style={styles.eventField}>
              <Calendar size={20} color={colors.neutral[600]} />
              <TextInput
                style={styles.eventInput}
                placeholder="Date"
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={styles.eventField}>
              <Clock size={20} color={colors.neutral[600]} />
              <TextInput
                style={styles.eventInput}
                placeholder="Time"
                value={time}
                onChangeText={setTime}
              />
            </View>
            <View style={styles.eventField}>
              <MapPin size={20} color={colors.neutral[600]} />
              <TextInput
                style={styles.eventInput}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder={getPlaceholder()}
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
        />

        {images.length > 0 && (
          <View style={styles.imageGrid}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setImages(images.filter((_, i) => i !== index))}
                >
                  <X size={16} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
          <ImageIcon size={24} color={colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaButton}>
          <Camera size={24} color={colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.submitButton, (!text && !images.length) && styles.submitButtonDisabled]}
          disabled={!text && !images.length}
        >
          <Text style={styles.submitButtonText}>
            {type === 'chat' ? 'Start Chat' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: spacing.sm,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 4,
  },
  privacyText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary[600],
    marginLeft: 4,
  },
  titleInput: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.neutral[900],
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  eventDetails: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  eventField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eventInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
    marginLeft: spacing.sm,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[900],
    padding: spacing.md,
    minHeight: 120,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    width: '33.33%',
    aspectRatio: 1,
    padding: spacing.xs,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md,
  },
  mediaButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
  submitButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.white,
  },
});