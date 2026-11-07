import * as Speech from 'expo-speech';

/**
 * Finds the best installed voice for the requested language tag.
 * Handles Android-specific locale quirks (e.g. legacy 'in-ID' code for Indonesian).
 */
export const findBestVoice = async (language: string): Promise<Speech.Voice | undefined> => {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const langNormalized = language.toLowerCase().replace('_', '-');
    const langPrefix = langNormalized.split('-')[0]; // 'id' or 'en'

    // 1. Exact match (e.g. 'id-ID' or 'id-id')
    let match = voices.find(
      (v) => v.language.toLowerCase().replace('_', '-') === langNormalized
    );

    // 2. For Indonesian, also check legacy Java ISO 639-1 code 'in' / 'in-ID'
    if (!match && langPrefix === 'id') {
      match = voices.find((v) => {
        const l = v.language.toLowerCase().replace('_', '-');
        return l.startsWith('in') || l.startsWith('id');
      });
    }

    // 3. Fallback to matching primary language prefix
    if (!match) {
      match = voices.find(
        (v) => v.language.toLowerCase().replace('_', '-').split('-')[0] === langPrefix
      );
    }

    return match;
  } catch (err) {
    console.warn('[TTS] Failed to query available voices:', err);
    return undefined;
  }
};

export const speakText = async (
  text: string,
  rate: number,
  pitch: number,
  language: string,
  onDone: () => void,
  onError?: (error: Error) => void
) => {
  if (!text.trim()) {
    onDone();
    return;
  }

  stopSpeaking(); // ensure no overlap

  try {
    const voice = await findBestVoice(language);

    if (language.startsWith('id') && !voice) {
      const missingVoiceErr = new Error(
        'VOICE_MISSING: Indonesian voice data is not installed on this device.'
      );
      onError?.(missingVoiceErr);
    }

    const options: Speech.SpeechOptions = {
      language: voice?.language ?? language,
      rate,
      pitch,
      onDone,
      onStopped: onDone,
      onError: (err) => {
        console.warn('[TTS Error]:', err);
        onError?.(err);
        onDone();
      },
    };

    if (voice?.identifier) {
      options.voice = voice.identifier;
    }

    Speech.speak(text, options);
  } catch (error) {
    console.warn('[TTS] Error invoking speech:', error);
    onError?.(error instanceof Error ? error : new Error(String(error)));
    onDone();
  }
};

export const stopSpeaking = () => {
  Speech.stop();
};
