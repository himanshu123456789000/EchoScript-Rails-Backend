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
  googleButton: {
    flexDirection: 'row',  // Align icon and text horizontally
    alignItems: 'center',  // Center vertically
    backgroundColor: 'white',  // Google button is typically white
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,  // Rounded corners
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',  // Slight shadow for better appearance
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,  // Shadow for Android
    width: '80%',  // Adjust width as needed
    justifyContent: 'center',  // Center text and icon
  },
  googleIcon: {
    marginRight: 10,  // Space between icon and text
  },
  googleButtonText: {
    color: '#4285F4',  // Text color similar to Google blue
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
