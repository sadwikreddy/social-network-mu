import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors, fonts, spacing, radii, getInputStyles, getButtonStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff } from 'lucide-react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };
  
  const handleLogin = () => {
    if (validateForm()) {
      // In a real app, you would make an API call here
      router.replace('/(tabs)');
    }
  };
  
  const emailStyles = getInputStyles(!!emailError);
  const passwordStyles = getInputStyles(!!passwordError);
  const buttonStyles = getButtonStyles();
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.logo}
            />
            <Text style={styles.title}>MU Connect</Text>
            <Text style={styles.subtitle}>Connect with students and friends at MU</Text>
          </View>
          
          <View style={styles.form}>
            <View style={emailStyles.container}>
              <Text style={emailStyles.label}>Email</Text>
              <TextInput
                style={emailStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {emailError ? <Text style={emailStyles.errorText}>{emailError}</Text> : null}
            </View>
            
            <View style={passwordStyles.container}>
              <Text style={passwordStyles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[passwordStyles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.neutral[500]} />
                  ) : (
                    <Eye size={20} color={colors.neutral[500]} />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={passwordStyles.errorText}>{passwordError}</Text> : null}
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={buttonStyles.container}
              onPress={handleLogin}
            >
              <Text style={buttonStyles.text}>Log In</Text>
            </TouchableOpacity>
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <TouchableOpacity
              style={getButtonStyles('secondary').container}
              onPress={() => router.push('/auth/signup')}
            >
              <Text style={getButtonStyles('secondary').text}>Create New Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.primary[600],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[600],
    textAlign: 'center',
  },
  form: {
    marginBottom: spacing.xl,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.md,
    height: '100%',
    justifyContent: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[600],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  dividerText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.neutral[500],
    marginHorizontal: spacing.sm,
  },
});