import { useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { speakText, stopSpeaking } from '@/utils/TtsHelper';
import { useSettingsStore } from '@/store/useSettingsStore';

export const useHomeViewModel = () => {
  const { speechRate, pitch, setSpeechRate, setPitch } = useSettingsStore();
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language } = useLanguage();

  const initiateStopSpeaking = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const onPressSpeak = useCallback(() => {
    if (!text.trim()) return;
    setIsSpeaking(true);
    speakText(text, speechRate, pitch, language, () => {
      setIsSpeaking(false);
    });
  }, [text, speechRate, pitch, language]);

  const onPressStop = useCallback(() => {
    initiateStopSpeaking();
  }, [initiateStopSpeaking]);

  const onPressClear = useCallback(() => {
    initiateStopSpeaking();
    setText('');
  }, [initiateStopSpeaking]);

  const onRateChange = useCallback((value: number) => {
    const newRate = Math.max(0.5, Math.min(2.0, Math.round(value * 10) / 10));
    setSpeechRate(newRate);
  }, [setSpeechRate]);

  const onPitchChange = useCallback((value: number) => {
    const newPitch = Math.max(0.5, Math.min(2.0, Math.round(value * 10) / 10));
    setPitch(newPitch);
  }, [setPitch]);

  return {
    text,
    setText,
    speechRate,
    pitch,
    language,
    isSpeaking,
    onPressSpeak,
    onPressStop,
    onPressClear,
    onRateChange,
    onPitchChange,
  };
};

