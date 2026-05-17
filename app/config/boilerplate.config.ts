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
    // To enable real subscriptions on iOS:
    // 1. Create a PlantPal app in App Store Connect (bundle id: com.plantpal.app).
    // 2. Create two subscription products there ("plantpal_yearly", "plantpal_monthly")
    //    under a shared subscription group, with a 7-day free trial intro on yearly.
    // 3. Sign up at https://app.revenuecat.com, create a project, link the App Store
    //    Connect API key, and add the two products under an "default" Offering.
    // 4. Copy the iOS app's public API key (starts with "appl_") and paste it below.
    // 5. Remove the __DEV__ skip link in PaywallScreen.tsx.
    apiKey: "YOUR_REVENUECAT_API_KEY",
    entitlementName: "premium",
  },
}
