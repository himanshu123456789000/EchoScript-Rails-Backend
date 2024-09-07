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
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  signupButton: {
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#4b0082', // You can change this color based on your theme
    textDecorationLine: 'underline',
  },
});

export default styles;
