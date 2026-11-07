import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsState {
  speechRate: number;
  pitch: number;
  setSpeechRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      speechRate: 1.0,
      pitch: 1.0,
      setSpeechRate: (rate: number) => set({ speechRate: rate }),
      setPitch: (pitch: number) => set({ pitch }),
    }),
    {
      name: 'teks-berkata-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

