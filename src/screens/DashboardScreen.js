import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import { Audio, Video } from 'expo-av';


const Tab = createMaterialTopTabNavigator();

// StartRecordingScreen with integrated recording functionality
function StartRecordingScreen() {
  const [recording, setRecording] = useState(null);
  const [isPaused, setIsPaused] = useState(false); 
  const [message, setMessage] = useState('Press the button to start recording');
  const [recordingDuration, setRecordingDuration] = useState(0); 
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
        setRecordingDuration(0); 
        const interval = setInterval(() => {
          setRecordingDuration((prev) => prev + 1); 
        }, 1000);
        setTimerInterval(interval); 
      } else {
        setMessage('Permission to record audio denied.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // Handle pausing the recording
  async function pauseRecording() {
    if (recording) {
      await recording.pauseAsync();
      setMessage('Recording paused.');
      setIsPaused(true);
      clearInterval(timerInterval); 
    }
  }

  // Handle resuming the recording
  async function resumeRecording() {
    if (recording) {
      await recording.startAsync(); 
      setMessage('Recording resumed.');
      setIsPaused(false);
      const interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1); 
      }, 1000);
      setTimerInterval(interval);
    }
  }

  // Handle stopping the recording
  async function stopRecording() {
    setMessage('Recording stopped.');
    clearInterval(timerInterval); 
    setTimerInterval(null); 
    setRecordingDuration(0); 
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording saved to:', uri);
    setRecording(null); 
    setIsPaused(false); 
  }

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

      {!recording ? (
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonRow}>
          {isPaused ? (
            <TouchableOpacity style={styles.button} onPress={resumeRecording}>
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={pauseRecording}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          )}
          <View style={styles.space} />
          <TouchableOpacity style={styles.button} onPress={stopRecording}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.timer}>{recording ? formatTime(recordingDuration) : '00:00:00'}</Text>
      <Text>{message}</Text>
    </View>
  );
}

function TranscribeRecordingScreen() {
  const [file, setFile] = useState(null); // State to store selected file
  const [sound, setSound] = useState(null); // State for playing sound
  const [isAudio, setIsAudio] = useState(false); // To check if file is audio

  // Function to handle file selection
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'], // Accept both audio and video files
      });
      // debugger;
      if (result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Get the first asset in the array
        setFile(selectedFile);
  
        // Check if it's an audio file based on the MIME type
        const isAudioFile = selectedFile.mimeType.startsWith('audio');
        setIsAudio(isAudioFile);
  
        console.log('Selected file:', selectedFile);
      } else {
        console.log('File selection was canceled or failed.');
      }
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };

  // Function to play the selected audio or video file
  const playMedia = async () => {
    if (file) {
      try {
        if (isAudio) {
          const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: file.uri },
            { shouldPlay: true }
          );
          setSound(playbackObject);
          // debugger
          await playbackObject.playAsync(); // Start audio playback
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  // Function to stop audio playback
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="file-audio-o" size={100} color="#4b0082" />
      <Text style={styles.title}>Upload and Play Media</Text>

      {/* Button to select an audio/video file */}
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Pick Audio/Video File</Text>
      </TouchableOpacity>

      {/* Display file name if selected */}
      {file && (
        <View style={styles.fileInfo}>
          <Text>Selected file: {file.name}</Text>
        </View>
      )}

      {/* Show media player controls and Upload button if file is selected */}
      {file && (
        <>
          {isAudio ? (
            // If the file is audio, show play/stop buttons for audio playback
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={playMedia}>
                <Text style={styles.buttonText}>Play Audio</Text>
              </TouchableOpacity>
              <View style={styles.space} />
              <TouchableOpacity style={styles.button} onPress={stopAudio}>
                <Text style={styles.buttonText}>Stop Audio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // If the file is video, display the video player
            <Video
              source={{ uri: file.uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              style={{ width: 300, height: 300, marginTop: 20 }}
            />
          )}

          {/* Upload Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Upload File</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default function DashboardScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
        tabBarActiveTintColor: '#4b0082', // Purple color for active tab
        tabBarInactiveTintColor: '#888',  // Gray for inactive tabs
        tabBarIndicatorStyle: { backgroundColor: '#4b0082', height: 4 }, // Purple indicator
      }}
    >
      <Tab.Screen
        name="StartRecording"
        component={StartRecordingScreen}
        options={{ tabBarLabel: 'Start Recording' }} // Adding space between words
      />
      <Tab.Screen
        name="TranscribeRecording"
        component={TranscribeRecordingScreen}
        options={{ tabBarLabel: 'Transcribe Recording' }} // Adding space between words
      />
    </Tab.Navigator>
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  space: {
    width: 20, // Space between the buttons
  },
  button: {
    backgroundColor: '#4b0082', // Purple background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileInfo: {
    marginTop: 10,
    marginBottom: 20,
  },
});
