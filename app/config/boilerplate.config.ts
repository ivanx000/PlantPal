import { ImageSourcePropType } from "react-native"

export interface OnboardingSlide {
  title: string
  body: string
  image?: ImageSourcePropType
  imageScale?: number
  imageOffsetY?: number
}

export interface BoilerplateConfigType {
  app: {
    name: string
    tagline: string
    supportEmail: string
  }
  onboarding: {
    slides: OnboardingSlide[]
    /** Set to true to request notification permissions on the last slide */
    requestNotifications: boolean
  }
  paywall: {
    eyebrow: string
    headline: string
    subtitle: string
    features: { title: string; description: string; icon: string }[]
    yearlyPrice: string
    monthlyPrice: string
    trial: string
    legal: string
  }
  revenueCat: {
    apiKey: string
    /** Optional RevenueCat Test Store key for development. Used when __DEV__ is true. */
    testApiKey?: string
    entitlementName: string
  }
}

export const BoilerplateConfig: BoilerplateConfigType = {
  app: {
    name: "PlantPal",
    tagline: "Curiosity, captured.",
    supportEmail: "hello@plantpal.app",
  },
  onboarding: {
    slides: [
      {
        title: "See what you're looking at.",
        body: "Snap a photo of any plant, tree, flower or fungus and PlantPal will tell you what it is.",
        image: require("../../assets/onboarding1.png"),
        imageScale: 0.85,
      },
      {
        title: "Keep a field journal.",
        body: "Every find is saved as a polaroid memory you can revisit, annotate and share.",
        image: require("../../assets/onboarding2.png"),
        imageScale: 1.05,
        imageOffsetY: 40,
      },
      {
        title: "Wander a little further.",
        body: "Confidence indicators, deeper notes, offline mode — everything you need on the trail.",
        image: require("../../assets/onboarding3.png"),
        imageScale: 0.95,
      },
    ],
    requestNotifications: false,
  },
  paywall: {
    eyebrow: "PLANTPAL PREMIUM",
    headline: "Wander a little\nfurther.",
    subtitle:
      "Unlimited identifications, deeper field notes for every plant, and a journal that follows you offline.",
    features: [
      {
        icon: "leaf",
        title: "Unlimited identifications",
        description: "No daily cap. Identify everything you find.",
      },
      {
        icon: "book",
        title: "Deeper field notes",
        description: "Folklore, edibility, look-alikes, season.",
      },
      {
        icon: "download",
        title: "Offline mode",
        description: "Identify and journal without signal.",
      },
      {
        icon: "export",
        title: "Export your journal",
        description: "PDF keepsake or JSON archive, anytime.",
      },
      {
        icon: "heart",
        title: "Support a small studio",
        description: "Two people, no ads, no data resold.",
      },
    ],
    yearlyPrice: "£24.99 / year",
    monthlyPrice: "£4.99 / month",
    trial: "Start 7-day free trial",
    legal: "Then £24.99 / year. Cancel anytime before the trial ends.",
  },
  revenueCat: {
    // PlantPal RevenueCat project: 419b4d67
    // App Store Connect app: PlantPal: Field Journal (com.ivanxie.plantpal)
    // Subscriptions: plantpal_yearly (£24.99/yr), plantpal_monthly (£4.99/mo)
    //
    // Two keys:
    //   apiKey      → real iOS public key (appl_...) for production / TestFlight builds
    //   testApiKey  → RevenueCat Test Store key for the simulator until the Paid
    //                  Applications Agreement is signed in App Store Connect.
    //
    // We currently use the test key in __DEV__ and the appl_ key elsewhere — see
    // app/context/PurchasesContext.tsx.
    apiKey: "appl_fRuQmqgTGjhcaaoBiITjOnCdSjM",
    testApiKey: "test_MrnfqFnFpGuFXGaIBXnvVQVhYNg",
    entitlementName: "premium",
  },
}
