// Line icons for PlantPal — botanical feel, stroke 1.5, round caps.
// Ports of plantpal/project/icons.jsx to react-native-svg.

import { ReactNode } from "react"
import Svg, { Circle, Path, Rect } from "react-native-svg"

interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

function Icon({
  size = 20,
  color = "currentColor",
  strokeWidth = 1.5,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  )
}

export const IconLeaf = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M4 20c0-9 7-15 16-15-1 9-7 15-16 15z" />
    <Path d="M4 20l9-9" />
  </Icon>
)

export const IconBookmark = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M6 4h12v17l-6-4-6 4V4z" />
  </Icon>
)

export const IconShare = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M12 3v13" />
    <Path d="M8 7l4-4 4 4" />
    <Path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
  </Icon>
)

export const IconChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M6 9l6 6 6-6" />
  </Icon>
)

export const IconChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M9 6l6 6-6 6" />
  </Icon>
)

export const IconChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M15 6l-6 6 6 6" />
  </Icon>
)

export const IconMap = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z" />
    <Circle cx="12" cy="9" r="2.5" />
  </Icon>
)

export const IconNote = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M6 3h9l4 4v14H6V3z" />
    <Path d="M15 3v4h4" />
    <Path d="M9 13h7M9 16h5" />
  </Icon>
)

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M6 6l12 12M18 6L6 18" />
  </Icon>
)

export const IconCamera = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <Circle cx="12" cy="13" r="4" />
  </Icon>
)

export const IconUser = (p: IconProps) => (
  <Icon {...p}>
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
  </Icon>
)

export const IconSettings = (p: IconProps) => (
  <Icon {...p}>
    <Circle cx="12" cy="12" r="3" />
    <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Icon>
)

export const IconBook = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4V4z" />
    <Path d="M20 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8V4z" />
  </Icon>
)

export const IconDownload = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M12 4v12" />
    <Path d="M7 11l5 5 5-5" />
    <Path d="M5 20h14" />
  </Icon>
)

export const IconExport = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M12 16V4" />
    <Path d="M7 9l5-5 5 5" />
    <Path d="M5 20h14" />
  </Icon>
)

export const IconHeart = (p: IconProps) => (
  <Icon {...p}>
    <Path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </Icon>
)

export const IconStar = ({
  size = 12,
  color = "#E8A547",
}: {
  size?: number
  color?: string
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l2.5 6.5L21 9.5l-5 4.5 1.5 7L12 17.5 6.5 21 8 14 3 9.5l6.5-1L12 2z" />
  </Svg>
)

export const IconCheck = ({
  size = 14,
  color = "#F5EDDF",
  strokeWidth = 3,
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 12l5 5L20 6" />
  </Svg>
)

export const IconMore = ({ size = 20, color = "#4A4A45" }: IconProps) => (
  <Svg width={size} height={size / 3.3} viewBox="0 0 20 6">
    <Circle cx="3" cy="3" r="1.6" fill={color} />
    <Circle cx="10" cy="3" r="1.6" fill={color} />
    <Circle cx="17" cy="3" r="1.6" fill={color} />
  </Svg>
)

// Confidence leaf — filled = active, outline = inactive
export const ConfidenceLeaf = ({
  filled = false,
  color = "#1F4E4A",
  size = 14,
}: {
  filled?: boolean
  color?: string
  size?: number
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      d="M3 13c0-6 4-10 10-10 0 6-4 10-10 10z"
      fill={filled ? color : "transparent"}
      stroke={color}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
    <Path
      d="M3 13l5.5-5.5"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      fill="none"
      opacity={filled ? 0.55 : 0.9}
    />
  </Svg>
)

// "Tinted blurred botanical placeholder" — replicates the
// gradient-only photo stand-in used in the design while we don't have real
// uploaded photos yet.
export const BotanicalPlaceholder = ({
  tint = "rgba(120,148,86,0.55)",
  height = 130,
  borderRadius = 2,
}: {
  tint?: string
  height?: number
  borderRadius?: number
}) => (
  <Svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
    <Rect width={100} height={100} fill="#8a9b7e" rx={borderRadius} />
    <Rect width={100} height={100} fill={tint} />
  </Svg>
)
