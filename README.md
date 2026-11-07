# TeksBerkata (Grey) | Project "Grey"

> **Context:** This repository is the React Native implementation of the **TeksBerkata Suite**, an R&D benchmarking initiative where the same "0-to-1" product is implemented in parallel using different mobile stacks:
> * 🟦 **Blue:** Flutter
> * 🟩 **Green:** Native Android (Kotlin + Jetpack Compose)
> * 🟥 **Red:** Native iOS (Swift + SwiftUI)
> * ⬜ **Grey:** React Native (Expo + Fabric) [THIS REPO]

## 🎯 Architecture & Goals
This project serves as a testbed for the **New React Native Architecture** (Fabric/TurboModules) and modern Expo capabilities.

**Key Technical Decisions:**
* **Bleeding Edge:** Running **React 19.1.0** on **React Native 0.81.4**.
* **Framework:** **Expo SDK 54**.
* **Storage:** **MMKV (v3)** running on the **Nitro Engine** for synchronous, high-performance JSI reads.
* **State Management:** **Zustand** with persistent middleware (linked to MMKV).
* **Native Strategy:** Uses **CNG (Continuous Native Generation)** via `npx expo prebuild`. No native `android/` or `ios/` folders are committed to source control to maintain a clean, upgrade-safe repository.

## 🛠 Tech Stack
* **Routing:** `expo-router` (v6) - File-based routing.
* **Styling:** `nativewind` (v4) - Tailwind CSS for Native.
* **Performance:** `react-native-mmkv` + `react-native-nitro-modules`.
* **Haptics:** `expo-haptics`.

## 🚀 Getting Started & Building

⚠️ **IMPORTANT:** This project uses custom C++ TurboModules (Nitro/MMKV). **It will NOT run in the standard Expo Go app.** You must build a Development Client.

### 1. Install Dependencies
`npm install`

### 2. Run on Emulator/Device (Development Build)
This command handles the Prebuild (CNG) and compiles the native binaries:

`npx expo run:android`

`# For iOS (Mac only)`
`npx expo run:ios`

### 3. Architecture Highlights
* **Store Configuration:** Check `store/useSettingsStore.ts` to see the **Synchronous JSI Adapter** implementation connecting Zustand to MMKV via Nitro.

---
*Maintained by Komang Sidhi Artha*