// PlantPal Onboarding — three slides themed in the field-journal aesthetic.
// Each slide uses the polaroid motif and the PlantPal type pairing
// (Instrument Serif headline + Fraunces italic + Inter body).

import { useState } from "react"
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import * as Notifications from "expo-notifications"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Polaroid } from "@/components/plantpal/Polaroid"
import { IconChevronLeft } from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { BoilerplateConfig } from "@/config/boilerplate.config"
import { useAppState } from "@/context/AppStateContext"
import { usePurchases } from "@/context/PurchasesContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

// Polaroid-style visual per slide — replaces the missing boilerplate images.
const SLIDE_VISUALS = [
  {
    tilt: -3,
    tint: "rgba(189,132,178,0.55)",
    caption: "FOXGLOVE · MAY 11",
  },
  {
    tilt: 2,
    tint: "rgba(120,148,86,0.55)",
    caption: "ENGLISH OAK · MAY 9",
  },
  {
    tilt: -2,
    tint: "rgba(232,165,71,0.55)",
    caption: "CHANTERELLE · APR 29",
  },
]

export function OnboardingScreen({ navigation }: AppStackScreenProps<"Onboarding">) {
  const { setOnboardingComplete } = useAppState()
  const { isPremium } = usePurchases()
  const insets = useSafeAreaInsets()
  const [step, setStep] = useState(0)
  const [requestingPermission, setRequestingPermission] = useState(false)

  const slides = BoilerplateConfig.onboarding.slides

  const finish = () => {
    setOnboardingComplete()
    if (isPremium) {
      navigation.reset({ index: 0, routes: [{ name: "Main" }] })
    } else {
      navigation.navigate("Paywall")
    }
  }

  const handleNext = async () => {
    if (step < slides.length - 1) {
      setStep(step + 1)
      return
    }
    if (BoilerplateConfig.onboarding.requestNotifications) {
      await requestNotifications()
    }
    finish()
  }

  const requestNotifications = async () => {
    if (requestingPermission) return
    setRequestingPermission(true)
    try {
      // `granted` is on PermissionResponse at runtime, but the shipped types
      // for expo-notifications are incomplete — cast through any.
      const existing = (await Notifications.getPermissionsAsync()) as any
      if (!existing?.granted) {
        await Notifications.requestPermissionsAsync()
      }
    } catch {
      // Permission denied or unsupported — not blocking
    } finally {
      setRequestingPermission(false)
    }
  }

  const isLastStep = step === slides.length - 1
  const current = slides[step]
  const visual = SLIDE_VISUALS[step] ?? SLIDE_VISUALS[0]

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      systemBarStyle="dark"
      backgroundColor={PP_COLORS.parchment}
      contentContainerStyle={{ flex: 1 }}
    >
      {/* Top bar — back chevron (only after slide 1) + skip on the right */}
      <View style={styles.topBar}>
        {step > 0 ? (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={styles.iconBtn}
            activeOpacity={0.7}
            hitSlop={8}
          >
            <IconChevronLeft size={20} color={PP_COLORS.charcoal} strokeWidth={1.6} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}
        <TouchableOpacity activeOpacity={0.7} onPress={finish} hitSlop={8}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero polaroid */}
        <View style={styles.polaroidWrap}>
          <Polaroid
            tilt={visual.tilt}
            tint={visual.tint}
            width={Math.min(286, SCREEN_WIDTH - 80)}
            photoAspect={262 / 296}
            caption={<Text style={styles.locStamp}>{visual.caption}</Text>}
          />
        </View>

        {/* Title + body */}
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>
            {step === 0 ? "Hello there," : step === 1 ? "Take it slowly,"  : "Almost ready,"}
          </Text>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.body}>{current.body}</Text>
        </View>
      </ScrollView>

      {/* Bottom controls */}
      <View
        style={[
          styles.bottom,
          { paddingBottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === step ? PP_COLORS.tealDeep : PP_COLORS.birch,
                  width: i === step ? 20 : 6,
                },
              ]}
            />
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          style={styles.cta}
          onPress={handleNext}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>
            {isLastStep && BoilerplateConfig.onboarding.requestNotifications
              ? "Enable notifications"
              : isLastStep
              ? "Open the journal"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  skipText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.2,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 4,
    paddingBottom: 24,
  },
  polaroidWrap: {
    alignItems: "center",
    paddingVertical: 20,
  },
  locStamp: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.4,
    textAlign: "center",
  },
  copy: {
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  eyebrow: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.3,
  },
  title: {
    marginTop: 6,
    fontFamily: PP_FONT.displayRegular,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -0.6,
    color: PP_COLORS.ink,
  },
  body: {
    marginTop: 12,
    fontFamily: PP_FONT.serifRegular,
    fontSize: 16,
    lineHeight: 24,
    color: PP_COLORS.charcoal,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: PP_COLORS.parchment,
    gap: 16,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  cta: {
    height: 54,
    borderRadius: 14,
    backgroundColor: PP_COLORS.tealDeep,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PP_COLORS.tealDeep,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  ctaText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 15.5,
    color: PP_COLORS.parchment,
    letterSpacing: 0.1,
  },
})
