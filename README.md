# PlantPal

A beautiful botanical field journal app for discovering, documenting, and organizing plant finds. Capture photos of plants you encounter in nature, add scientific names, filter by category, and maintain a personal collection of your botanical discoveries.

## Features

- **Field Journal Dashboard** — View your plant discoveries as polaroid cards with stats tracking (total finds, species count, weekly activity)
- **Plant Photography** — Capture photos of plants you find with an intuitive camera interface
- **Categorization** — Organize finds by category (Flowers, Trees, Fungi, Berries)
- **Scientific Records** — Document each find with common name, Latin name, date, and location
- **Persistent Storage** — All discoveries are saved locally on your device
- **Dark Mode Support** — Beautiful dark theme for low-light plant hunting
- **Multi-language Support** — Available in English, Spanish, French, Arabic, Hindi, Japanese, and Korean
- **Responsive Design** — Works seamlessly on iOS and Android devices

## Tech Stack

| Category | Libraries |
|---|---|
| Framework | React Native 0.83.4, Expo 55, TypeScript 5.9 |
| Navigation | React Navigation 7 (native-stack, bottom-tabs) |
| State | React Context API + MMKV persistent storage |
| UI | react-native-reanimated, react-native-gesture-handler, react-native-heroicons |
| Fonts | Space Grotesk via `@expo-google-fonts/space-grotesk` |
| Networking | apisauce |
| i18n | i18next + react-i18next (EN, ES, FR, AR, HI, JA, KO) |
| Notifications | expo-notifications |
| Debugging | Reactotron + MMKV plugin |
| Testing | Jest, Maestro (E2E) |
| Build | EAS (Expo Application Services) |

**JS Engine:** Hermes — **New Architecture:** Enabled

## Project Structure

```
app/
├── screens/          # App screens (Dashboard/Field Journal, Paywall, Settings, Onboarding)
├── components/
│   ├── plantpal/     # Plant-specific UI components (Polaroid cards, icons)
│   └── ...           # Shared UI components
├── context/          # State management (app state, purchases)
├── navigators/       # Navigation setup and types
├── theme/            # PlantPal-specific colors, typography, spacing
├── hooks/            # Custom React hooks
├── models/           # TypeScript type definitions
├── services/api/     # API integration
├── utils/            # Storage, helpers, formatters
├── i18n/             # Translations (EN, ES, FR, AR, HI, JA, KO)
└── config/           # Development/production configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI
- Xcode (for iOS) / Android Studio (for Android)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd PlantPal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open on iOS or Android:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## Building for Deployment

The project uses EAS (Expo Application Services) for building and distributing. Build profiles are configured in `eas.json`:

```bash
# iOS
npm run build:ios:sim      # simulator
npm run build:ios:device   # physical device
npm run build:ios:preview  # TestFlight
npm run build:ios:prod     # App Store

# Android
npm run build:android:sim      # emulator
npm run build:android:device   # physical device
npm run build:android:preview  # Google Play internal track
npm run build:android:prod     # Play Store
```

**Prerequisites:** EAS CLI (`npm i -g eas-cli`)

## Development Scripts

```bash
npm run compile         # TypeScript type check
npm run lint            # ESLint (auto-fix)
npm run lint:check      # ESLint (check only)
npm run test            # Jest unit tests
npm run test:watch      # Jest in watch mode
npm run test:maestro    # Maestro E2E tests
npm run depcruise:graph # Generate dependency graph SVG
```

## Configuration

Key configuration files:

| File | Purpose |
|---|---|
| `app/config/config.base.ts` | Base config (nav persistence, error handling) |
| `app/config/config.dev.ts` | Development API settings |
| `app/config/config.prod.ts` | Production API settings |
| `app.json` | Expo app metadata (name, bundle IDs, icons) |
| `eas.json` | EAS build profiles for iOS and Android |

Customize app identifiers in `app.json` (iOS bundle ID: `com.plantpal.app`, Android package: `com.plantpal.app`)
