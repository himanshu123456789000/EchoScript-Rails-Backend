// screens/LoginScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password!');
      return;
    }

    try {
      const response = await fetch('https://dummyapi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful', `Welcome ${data.user.name}!`);
        // Navigate to home/dashboard after successful login
      } else {
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('Network error or server is down');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to EchoScript</Text>
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Button mode="contained" onPress={onLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        Don’t have an account? Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  signupButton: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
});