import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { API_URL } from '@env';  // Import the API URL from your .env
import styles from '../styles/ForgotPasswordScreenStyles';  // Import styles

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSendResetEmail = async () => {
    if (!email) {
      setErrorMessage('Please enter your email!');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
          },
        }),
      });

      if (response.ok) {
        setSuccessMessage('Password reset email sent! Please check your inbox.');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to send reset email.');
      }
    } catch (error) {
      setErrorMessage('Network error or server is down.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        Enter your email address below and we will send you instructions to reset your password.
      </Text>
      
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

      <Button mode="contained" onPress={onSendResetEmail} style={styles.button}>
        Send Reset Email
      </Button>
    </View>
  );
}
