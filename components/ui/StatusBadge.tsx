import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

type StatusBadgeProps = {
  online: boolean;
  size?: 'sm' | 'md' | 'lg';
  offsetPosition?: boolean;
};

export default function StatusBadge({ 
  online, 
  size = 'md',
  offsetPosition = true
}: StatusBadgeProps) {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 8;
      case 'lg':
        return 12;
      case 'md':
      default:
        return 10;
    }
  };

  return (
    <View 
      style={[
        styles.badge, 
        { 
          width: getSize(), 
          height: getSize(),
          backgroundColor: online ? colors.success[500] : colors.neutral[400],
          borderWidth: getSize() / 4,
        },
        offsetPosition && styles.positioned
      ]}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    borderColor: colors.white,
  },
  positioned: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});