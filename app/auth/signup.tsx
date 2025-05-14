import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors, fonts, spacing, radii, getInputStyles, getButtonStyles } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Name validation
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Username validation
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      isValid = false;
    } else {
      setUsernameError('');
    }
    
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
    
    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    
    return isValid;
  };
  
  const handleSignup = () => {
    if (validateForm()) {
      // In a real app, you would make an API call here
      router.replace('/(tabs)');
    }
  };
  
  const nameStyles = getInputStyles(!!nameError);
  const usernameStyles = getInputStyles(!!usernameError);
  const emailStyles = getInputStyles(!!emailError);
  const passwordStyles = getInputStyles(!!passwordError);
  const confirmPasswordStyles = getInputStyles(!!confirmPasswordError);
  const buttonStyles = getButtonStyles();
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join the MU community today</Text>
          </View>
          
          <View style={styles.form}>
            <View style={nameStyles.container}>
              <Text style={nameStyles.label}>Full Name</Text>
              <TextInput
                style={nameStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
              />
              {nameError ? <Text style={nameStyles.errorText}>{nameError}</Text> : null}
            </View>

            <View style={usernameStyles.container}>
              <Text style={usernameStyles.label}>Username</Text>
              <TextInput
                style={usernameStyles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Choose a unique username"
                autoCapitalize="none"
              />
              {usernameError ? <Text style={usernameStyles.errorText}>{usernameError}</Text> : null}
            </View>
            
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
                  placeholder="Create a password"
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
            
            <View style={confirmPasswordStyles.container}>
              <Text style={confirmPasswordStyles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[confirmPasswordStyles.input, styles.passwordInput]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color={colors.neutral[500]} />
                  ) : (
                    <Eye size={20} color={colors.neutral[500]} />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? <Text style={confirmPasswordStyles.errorText}>{confirmPasswordError}</Text> : null}
            </View>
            
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By signing up, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
            
            <TouchableOpacity
              style={[buttonStyles.container, styles.signupButton]}
              onPress={handleSignup}
            >
              <Text style={buttonStyles.text}>Sign Up</Text>
            </TouchableOpacity>
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
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
  backButton: {
    padding: spacing.xs,
    marginBottom: spacing.md,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.neutral[600],
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
  termsContainer: {
    marginVertical: spacing.md,
  },
  termsText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: fonts.medium,
    color: colors.primary[600],
  },
  signupButton: {
    marginVertical: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.neutral[600],
  },
  loginLink: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary[600],
  },
});