import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({
    id: 'teks-berkata-storage',
    // encryptionKey: '...' // Explicitly comment: "Not needed for settings, but available for sensitive data"
});

const mmkvStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

interface SettingsState {
    speechRate: number;
    pitch: number;
    setSpeechRate: (rate: number) => void
    setPitch: (pitch: number) => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            speechRate: 1.0,
            pitch: 1.0,
            setSpeechRate: (rate: number) => set({ speechRate: rate }),
            setPitch: (pitch: number) => set({ pitch: pitch }),
        }),
        {
            name: 'teks-berkata-settings',
            // ARCHITECTURE NOTE:
            // Switched to MMKV (Nitro) for synchronous JSI reads.
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);