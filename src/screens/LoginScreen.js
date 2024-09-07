import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google'; // Import Google Auth
import * as AppleAuthentication from 'expo-apple-authentication'; // Import Apple Auth
import firebase from 'firebase/app';
import 'firebase/auth';  // Import Firebase authentication
import { API_URL } from '@env';  // Import the API URL
import styles from '../styles/LoginScreenStyles';  // Import styles
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: 'YOUR_GOOGLE_EXPO_CLIENT_ID',
  //   androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
  //   iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
  //   webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
  // });

  const onLogin = async () => {
  //   if (!email || !password) {
  //     setErrorMessage('Please enter both email and password!');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/users/sign_in`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           email: email,
  //           password: password,
  //         }
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Store the token in AsyncStorage
  //       await AsyncStorage.setItem('token', data.token);
  //       Alert.alert('Login Successful', `Welcome ${data.user.email}!`);
  //       // Navigate to home/dashboard after successful login
        navigation.navigate('Dashboard');
  //     } else {
  //       setErrorMessage(data.error || 'Login failed');
  //     }
  //   } catch (error) {
  //     setErrorMessage('Network error or server is down');
  //   }
    
  };

  const handleGoogleSignIn = async () => {
    const result = await promptAsync();
    if (result.type === 'success') {
      const { id_token } = result.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      try {
        const userCredential = await firebase.auth().signInWithCredential(credential);
        Alert.alert('Login Successful', `Welcome ${userCredential.user.email}!`);
        navigation.navigate('Dashboard');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to EchoScript</Text>
      <TextInput
        label="Email or Mobile No."
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      {/* <TextInput
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      /> */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Button mode="contained" onPress={onLogin} style={styles.button}>
        Sign in
      </Button>

      <Button
        mode="contained"
        // onPress={handleGoogleSignIn}
        // disabled={!request}
        style={styles.button}
        icon={() => (
          <Icon
            name="google"  // Google icon from MaterialCommunityIcons
            size={20}
            color="white"  // Color of the icon
          />
        )}
      >
        Sign in with Google
      </Button>


      {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      <Button onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        Don’t have an account? Sign Up
      </Button>
    </View>
  );
}
