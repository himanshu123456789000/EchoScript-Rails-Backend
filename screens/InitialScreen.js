import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon for microphone

export default function InitialScreen({ navigation }) { // Receive the navigation prop
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>EchoScript</Text>

      {/* Microphone Icon */}
      <Icon name="microphone" size={100} color="#4b0082" style={styles.icon} />

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome to EchoScript</Text>
      <Text style={styles.subText}>Real-time Transcribing</Text>

      {/* Start Transcribing Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')} // Navigate to Login on press
      >
        <Text style={styles.buttonText}>Start Transcribing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6a1b9a',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
