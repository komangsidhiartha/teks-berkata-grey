import { create } from 'zustand';

interface SettingsState {
    speechRate: number;
    pitch: number;
    setSpeechRate: (rate: number) => void
    setPitch: (pitch: number) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
    speechRate: 1.0,
    pitch: 1.0,
    setSpeechRate: (rate: number) => set({ speechRate: rate }),
    setPitch: (pitch: number) => set({ pitch: pitch }),
}));