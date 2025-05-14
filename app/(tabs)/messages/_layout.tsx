import React from 'react';
import { Stack } from 'expo-router';

export default function MessagesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: 'white',
          },
        }} 
      />
    </Stack>
  );
}