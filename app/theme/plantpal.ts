// PlantPal-specific design constants — shared across screens.

import { TextStyle, ViewStyle } from "react-native"

export const PP_COLORS = {
  parchment: "#F5EDDF",
  parchmentSoft: "#FBF6EC",
  sandstone: "#EAD9BD",
  birch: "#D4B896",
  birchSoft: "rgba(212,184,150,0.6)",
  birchHairline: "rgba(212,184,150,0.5)",
  birchBorder: "rgba(140,110,70,0.18)",
  birchBorderStrong: "rgba(140,110,70,0.3)",

  tealDeep: "#1F4E4A",
  eucalyptus: "#2C7268",
  sage: "#5FA396",
  mist: "#A8CFC5",
  paleTeal: "#E0EDE8",

  oak: "#A07B52",
  walnut: "#5C4530",

  pollen: "#E8A547",
  berry: "#C2625A",
  iris: "#7B5A8F",

  ink: "#1C2420",
  charcoal: "#4A4A45",
  stone: "#8A8278",
} as const

// Font name constants — keep in sync with theme/typography.ts
export const PP_FONT = {
  // Inter
  uiRegular: "Inter_400Regular",
  uiMedium: "Inter_500Medium",
  uiSemibold: "Inter_600SemiBold",
  // Fraunces
  serifRegular: "Fraunces_400Regular",
  serifItalic: "Fraunces_400Regular_Italic",
  serifMedium: "Fraunces_500Medium",
  serifMediumItalic: "Fraunces_500Medium_Italic",
  // Instrument Serif — display
  displayRegular: "InstrumentSerif_400Regular",
  displayItalic: "InstrumentSerif_400Regular_Italic",
} as const

// Helpers
export const polaroidShadow: ViewStyle = {
  // RN doesn't compose multiple shadows, so we use a single one tuned to
  // approximate the soft warm field-journal feel.
  shadowColor: "#3C2814",
  shadowOpacity: 0.18,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 12 },
  elevation: 6,
}

export const softShadow: ViewStyle = {
  shadowColor: "#3C2814",
  shadowOpacity: 0.12,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 8 },
  elevation: 3,
}

export const displayName: TextStyle = {
  fontFamily: PP_FONT.displayRegular,
  fontSize: 38,
  lineHeight: 40,
  letterSpacing: -0.6,
  color: PP_COLORS.ink,
}

export const binomial: TextStyle = {
  fontFamily: PP_FONT.serifItalic,
  fontStyle: "italic",
  fontSize: 15,
  lineHeight: 19,
  color: PP_COLORS.charcoal,
}

export const eyebrow: TextStyle = {
  fontFamily: PP_FONT.uiMedium,
  fontSize: 11,
  letterSpacing: 0.5,
  color: PP_COLORS.stone,
}
