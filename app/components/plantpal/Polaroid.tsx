// Polaroid card — the signature PlantPal motif.
// A tilted parchment-toned card holding a photo (or tinted placeholder) plus caption.

import { ReactNode } from "react"
import { Image, ImageSourcePropType, View, ViewStyle } from "react-native"

import { PP_COLORS, polaroidShadow } from "@/theme/plantpal"

interface PolaroidProps {
  /** Rotation degrees */
  tilt?: number
  /** Width in pixels — height of the photo derives from this */
  width?: number
  /** Aspect of the photo area (default 1:1) */
  photoAspect?: number
  /** Photo source. If omitted, a tinted gradient placeholder is shown. */
  source?: ImageSourcePropType
  /** Override placeholder tint when no source provided */
  tint?: string
  /** Inner padding around the photo */
  padding?: number
  /** Bottom padding for caption area */
  captionPadding?: number
  /** Optional caption rendered below the photo */
  caption?: ReactNode
  style?: ViewStyle
}

export function Polaroid({
  tilt = 0,
  width = 260,
  photoAspect = 1,
  source,
  tint = "rgba(120,148,86,0.55)",
  padding = 12,
  captionPadding = 56,
  caption,
  style,
}: PolaroidProps) {
  const photoSize = width - padding * 2
  const photoHeight = photoSize / photoAspect

  return (
    <View
      style={[
        {
          transform: [{ rotate: `${tilt}deg` }],
          backgroundColor: PP_COLORS.parchmentSoft,
          paddingTop: padding,
          paddingHorizontal: padding,
          paddingBottom: captionPadding,
          borderRadius: 3,
          borderWidth: 0.5,
          borderColor: PP_COLORS.birchBorder,
          width,
        },
        polaroidShadow,
        style,
      ]}
    >
      <View
        style={{
          width: photoSize,
          height: photoHeight,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "#8a9b7e",
        }}
      >
        {source ? (
          <Image
            source={source}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: tint,
            }}
          />
        )}
      </View>
      {caption ? <View style={{ marginTop: 14 }}>{caption}</View> : null}
    </View>
  )
}
