import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';

export default function StartRecordingScreen() {
  const [recording, setRecording] = useState(null);
  const [message, setMessage] = useState('Press the button to start recording');
  const [recordingDuration, setRecordingDuration] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null);

  // Convert seconds to hh:mm:ss format
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle starting the recording
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.granted) {
        setMessage('Recording...');
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        setRecordingDuration(0); // Reset the timer
        const interval = setInterval(() => {
          setRecordingDuration((prev) => prev + 1); // Increment the timer
        }, 1000); // Update every second
        setTimerInterval(interval); // Save the interval to clear later
      } else {
        setMessage('Permission to record audio denied.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // Handle stopping the recording
  async function stopRecording() {
    setMessage('Recording stopped.');
    clearInterval(timerInterval); // Clear the interval
    setTimerInterval(null); // Reset the interval
    setRecordingDuration(0); // Reset the timer display
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording saved to:', uri);
    setRecording(null); // Reset recording state
  }

  // Automatically stop the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <View style={styles.container}>
      <Icon name="microphone" size={100} color="#4b0082" />
      <Text style={styles.title}>Start Recording</Text>
      
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      
      <Text style={styles.timer}>{recording ? formatTime(recordingDuration) : '00:00:00'}</Text>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    marginVertical: 20,
    color: '#4b0082',
  },
});
