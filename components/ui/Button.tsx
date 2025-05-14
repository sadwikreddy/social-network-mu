import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, fonts, spacing, radii } from '@/constants/theme';

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle => {
    let buttonStyle: ViewStyle = {
      borderRadius: radii.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.md,
    };

    // Set size
    switch (size) {
      case 'sm':
        buttonStyle.paddingVertical = spacing.xs;
        break;
      case 'lg':
        buttonStyle.paddingVertical = spacing.md;
        break;
      case 'md':
      default:
        buttonStyle.paddingVertical = spacing.sm;
    }

    // Set variant
    switch (variant) {
      case 'secondary':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = colors.primary[500];
        break;
      case 'tertiary':
        buttonStyle.backgroundColor = 'transparent';
        break;
      case 'primary':
      default:
        buttonStyle.backgroundColor = colors.primary[500];
    }

    // Set width
    if (fullWidth) {
      buttonStyle.width = '100%';
    }

    // Set disabled state
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }

    return buttonStyle;
  };

  const getTextStyles = (): TextStyle => {
    let textStyle: TextStyle = {
      fontFamily: fonts.medium,
      textAlign: 'center',
    };

    // Set size
    switch (size) {
      case 'sm':
        textStyle.fontSize = 14;
        break;
      case 'lg':
        textStyle.fontSize = 18;
        break;
      case 'md':
      default:
        textStyle.fontSize = 16;
    }

    // Set variant
    switch (variant) {
      case 'secondary':
      case 'tertiary':
        textStyle.color = colors.primary[500];
        break;
      case 'primary':
      default:
        textStyle.color = colors.white;
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary[500]}
          size="small"
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

// Needed to reference View component
import { View } from 'react-native';