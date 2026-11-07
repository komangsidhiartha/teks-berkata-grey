import { useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { speakText, stopSpeaking } from '@/utils/TtsHelper';
import { useSettingsStore } from '@/store/useSettingsStore';

export interface UseHomeViewModelOptions {
  onError?: (error: Error) => void;
}

export const useHomeViewModel = (options?: UseHomeViewModelOptions) => {
  const { speechRate, pitch, setSpeechRate, setPitch } = useSettingsStore();
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { language } = useLanguage();

  const initiateStopSpeaking = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const onPressSpeak = useCallback(() => {
    if (!text.trim()) return;
    setIsSpeaking(true);
    setError(null);
    speakText(
      text,
      speechRate,
      pitch,
      language,
      () => {
        setIsSpeaking(false);
      },
      (err) => {
        setIsSpeaking(false);
        setError(err);
        options?.onError?.(err);
      }
    );
  }, [text, speechRate, pitch, language, options]);

  const onPressStop = useCallback(() => {
    initiateStopSpeaking();
  }, [initiateStopSpeaking]);

  const onPressClear = useCallback(() => {
    initiateStopSpeaking();
    setText('');
    setError(null);
  }, [initiateStopSpeaking]);

  const onRateChange = useCallback((value: number) => {
    const newRate = Math.max(0.5, Math.min(2.0, Math.round(value * 10) / 10));
    setSpeechRate(newRate);
  }, [setSpeechRate]);

  const onPitchChange = useCallback((value: number) => {
    const newPitch = Math.max(0.5, Math.min(2.0, Math.round(value * 10) / 10));
    setPitch(newPitch);
  }, [setPitch]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    text,
    setText,
    speechRate,
    pitch,
    language,
    isSpeaking,
    error,
    clearError,
    onPressSpeak,
    onPressStop,
    onPressClear,
    onRateChange,
    onPitchChange,
  };
};

