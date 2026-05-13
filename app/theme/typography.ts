// PlantPal typography
// - Instrument Serif: plant common names (the discovery moment)
// - Fraunces (italic): Latin binomials and body serif accents
// - Inter: all UI text

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter"
import {
  Fraunces_400Regular,
  Fraunces_400Regular_Italic,
  Fraunces_500Medium,
  Fraunces_500Medium_Italic,
} from "@expo-google-fonts/fraunces"
import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from "@expo-google-fonts/instrument-serif"

export const customFontsToLoad = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Fraunces_400Regular,
  Fraunces_400Regular_Italic,
  Fraunces_500Medium,
  Fraunces_500Medium_Italic,
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
}

const fonts = {
  // Inter — UI / body
  inter: {
    light: "Inter_400Regular",
    normal: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_600SemiBold",
  },
  // Fraunces — Latin binomials, italic accents, secondary serif
  fraunces: {
    normal: "Fraunces_400Regular",
    italic: "Fraunces_400Regular_Italic",
    medium: "Fraunces_500Medium",
    mediumItalic: "Fraunces_500Medium_Italic",
  },
  // Instrument Serif — display: plant common names, headings
  instrumentSerif: {
    normal: "InstrumentSerif_400Regular",
    italic: "InstrumentSerif_400Regular_Italic",
  },
  // Legacy boilerplate — kept so unrelated components don't break
  spaceGrotesk: {
    light: "300",
    normal: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
}

export const typography = {
  fonts,
  /** Primary UI font — Inter */
  primary: fonts.inter,
  /** Secondary serif — Fraunces (used italicised for binomials) */
  secondary: fonts.fraunces,
  /** Display serif — Instrument Serif, for plant names and big headings */
  display: fonts.instrumentSerif,
  /** Code/monospace placeholder */
  code: fonts.inter,
}
