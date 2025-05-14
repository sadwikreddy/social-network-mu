import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors, radii, fonts } from '@/constants/theme';
import StatusBadge from './StatusBadge';

type AvatarProps = {
  uri?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  isOnline?: boolean;
};

export default function Avatar({ 
  uri, 
  name = '', 
  size = 'md', 
  showStatus = false,
  isOnline = false
}: AvatarProps) {
  const getSize = () => {
    switch (size) {
      case 'xs':
        return 32;
      case 'sm':
        return 40;
      case 'md':
        return 48;
      case 'lg':
        return 64;
      case 'xl':
        return 80;
    }
  };

  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0) + 
      nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const borderRadius = getSize() / 2;
  const fontSize = getSize() * 0.38;

  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.avatar,
            { width: getSize(), height: getSize(), borderRadius }
          ]}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { 
              width: getSize(), 
              height: getSize(), 
              borderRadius,
              backgroundColor: colors.primary[500]
            }
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>
            {getInitials()}
          </Text>
        </View>
      )}
      
      {showStatus && (
        <StatusBadge 
          online={isOnline} 
          size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    backgroundColor: colors.neutral[200],
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.white,
    fontFamily: fonts.medium,
  },
});