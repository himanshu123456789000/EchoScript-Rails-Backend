import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/SignupScreenStyles';  // Import styles

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSignup = async () => {
    if (!email || !password || !name) {
      setErrorMessage('All fields are required!');
      return;
    }

    try {
      const response = await fetch('https://dummyapi.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Signup Successful', `Welcome, ${data.user.name}!`);
        navigation.navigate('Login'); // Navigate to login screen
      } else {
        setErrorMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('Network error or server is down');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up for EchoScript</Text>
      <TextInput
        label="Name"
        value={name}
        mode="outlined"
        onChangeText={setName}
        style={styles.input}
      />
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
      <Button mode="contained" onPress={onSignup} style={styles.button}>
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        Already have an account? Login
      </Button>
    </View>
  );
}
