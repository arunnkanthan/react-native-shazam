# react-native-shazam
Building a shazam prototype as my first react native app

## run app
`npm start`

## Tutorial
Setting up dev environment: https://www.youtube.com/watch?v=0-S5a0eXPoc
- android studio: https://docs.expo.dev/workflow/android-studio-emulator/

## Notes/Thoughts
- React Native CLI vs Expo CLI
- android or apple emulator need to be up and running before i run the app/expo
- in mac (cmd - d) reload the device expo emulator if changes havent reloaded from the code editor
- rewatch: Debugging in VSCode, Publishing
    Publishing through expo is a great way to test the app in the field without pushing to the App/Play store
- installed 'expo-av' to acess device microphone and record
    - ill need to access device microphone either during sign up process or when the app is downloaded, or at another point in the user flow
- react native libraries vs expo libraries

## ToDo / Next Steps
- currently  recording the audio is saved but now i need to 'stream/send' it to the backend: create a backend service with socket.io or another way to send audio and save that audio in a backend server
