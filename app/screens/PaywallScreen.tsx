// PlantPal Paywall — "Wander a little further."
// Typographic hero, a teaser strip of polaroids ("your journal, without limits"),
// a feature list, Monthly / Yearly plan picker, and a primary CTA.

import { useMemo, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import type { PurchasesPackage } from "react-native-purchases"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Polaroid } from "@/components/plantpal/Polaroid"
import {
  IconBook,
  IconCheck,
  IconClose,
  IconDownload,
  IconExport,
  IconHeart,
  IconLeaf,
  IconStar,
} from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { BoilerplateConfig } from "@/config/boilerplate.config"
import { usePurchases } from "@/context/PurchasesContext"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

const TEASER_POLAROIDS = [
  { tilt: -7, tint: "rgba(189,132,178,0.55)", caption: "FOXGLOVE" },
  { tilt: 3, tint: "rgba(232,165,71,0.55)", caption: "CHANTERELLE" },
  { tilt: -2, tint: "rgba(110,118,180,0.55)", caption: "BLUEBELL" },
  { tilt: 6, tint: "rgba(120,148,86,0.55)", caption: "ENGLISH OAK" },
]

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  leaf: IconLeaf,
  book: IconBook,
  download: IconDownload,
  export: IconExport,
  heart: IconHeart,
}

type PlanKey = "yearly" | "monthly"

export function PaywallScreen({ navigation }: AppStackScreenProps<"Paywall">) {
  const { offerings, purchasePackage, restorePurchases, isLoading } = usePurchases()
  const insets = useSafeAreaInsets()

  const packages = offerings?.current?.availablePackages ?? []
  const annual = packages.find((p) => (p.packageType as string) === "ANNUAL")
  const monthly = packages.find((p) => (p.packageType as string) === "MONTHLY")

  const [selected, setSelected] = useState<PlanKey>("yearly")
  const [purchasing, setPurchasing] = useState(false)

  const selectedPackage = useMemo<PurchasesPackage | undefined>(
    () => (selected === "yearly" ? annual : monthly),
    [selected, annual, monthly],
  )

  const handlePurchase = async () => {
    if (!selectedPackage) {
      Alert.alert(
        "Coming soon",
        "Subscription packages aren't configured yet. Connect RevenueCat to enable.",
      )
      return
    }
    setPurchasing(true)
    const success = await purchasePackage(selectedPackage)
    setPurchasing(false)
    if (success) {
      navigation.reset({ index: 0, routes: [{ name: "Main" }] })
    } else {
      Alert.alert("Purchase failed", "Please try again or restore a previous purchase.")
    }
  }

  const handleRestore = async () => {
    const success = await restorePurchases()
    if (success) {
      navigation.reset({ index: 0, routes: [{ name: "Main" }] })
    } else {
      Alert.alert("No purchases found", "No active subscription was found for this Apple ID.")
    }
  }

  if (isLoading) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top", "bottom"]}
        systemBarStyle="dark"
        backgroundColor={PP_COLORS.parchment}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={PP_COLORS.tealDeep} />
        </View>
      </Screen>
    )
  }

  const yearlyPrice = annual?.product.priceString
    ? `${annual.product.priceString} / year`
    : BoilerplateConfig.paywall.yearlyPrice
  const monthlyPrice = monthly?.product.priceString
    ? `${monthly.product.priceString} / month`
    : BoilerplateConfig.paywall.monthlyPrice

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      systemBarStyle="dark"
      backgroundColor={PP_COLORS.parchment}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: PP_COLORS.parchment }}
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.reset({ index: 0, routes: [{ name: "Main" }] })
            }
            style={styles.iconBtn}
            activeOpacity={0.7}
            hitSlop={8}
          >
            <IconClose size={18} color={PP_COLORS.charcoal} strokeWidth={1.7} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRestore} activeOpacity={0.7} hitSlop={8}>
            <Text style={styles.restore}>Restore</Text>
          </TouchableOpacity>
        </View>

        {/* Hero — eyebrow + headline + subtitle */}
        <View style={styles.hero}>
          <View style={styles.eyebrowChip}>
            <IconStar size={10} color={PP_COLORS.pollen} />
            <Text style={styles.eyebrowText}>{BoilerplateConfig.paywall.eyebrow}</Text>
          </View>
          <Text style={styles.heroTitle}>{BoilerplateConfig.paywall.headline}</Text>
          <Text style={styles.heroSub}>{BoilerplateConfig.paywall.subtitle}</Text>
        </View>

        {/* Teaser polaroid strip */}
        <View style={styles.teaserStrip}>
          <View style={styles.teaserRow}>
            {TEASER_POLAROIDS.map((p, i) => (
              <View key={p.caption} style={{ marginHorizontal: -10, zIndex: i + 1 }}>
                <Polaroid
                  tilt={p.tilt}
                  tint={p.tint}
                  width={78}
                  photoAspect={1}
                  padding={6}
                  captionPadding={14}
                  caption={
                    <Text style={styles.teaserCaption} numberOfLines={1}>
                      {p.caption}
                    </Text>
                  }
                />
              </View>
            ))}
          </View>
          <Text style={styles.teaserLine}>your journal, without limits</Text>
        </View>

        {/* Feature list */}
        <View style={styles.features}>
          {BoilerplateConfig.paywall.features.map((f, idx) => {
            const Icon = ICON_MAP[f.icon] ?? IconLeaf
            const isLast = idx === BoilerplateConfig.paywall.features.length - 1
            return (
              <View
                key={f.title}
                style={[
                  styles.featureRow,
                  !isLast && {
                    borderBottomWidth: 0.5,
                    borderBottomColor: PP_COLORS.birchHairline,
                  },
                ]}
              >
                <View style={styles.featureIcon}>
                  <Icon size={18} color={PP_COLORS.tealDeep} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDesc}>{f.description}</Text>
                </View>
              </View>
            )
          })}
        </View>

        {/* Plan picker */}
        <View style={styles.plans}>
          <PlanOption
            label="Yearly"
            price={yearlyPrice}
            sub="That's £2.08 a month"
            badge="Save 58%"
            selected={selected === "yearly"}
            onPress={() => setSelected("yearly")}
          />
          <PlanOption
            label="Monthly"
            price={monthlyPrice}
            sub="Cancel anytime"
            selected={selected === "monthly"}
            onPress={() => setSelected("monthly")}
          />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.ctaBar,
          { paddingBottom: Math.max(insets.bottom, 18) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.cta, purchasing && { opacity: 0.6 }]}
          onPress={handlePurchase}
          disabled={purchasing}
        >
          {purchasing ? (
            <ActivityIndicator color={PP_COLORS.parchment} />
          ) : (
            <Text style={styles.ctaText}>{BoilerplateConfig.paywall.trial}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.legal}>{BoilerplateConfig.paywall.legal}</Text>

        {/* Dev-only escape hatch — kept as a safety net if RevenueCat is
            mis-configured or the Test Store key fails to load. Stripped from
            release builds. */}
        {__DEV__ ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: "Main" }] })}
            hitSlop={8}
            style={styles.devSkip}
          >
            <Text style={styles.devSkipText}>Skip for now (dev only)</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Screen>
  )
}

