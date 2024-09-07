# EchoScript App

EchoScript is a React Native application that provides real-time transcription. The app includes the following features:
- **Login and Signup Pages**
- **Initial Transcription Page**: Users can start transcribing right from the welcome page.

## Installation Guide

### Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: You need to have Node.js installed on your system. You can download it from the [Node.js website](https://nodejs.org/).
- **Expo CLI**: Install Expo CLI globally on your machine to run the app with Expo.
  ```bash
  npm install -g expo-cli
  ```
- **Git**: Ensure Git is installed so you can clone the repository from GitHub.

### Step 1: Clone the Repository

Run the following command to clone the EchoScript repository:

```bash
git clone https://github.com/your-username/EchoScript-App.git
```

### Step 2: Install Project Dependencies

Navigate into the project folder and install all necessary dependencies:

```bash
cd EchoScript-App
npm install
```

### Step 3: Run the Application

After installation is complete, you can start the app by running:

```bash
npx expo start
```

This will open Expo Developer Tools in your browser. You can either scan the QR code with the Expo Go app on your phone or press `a` to run it on an Android emulator, or `i` to run it on an iOS simulator (if you are on macOS).

### Running on an Emulator

To run the app on an Android or iOS emulator:
- **Android**: Ensure you have Android Studio set up and press `a` in the terminal after running `npx expo start`.
- **iOS**: If you are using macOS, ensure Xcode is installed. Then press `i` in the terminal after running `npx expo start`.

## Features

- **Initial Screen**: Features a welcome screen with a "Start Transcribing" button.
- **Login and Signup Screens**: Standard screens with input fields for email, password, and name.
- **Navigation**: Built with React Navigation to switch between the initial, login, and signup screens.


## Contributing

If you'd like to contribute to this project, feel free to submit an issue or open a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
