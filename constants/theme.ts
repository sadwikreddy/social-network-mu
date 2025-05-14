import { Platform } from 'react-native';

export type ColorTheme = {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: {
    50: string;
    100: string;
    500: string;
    700: string;
  };
  warning: {
    50: string;
    100: string;
    500: string;
    700: string;
  };
  error: {
    50: string;
    100: string;
    500: string;
    700: string;
  };
  black: string;
  white: string;
  transparent: string;
};

export type FontTheme = {
  regular: string;
  medium: string;
  bold: string;
};

export type SpacingTheme = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type RadiiTheme = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
};

export type ShadowTheme = {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};

export const colors: ColorTheme = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#1E88E5',
    600: '#1976D2',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0A2351',
  },
  accent: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7C4DFF',
    800: '#6A1B9A',
    900: '#4A148C',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    500: '#4CAF50',
    700: '#388E3C',
  },
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    500: '#FFC107',
    700: '#FFA000',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    500: '#F44336',
    700: '#D32F2F',
  },
  black: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
};

export const fonts: FontTheme = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};

export const spacing: SpacingTheme = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radii: RadiiTheme = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows: ShadowTheme = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const getInputStyles = (isError?: boolean) => {
  return {
    container: {
      marginBottom: spacing.md,
    },
    label: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.neutral[800],
      marginBottom: spacing.xs,
    },
    input: {
      fontFamily: fonts.regular,
      fontSize: 16,
      borderWidth: 1,
      borderColor: isError ? colors.error[500] : colors.neutral[300],
      borderRadius: radii.sm,
      padding: spacing.sm,
      paddingHorizontal: spacing.md,
      color: colors.neutral[900],
      backgroundColor: colors.white,
      ...(Platform.OS === 'web' ? { outlineStyle: 'none' as const } : {}),
    },
    errorText: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.error[500],
      marginTop: spacing.xs,
    },
  };
};

export const getButtonStyles = (variant: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
  const baseStyles = {
    container: {
      borderRadius: radii.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    },
    text: {
      fontFamily: fonts.medium,
      fontSize: 16,
    },
  };

  if (variant === 'primary') {
    return {
      container: {
        ...baseStyles.container,
        backgroundColor: colors.primary[500],
      },
      text: {
        ...baseStyles.text,
        color: colors.white,
      },
    };
  } else if (variant === 'secondary') {
    return {
      container: {
        ...baseStyles.container,
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.primary[500],
      },
      text: {
        ...baseStyles.text,
        color: colors.primary[500],
      },
    };
  } else {
    return {
      container: {
        ...baseStyles.container,
        backgroundColor: colors.transparent,
      },
      text: {
        ...baseStyles.text,
        color: colors.primary[500],
      },
    };
  }
};