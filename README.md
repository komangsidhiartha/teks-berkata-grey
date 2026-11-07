# TeksBerkata (Grey) | Project "Grey"

> **Context:** This repository is the React Native / Expo implementation of the **TeksBerkata Suite**, an R&D benchmarking initiative where the same "0-to-1" product is implemented in parallel across four mobile stacks:
> * 🟦 **Blue:** Flutter
> * 🟩 **Green:** Native Android (Kotlin + Jetpack Compose)
> * 🟥 **Red:** Native iOS (Swift + SwiftUI)
> * ⬜ **Grey:** React Native (Expo) [THIS REPO]

---

## 🎯 Project Overview & Architecture

**TeksBerkata Grey** is an offline Text-to-Speech (TTS) application designed with mobile-first principles, clean separation of concerns, and modern React Native ecosystem practices.

### Key Architectural Highlights
* **MVVM (Model-View-ViewModel) Pattern:**
  * **View:** UI screens (`src/app/index.tsx`) and components (`src/components/`).
  * **ViewModel:** Presentation and speech lifecycle logic encapsulated in `src/viewModel/HomeViewModel.ts`.
  * **Model / Store:** Persisted user playback preferences managed in `src/store/useSettingsStore.ts`.
  * **Services & Utils:** Robust speech engine wrapper with platform locale handling in `src/utils/TtsHelper.ts` and language context in `src/context/LanguageContext.tsx`.
* **Bleeding-Edge React Native & Expo:**
  * **Expo SDK:** **58** (`~58.0.23`)
  * **React Native:** **0.88.1** (New Architecture enabled by default)
  * **React:** **19.3.0** with **React Compiler** (`reactCompiler: true` in `app.json`)
  * **Typed Routing:** File-based navigation via `expo-router` with experimental typed routes enabled.
* **Continuous Native Generation (CNG):**
  * Native project directories (`android/` and `ios/`) are never committed to source control. Native configurations are deterministically generated via `app.json` config plugins and `npx expo prebuild`.
* **Production Observability:**
  * Integrated crash and performance monitoring via `@sentry/react-native` and the Expo Sentry config plugin.

---

## 🛠 Tech Stack

| Category | Technology / Library | Version / Details |
| :--- | :--- | :--- |
| **Framework** | [Expo](https://expo.dev) | SDK 58 (`~58.0.23`) |
| **Runtime** | React / React Native | React `19.3.0` / React Native `0.88.1` |
| **Routing** | `expo-router` | `~58.0.30` (File-based, Typed Routes) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | `^5.1.0` with `persist` middleware |
| **Local Storage** | `@react-native-async-storage/async-storage` | `2.2.0` (JSON storage adapter for Zustand) |
| **Text-to-Speech** | `expo-speech` | `~58.0.3` with voice fallback & locale resolver |
| **UI Components** | `@expo/ui` | Native platform controls (`@expo/ui/community/slider`) |
| **Layout & Safety** | `react-native-safe-area-context` | Safe area insets & edge-to-edge support |
| **Animations** | `react-native-reanimated` | `4.7.1` |
| **Error Monitoring** | `@sentry/react-native` | `^8.34.0` |
| **Build & Deploy** | EAS (Expo Application Services) | `eas.json` (Development, Preview APK, Production AAB) |

---

## 📁 Project Structure

```
├── app.json               # Expo configuration, plugins (Sentry, Splash), and experiments
├── eas.json               # EAS Build & Submit configuration profiles
├── src/
│   ├── app/               # Expo Router file-based screens
│   │   ├── _layout.tsx    # Root layout wrapped with Sentry, Splash Screen, & LanguageProvider
│   │   └── index.tsx      # Main TTS interface (text input, sliders, playback actions)
│   ├── components/        # Reusable UI elements
│   │   ├── CustomButton.tsx  # Accessible pill buttons with state styling
│   │   └── Header.tsx        # App bar header with EN/ID locale switcher
│   ├── context/           # App-level contexts
│   │   └── LanguageContext.tsx # Active TTS language context (en-US / id-ID)
│   ├── store/             # Global stores
│   │   └── useSettingsStore.ts # Zustand persistent store for speechRate & pitch
│   ├── utils/             # Helper utilities
│   │   └── TtsHelper.ts   # TTS engine wrapper with Android locale quirk matching
│   └── viewModel/         # Presentation logic
│       └── HomeViewModel.ts # Hook managing playback state, rate/pitch clamping, and errors
└── __test__/              # Sanity and unit test suites
```

---

## ✨ Features & Functionality

1. **Offline Text-to-Speech:**
   * Synthesizes text locally using the on-device TTS engine via `expo-speech`.
   * Multi-language support: English (`en-US`) and Indonesian (`id-ID`).
   * Smart voice discovery (`findBestVoice`) handling Android-specific locale quirks (such as legacy Java `in` / `in-ID` ISO tags) and friendly alert guidance if voice packages are missing.
2. **Customizable Playback Controls:**
   * Fine-grained Speech Rate and Pitch adjustments ($0.5\times$ to $2.0\times$, step $0.1$).
   * Stepper buttons (`+` / `-`) alongside platform-native slider controls.
3. **Persistent Settings:**
   * User rate and pitch configurations persist across sessions using Zustand and AsyncStorage.
4. **Resilient Input & Ergonomics:**
   * 4,000 character limit with live character counter.
   * Auto-keyboard dismissal and scrollable keyboard avoiding view.
   * Edge-to-edge layout compatibility.

---

## 🚀 Getting Started & Development

### 1. Prerequisites
* [Node.js](https://nodejs.org) (v20+ recommended)
* Android Studio / Xcode (for local native development) or an [EAS Build](https://docs.expo.dev/eas/) account.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally (Development Build)
Because this project utilizes native modules (`@sentry/react-native`, `@expo/ui`), it requires a **Development Client** rather than standard Expo Go.

**Option A — Via Cloud EAS Build (Recommended, no local Android Studio / Xcode required):**
1. Build and install the development client on your device/emulator:
   ```bash
   npx eas-cli@latest build --profile development --platform android
   ```
2. Start the local Metro bundler:
   ```bash
   npx expo start
   ```

**Option B — Via Local Native Compilation:**
```bash
# Start Android dev build (requires Android Studio / SDK)
npx expo run:android

# Start iOS dev build (macOS & Xcode required)
npx expo run:ios
```

### 4. Code Quality & Type Checks
```bash
# Run ESLint
npx expo lint

# Run TypeScript typecheck
npx tsc --noEmit
```

---

## 📦 Building & Deploying with EAS

This project is pre-configured with [EAS Build](https://docs.expo.dev/build/introduction/) in `eas.json`:

> [!NOTE]
> Since Sentry is integrated via `@sentry/react-native/expo`, ensure `SENTRY_AUTH_TOKEN` is configured in your EAS environment secrets (via `npx eas-cli@latest secret:create` or the Expo dashboard) for sourcemap uploads during builds.

```bash
# 1. Build Development Client
npx eas-cli@latest build --profile development --platform android

# 2. Build Internal Preview APK (Directly installable on Android)
npx eas-cli@latest build --profile preview --platform android

# 3. Build Production Bundle (Google Play .aab / App Store .ipa)
npx eas-cli@latest build --profile production --platform android
# For iOS:
npx eas-cli@latest build --profile production --platform ios

# 4. Submit to App Stores
npx eas-cli@latest submit --platform android
```

---

*Maintained by Komang Sidhi Artha*
