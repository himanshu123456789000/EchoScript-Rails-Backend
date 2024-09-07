import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
