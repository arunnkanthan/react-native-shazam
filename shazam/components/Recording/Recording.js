import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { Audio } from 'expo-av';

const getPermission = async (setHasPermission) => {
    const { status } = await Audio.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

function Recording () {
    const [buttonTitle, setButtonTitle] = useState("Start Recording");
    const [recording, setRecording] = useState(null)
    const [hasPermission, setHasPermission] = useState(false)

    useEffect(() => {
        getPermission(setHasPermission);
    }, []);

    const setAudioMode = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true, // Allow recording on iOS
                playsInSilentModeIOS: true, // Play audio in silent mode (iOS)
                staysActiveInBackground: true, // Keep audio active in background
                interruptionModeIOS: Audio.InterruptionModeIOS.DUCK_OTHERS, // Duck other audio on iOS
                interruptionModeAndroid: Audio.InterruptionModeAndroid.DUCK_OTHERS, // Duck other audio on Android
            });
        } catch (error) {
            console.error("Failed to set audio mode:", error);
        }
    };
    
    const startRecording = async () => {
        setButtonTitle('recording in progress...')

        try {
            await setAudioMode();
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();

          setButtonTitle("Start Recording");
          console.log('Recording stopped, file saved at:', uri);

        } catch (err) {
          setButtonTitle("Start Recording");
          console.error('Failed to stop recording', err);
        }
    };

    return (
        <View>
            {hasPermission ? (
                <>
                    <Button 
                        onPress={startRecording}
                        title={buttonTitle}
                    />
                    <Button 
                        onPress={stopRecording}
                        title={"Stop Recording"}
                    />
                </>
            ) : (
                <Text>Permission is need to access the microphone</Text>
            )}
        </View>
    )
}

export default Recording;