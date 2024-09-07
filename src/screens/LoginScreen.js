import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';  // Import the API URL
import styles from '../styles/LoginScreenStyles';  // Import styles

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
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login Successful', `Welcome ${data.user.email}!`);
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

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <Button onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        Don’t have an account? Sign Up
      </Button>
    </View>
  );
}
