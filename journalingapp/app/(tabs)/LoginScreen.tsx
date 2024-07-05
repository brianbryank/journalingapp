// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Navigate to the HomeScreen or any other screen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to log in');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.welcomeTitle}>
        Welcome back!
      </ThemedText>
      <ThemedText type="title" style={styles.loginTitle}>
        Login
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeTitle: {
    marginBottom: 8, // Reduced space for the welcome message
    textAlign: 'center', // Center align the title
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B9CD3', // Color for the welcome text
  },
  loginTitle: {
    marginBottom: 24, // Space between the login title and the inputs
    textAlign: 'center', // Center align the title
    fontSize: 20,
    color: 'blue', // Set the color to blue
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
});
