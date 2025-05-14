import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react-native';
import { router, Stack } from 'expo-router';

const events = [
  {
    id: '1',
    name: 'New Year Celebration',
    date: '2025-01-01',
    time: '00:00',
    location: 'University Square',
    type: 'holiday',
  },
  {
    id: '2',
    name: 'Republic Day',
    date: '2025-01-26',
    time: '09:00',
    location: 'Main Campus',
    type: 'national',
  },
  {
    id: '3',
    name: 'Holi Festival',
    date: '2025-03-14',
    time: '10:00',
    location: 'University Park',
    type: 'festival',
  },
  {
    id: '4',
    name: 'Easter Sunday',
    date: '2025-04-20',
    time: '11:00',
    location: 'University Chapel',
    type: 'holiday',
  },
  {
    id: '5',
    name: 'Independence Day',
    date: '2025-08-15',
    time: '09:00',
    location: 'Main Campus',
    type: 'national',
  },
  {
    id: '6',
    name: 'Diwali Celebration',
    date: '2025-11-12',
    time: '18:00',
    location: 'Student Center',
    type: 'festival',
  },
  {
    id: '7',
    name: 'Christmas Eve',
    date: '2025-12-24',
    time: '18:00',
    location: 'University Hall',
    type: 'holiday',
  },
  {
    id: '8',
    name: 'New Year\'s Eve',
    date: '2025-12-31',
    time: '20:00',
    location: 'University Square',
    type: 'holiday',
  },
];

export default function EventsScreen() {
  const groupedEvents = events.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.neutral[900]} />
            </TouchableOpacity>
          ),
          title: '2025 Calendar',
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.content}>
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <View key={month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>{month}</Text>
            {monthEvents.map((event: any) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <View style={[styles.eventType, styles[event.type]]} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={styles.eventDetails}>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color={colors.neutral[600]} />
                      <Text style={styles.detailText}>{event.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Clock size={16} color={colors.neutral[600]} />
                      <Text style={styles.detailText}>{event.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MapPin size={16} color={colors.neutral[600]} />
                      <Text style={styles.detailText}>{event.location}</Text>
                    </View>
                  </View>
                </View>
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
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  monthSection: {
    marginBottom: spacing.xl,
  },
  monthTitle: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.neutral[900],
    marginBottom: spacing.md,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
  },
  eventType: {
    width: 4,
    backgroundColor: colors.primary[500],
  },
  holiday: {
    backgroundColor: colors.primary[500],
  },
  national: {
    backgroundColor: colors.error[500],
  },
  festival: {
    backgroundColor: colors.success[500],
  },
  eventContent: {
    flex: 1,
    padding: spacing.md,
  },
  eventName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: spacing.sm,
  },
  eventDetails: {
    gap: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
});