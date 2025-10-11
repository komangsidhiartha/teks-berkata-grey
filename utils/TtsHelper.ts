import * as Speech from 'expo-speech';

export const speakText = (text: string, rate: number, pitch: number, language: string) => {
    if (!text.trim()) return;

    stopSpeaking(); // ensure no overlap
    Speech.speak(text, {
        language,
        rate,
        pitch,
    });
};

export const stopSpeaking = () => {
    Speech.stop();
};
