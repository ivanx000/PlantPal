// PlantPal palette — calm field-journal aesthetic.
// See plantpal/chats/chat1.md for design rationale.

const palette = {
  // Brand — teal
  tealDeep:   "#1F4E4A", // primary buttons, key actions, logo
  eucalyptus: "#2C7268", // hover / active
  sage:       "#5FA396", // secondary, confidence-low
  mist:       "#A8CFC5", // subtle highlights, badges
  paleTeal:   "#E0EDE8", // info surfaces

  // Backgrounds — warm wood neutrals (no white)
  parchment:  "#F5EDDF", // default page background
  parchmentSoft: "#FBF6EC", // polaroid card, list group surface
  sandstone:  "#EAD9BD", // cards, modals, elevated
  birch:      "#D4B896", // dividers, input borders

  // Wood accents
  oak:        "#A07B52",
  walnut:     "#5C4530",

  // Content tags
  pollen:     "#E8A547", // sun-loving, fungi
  berry:      "#C2625A", // berries, autumn, toxic
  iris:       "#7B5A8F", // flowering

  // Text
  ink:        "#1C2420", // body
  charcoal:   "#4A4A45", // secondary
  stone:      "#8A8278", // muted / hint

  // Legacy slots — kept so built-in boilerplate Button/Card components don't break.
  // Mapped onto PlantPal-appropriate neutrals where possible.
  neutral100: "#FBF6EC", // ≈ parchmentSoft
  neutral200: "#F5EDDF", // ≈ parchment
  neutral300: "#EAD9BD", // ≈ sandstone
  neutral400: "#D4B896", // ≈ birch
  neutral500: "#8A8278", // ≈ stone
  neutral600: "#4A4A45", // ≈ charcoal
  neutral700: "#2C2C2C",
  neutral800: "#1C2420", // ≈ ink
  neutral900: "#0F1411",

  secondary500: "#41476E",
  accent100:    "#F4F2ED",
  angry100:     "#FDF1F0",
  angry500:     "#C0392B",

  overlay20: "rgba(0, 0, 0, 0.2)",
  overlay50: "rgba(0, 0, 0, 0.5)",
} as const

export type PlantPalPalette = typeof palette

// Legacy alias — the old "goal accent color" tag colors. Not used by PlantPal,
// but kept so any leftover model types still compile.
export type GoalAccentColor = string
export const GOAL_ACCENT_COLORS: readonly string[] = [
  palette.iris,
  palette.berry,
  palette.pollen,
  palette.eucalyptus,
  palette.sage,
  palette.oak,
  palette.mist,
  palette.walnut,
] as const

// Semantic mapping for the Ignite theme system.
export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",

  text:           palette.ink,
  textDim:        palette.charcoal,
  textMuted:      palette.stone,
  background:     palette.parchment,
  card:           palette.parchmentSoft,
  cardElevated:   palette.sandstone,
  border:         palette.birch,
  separator:      "rgba(212,184,150,0.5)", // birch @ 50%
  tint:           palette.tealDeep,
  tintInactive:   palette.stone,
  accentBg:       palette.paleTeal,
  accentBorder:   palette.mist,
  error:          palette.berry,
  errorBackground:"#FDF1F0",
} as const
