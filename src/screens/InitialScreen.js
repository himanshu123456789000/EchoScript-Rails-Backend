import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome'; // Microphone Icon

export default function InitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>EchoScript</Text>

      {/* Microphone Icon */}
      <Icon name="microphone" size={100} color="#4b0082" style={styles.icon} />

      <Text style={styles.welcomeText}>Welcome to EchoScript</Text>
      <Text style={styles.subText}>Real-time Transcribing</Text>

      {/* Start Transcribing Button */}
      <CustomButton title="Start Transcribing" onPress={() => navigation.navigate('Login')} />
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
});