function PlanOption({
  label,
  price,
  sub,
  badge,
  selected,
  onPress,
}: {
  label: string
  price: string
  sub: string
  badge?: string
  selected: boolean
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.plan,
        selected ? styles.planSelected : styles.planUnselected,
      ]}
    >
      <View
        style={[
          styles.radio,
          selected ? styles.radioSelected : styles.radioUnselected,
        ]}
      >
        {selected ? <IconCheck size={12} color={PP_COLORS.parchment} strokeWidth={3} /> : null}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.planLabel}>{label}</Text>
        <Text style={styles.planSub}>{sub}</Text>
      </View>
      <Text style={styles.planPrice}>{price}</Text>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge.toUpperCase()}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  restore: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.1,
    textDecorationLine: "underline",
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  hero: { paddingHorizontal: 28, paddingTop: 20 },
  eyebrowChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(31,78,74,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(31,78,74,0.18)",
  },
  eyebrowText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11,
    color: PP_COLORS.tealDeep,
    letterSpacing: 0.4,
    marginLeft: 4,
  },
  heroTitle: {
    marginTop: 16,
    fontFamily: PP_FONT.displayRegular,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.9,
    color: PP_COLORS.ink,
  },
  heroSub: {
    marginTop: 14,
    fontFamily: PP_FONT.serifRegular,
    fontSize: 16,
    lineHeight: 24,
    color: PP_COLORS.charcoal,
    maxWidth: 320,
  },
  teaserStrip: {
    marginTop: 26,
    paddingVertical: 14,
    backgroundColor: "rgba(234,217,189,0.4)",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: PP_COLORS.birchSoft,
  },
  teaserRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  teaserCaption: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 7.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.6,
    textAlign: "center",
  },
  teaserLine: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 12.5,
    color: PP_COLORS.stone,
  },
  features: { paddingHorizontal: 28, paddingTop: 24 },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 12,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: PP_COLORS.paleTeal,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  featureTitle: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14.5,
    color: PP_COLORS.ink,
    letterSpacing: 0.1,
  },
  featureDesc: {
    marginTop: 2,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 12.5,
    lineHeight: 17,
    color: PP_COLORS.charcoal,
  },
  plans: {
    paddingHorizontal: 18,
    paddingTop: 12,
    gap: 8,
  },
  plan: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 8,
  },
  planSelected: {
    backgroundColor: PP_COLORS.parchmentSoft,
    borderWidth: 1.5,
    borderColor: PP_COLORS.tealDeep,
  },
  planUnselected: {
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  radioSelected: {
    borderWidth: 1.5,
    borderColor: PP_COLORS.tealDeep,
    backgroundColor: PP_COLORS.tealDeep,
  },
  radioUnselected: {
    borderWidth: 1,
    borderColor: "rgba(140,110,70,0.4)",
  },
  planLabel: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 18,
    lineHeight: 20,
    color: PP_COLORS.ink,
    letterSpacing: -0.3,
  },
  planSub: {
    marginTop: 2,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 12.5,
    color: PP_COLORS.stone,
  },
  planPrice: {
    textAlign: "right",
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14,
    color: PP_COLORS.ink,
    marginLeft: 8,
  },
  badge: {
    position: "absolute",
    top: -10,
    right: 14,
    backgroundColor: PP_COLORS.pollen,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 10.5,
    color: "#5C3F10",
    letterSpacing: 0.4,
  },
  ctaBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingTop: 14,
    backgroundColor: PP_COLORS.parchment,
    borderTopWidth: 0.5,
    borderTopColor: PP_COLORS.birchSoft,
  },
  cta: {
    height: 54,
    borderRadius: 14,
    backgroundColor: PP_COLORS.tealDeep,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PP_COLORS.tealDeep,
    shadowOpacity: 0.55,
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
  legal: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: PP_FONT.uiRegular,
    fontSize: 11.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.1,
  },
  devSkip: {
    marginTop: 8,
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  devSkipText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.3,
    textDecorationLine: "underline",
    textDecorationColor: "rgba(138,130,120,0.5)",
  },
})
