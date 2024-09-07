import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/InitialScreenStyles';

export default function InitialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>EchoScript</Text>
      <Icon name="microphone" size={100} color="#4b0082" style={styles.icon} />
      <Text style={styles.welcomeText}>Welcome to EchoScript</Text>
      <Text style={styles.subText}>Real-time Transcribing</Text>
      <CustomButton title="Start Transcribing" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
