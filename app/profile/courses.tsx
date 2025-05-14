import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { router, Stack } from 'expo-router';

const courses = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Smith',
    schedule: 'Mon, Wed 10:00 AM',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    instructor: 'Dr. Johnson',
    schedule: 'Tue, Thu 2:00 PM',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  // Add more courses as needed
];

export default function CoursesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
          ),
          title: 'My Courses',
          headerShadowVisible: false,
        }}
      />

      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color={colors.primary[500]} />
        <Text style={styles.addButtonText}>Add New Course</Text>
      </TouchableOpacity>

      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard}>
            <Image source={{ uri: item.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseCode}>{item.code}</Text>
              <Text style={styles.courseName}>{item.name}</Text>
              <Text style={styles.courseInstructor}>{item.instructor}</Text>
              <Text style={styles.courseSchedule}>{item.schedule}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    backgroundColor: colors.primary[50],
    margin: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary[200],
  },
  addButtonText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.primary[500],
    marginLeft: spacing.sm,
  },
  listContent: {
    padding: spacing.md,
  },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  courseImage: {
    width: '100%',
    height: 120,
  },
  courseInfo: {
    padding: spacing.md,
  },
  courseCode: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[500],
    marginBottom: spacing.xs,
  },
  courseName: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  courseInstructor: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: spacing.xs,
  },
  courseSchedule: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.neutral[700],
  },
});