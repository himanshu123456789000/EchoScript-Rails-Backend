import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField({ label, value, onChangeText, keyboardType, secureTextEntry }) {
  return (
    <TextInput
      label={label}
      value={value}
      mode="outlined"
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});
