import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Image as ImageIcon, FileText } from 'lucide-react-native';
import { router, Stack } from 'expo-router';

const sharedMedia = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-01-15',
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-01-14',
  },
  {
    id: '3',
    type: 'document',
    name: 'Project_Presentation.pdf',
    size: '2.4 MB',
    date: '2025-01-13',
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '2025-01-12',
  },
];

export default function MediaScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
          ),
          title: 'Shared Media',
          headerShadowVisible: false,
        }}
      />

      <FlatList
        data={sharedMedia}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.mediaItem}>
            {item.type === 'image' ? (
              <Image source={{ uri: item.url }} style={styles.image} />
            ) : (
              <View style={styles.documentContainer}>
                <FileText size={32} color={colors.primary[500]} />
                <Text style={styles.documentName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.documentSize}>{item.size}</Text>
              </View>
            )}
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.mediaList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mediaList: {
    padding: spacing.md,
  },
  mediaItem: {
    flex: 1,
    margin: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.neutral[100],
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  documentContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  documentName: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.neutral[900],
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  documentSize: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[600],
    marginTop: spacing.xs,
  },
  date: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.neutral[600],
    padding: spacing.xs,
    backgroundColor: colors.white,
  },
});