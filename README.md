# PlantPal

A botanical field journal for iOS and Android. Photograph plants, identify them with AI, and build a personal collection of your finds.

## Features

- **Plant Identification** — Photograph a plant and get an AI-powered identification via the [PlantNet API](https://plantnet.org), with confidence scoring and alternative matches
- **Field Journal** — Saved finds displayed as tilted polaroid cards with common name, Latin binomial, and date
- **Live Stats** — Total finds, unique species count, and weekly activity tracked automatically
- **Explore** — Browse your sightings chronologically; map view coming in a future release
- **Discover** — Curated seasonal plant suggestions updated each month (UK flora)
- **Profile** — Your journal stats and subscription status at a glance
- **Persistent Storage** — Journal and settings survive app restarts via MMKV
- **Multi-language** — i18n scaffolding in EN, ES, FR, AR, HI, JA, KO

## Tech Stack

| Category | Libraries |
|---|---|
| Framework | React Native 0.83.4, Expo 55, TypeScript 5.9 |
| Navigation | React Navigation 7 (native-stack + custom floating tab bar) |
| State | React Context + MMKV persistent storage |
| Plant ID | [PlantNet API](https://my.plantnet.org) — mock fallback when no key set |
| Camera | expo-image-picker (camera + photo library) |
| UI | react-native-reanimated, react-native-gesture-handler, react-native-svg |
| Fonts | Inter · Fraunces · Instrument Serif (via `@expo-google-fonts`) |
| Networking | apisauce + fetch (PlantNet multipart upload) |
| Date formatting | date-fns |
| i18n | i18next + react-i18next |
| Notifications | expo-notifications |
| Debugging | Reactotron + MMKV plugin |
| Testing | Jest, Maestro (E2E) |
| Build | EAS (Expo Application Services) |

**JS Engine:** Hermes — **New Architecture:** Enabled

## Project Structure

```
app/
├── screens/
│   ├── DashboardScreen.tsx   # Field journal (home)
│   ├── CameraScreen.tsx      # Photo capture + identification trigger
│   ├── ResultScreen.tsx      # Identification result + save to journal
│   ├── ExploreScreen.tsx     # Chronological sightings list
│   ├── DiscoverScreen.tsx    # Seasonal plant suggestions
│   ├── ProfileScreen.tsx     # Journal stats + subscription
│   ├── OnboardingScreen.tsx
│   ├── PaywallScreen.tsx
│   └── SettingsScreen.tsx
├── components/
│   ├── plantpal/             # Polaroid card, icons, shared TabBar
│   └── ...                   # Generic UI primitives
├── context/
│   ├── JournalContext.tsx    # MMKV-backed find store + stats
│   └── SettingsContext.tsx   # MMKV-backed settings (detection, capture prefs)
├── services/
│   ├── plantnet/             # PlantNet identification API
│   └── api/                  # Generic API utilities
├── navigators/               # Navigation setup and TypeScript types
├── theme/                    # Colors, typography, PlantPal design constants
├── models/                   # TypeScript type definitions (PlantFind, etc.)
├── utils/                    # Storage, date helpers, notifications
├── i18n/                     # Translations (EN, ES, FR, AR, HI, JA, KO)
└── config/                   # Dev/prod configuration
```

## Getting Started

### Prerequisites
- Node.js 20+
- Expo CLI + EAS CLI (`npm i -g expo-cli eas-cli`)
- Xcode 15+ (iOS) / Android Studio (Android)

### Installation

```bash
git clone https://github.com/ivanx000/PlantPal.git
cd PlantPal
npm install
```

### Run in development

This project uses `expo-dev-client` (not Expo Go). You need to build the native app once before running JS:

```bash
# Build native dev client (first time, or after adding native dependencies)
npm run build:ios:sim    # iOS Simulator
npm run build:android:sim

# Then start the JS bundler
npm run start
```

### PlantNet API key (optional)

Without a key the app uses mock identification data so you can develop offline. To use real plant identification:

1. Register for a free key at [my.plantnet.org](https://my.plantnet.org)
2. Add it to your environment:
   ```bash
   export PLANTNET_API_KEY=your-key-here
   ```
   Or set `PLANTNET_API_KEY` in your EAS build environment variables.

## Building for Deployment

```bash
# iOS
npm run build:ios:sim        # Simulator .app
npm run build:ios:device     # Dev build for physical device
npm run build:ios:preview    # TestFlight .ipa
npm run build:ios:prod       # App Store .ipa

# Android
npm run build:android:sim      # Emulator .apk
npm run build:android:device   # Dev build for physical device
npm run build:android:preview  # Google Play internal track .aab
npm run build:android:prod     # Play Store .aab
```

## Development Scripts

```bash
npm run compile         # TypeScript type check (tsc --noEmit)
npm run lint            # ESLint with auto-fix
npm run lint:check      # ESLint check only
npm run test            # Jest unit tests
npm run test:watch      # Jest watch mode
npm run test:maestro    # Maestro E2E flows
npm run depcruise:graph # Generate dependency graph SVG
```

## Configuration

| File | Purpose |
|---|---|
| `app/config/config.base.ts` | Base config (navigation persistence, error catching, API keys shape) |
| `app/config/config.dev.ts` | Dev overrides — reads `REVENUECAT_API_KEY` and `PLANTNET_API_KEY` from env |
| `app/config/config.prod.ts` | Production overrides |
| `app.json` | Expo metadata: bundle IDs, icons, splash, permissions |
| `eas.json` | EAS build profiles |

**Bundle identifiers:** iOS `com.ivanxie.plantpal` · Android `com.ivanxie.plantpal`
