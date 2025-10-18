import * as Speech from 'expo-speech';

export const speakText = (text: string, rate: number, pitch: number, language: string, onDone: () => void) => {
    if (!text.trim()) {
        onDone()
        return;
    }

    stopSpeaking(); // ensure no overlap
    Speech.speak(text, {
        language,
        rate,
        pitch,
        onDone,
    });
};

export const stopSpeaking = () => {
    Speech.stop();
};
