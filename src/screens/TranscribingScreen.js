// TranscribingScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TranscribingScreen() {
  const [transcription, setTranscription] = useState('No transcription yet.');

  function transcribeRecording() {
    // Simulate transcription - replace this with actual API integration
    setTranscription('This is the transcribed text of the recording.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcribe Recording</Text>
      <Button title="Transcribe" onPress={transcribeRecording} />
      <Text>{transcription}</Text>
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
});
