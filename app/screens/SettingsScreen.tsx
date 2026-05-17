// PlantPal Settings — parchment-themed grouped lists.
// Subscription card up top (no login/profile), then Identification, Capture,
// Journal, and About sections. Toggle / detail / chevron rows.

import { useState } from "react"
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import * as Application from "expo-application"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import {
  IconChevronLeft,
  IconChevronRight,
  IconStar,
} from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { BoilerplateConfig } from "@/config/boilerplate.config"
import { usePurchases } from "@/context/PurchasesContext"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

export function SettingsScreen({ navigation }: MainStackScreenProps<"Settings">) {
  const { isPremium, restorePurchases } = usePurchases()
  const insets = useSafeAreaInsets()

  // Local toggles — wired up to in-memory state for the design. The boilerplate
  // didn't have a persisted settings store, so we keep these self-contained.
  const [detectMushrooms, setDetectMushrooms] = useState(true)
  const [toxicWarnings, setToxicWarnings] = useState(true)
  const [savePhotos, setSavePhotos] = useState(true)
  const [embedExif, setEmbedExif] = useState(false)
  const [shutterSound, setShutterSound] = useState(true)

  const handleRestore = async () => {
    const success = await restorePurchases()
    Alert.alert(
      success ? "Restored" : "Nothing to restore",
      success
        ? "Your subscription has been restored."
        : "No active subscription found for this Apple ID.",
    )
  }

  const handleManageSubscription = () => {
    Linking.openURL("https://apps.apple.com/account/subscriptions")
  }

  const appVersion = Application.nativeApplicationVersion ?? "1.4.0"
  const buildVersion = Application.nativeBuildVersion ?? "218"

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
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconBtn}
            activeOpacity={0.7}
            hitSlop={8}
          >
            <IconChevronLeft size={20} color={PP_COLORS.charcoal} strokeWidth={1.6} />
          </TouchableOpacity>
          <Text style={styles.preferences}>preferences</Text>
          <View style={{ width: 36 }} />
        </View>

        <Text style={styles.title}>Settings</Text>

        {/* Subscription */}
        <SectionHeader>Subscription</SectionHeader>
        <View style={styles.subCard}>
          <View style={styles.subGlow} />
          <View style={styles.subEyebrowRow}>
            <IconStar size={13} color={PP_COLORS.pollen} />
            <Text style={styles.subEyebrow}>{isPremium ? "PREMIUM" : "FREE PLAN"}</Text>
          </View>
          <Text style={styles.subTitle}>PlantPal Premium</Text>
          <Text style={styles.subDesc}>
            Unlimited identifications, deeper field notes, offline mode, and journal export.
            £24.99/year or £4.99/month.
          </Text>
          <View style={styles.subButtonRow}>
            {isPremium ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleManageSubscription}
                style={styles.subPrimaryBtn}
              >
                <Text style={styles.subPrimaryText}>Manage subscription</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.getParent()?.navigate("Paywall" as never)}
                style={styles.subPrimaryBtn}
              >
                <Text style={styles.subPrimaryText}>Start 7-day free trial</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity activeOpacity={0.85} style={styles.subSecondaryBtn}>
              <Text style={styles.subSecondaryText}>Compare plans</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleRestore} activeOpacity={0.7} hitSlop={8}>
            <Text style={styles.restoreLink}>Restore purchase</Text>
          </TouchableOpacity>
        </View>

        {/* Identification */}
        <SectionHeader>Identification</SectionHeader>
        <ListGroup>
          <Row label="Region" detail="United Kingdom" />
          <Row
            label="Detect mushrooms"
            toggle
            on={detectMushrooms}
            onToggle={setDetectMushrooms}
          />
          <Row
            label="Show toxic warnings"
            toggle
            on={toxicWarnings}
            onToggle={setToxicWarnings}
          />
          <Row label="Confidence threshold" detail="Medium" last />
        </ListGroup>

        {/* Capture */}
        <SectionHeader>Capture</SectionHeader>
        <ListGroup>
          <Row
            label="Save originals to Photos"
            toggle
            on={savePhotos}
            onToggle={setSavePhotos}
          />
          <Row
            label="Embed location in EXIF"
            toggle
            on={embedExif}
            onToggle={setEmbedExif}
          />
          <Row
            label="Sound on shutter"
            toggle
            on={shutterSound}
            onToggle={setShutterSound}
            last
          />
        </ListGroup>

        {/* Journal */}
        <SectionHeader>Journal</SectionHeader>
        <ListGroup>
          <Row label="Sort by" detail="Newest first" />
          <Row label="Default layout" detail="Polaroid grid" />
          <Row label="Export journal" detail="PDF, JSON" last muted />
        </ListGroup>

        {/* About */}
        <SectionHeader>About</SectionHeader>
        <ListGroup>
          <Row
            label="Send feedback"
            onPress={() =>
              Linking.openURL(`mailto:${BoilerplateConfig.app.supportEmail}`)
            }
          />
          <Row
            label="Privacy & data"
            onPress={() => navigation.navigate("Legal", { type: "privacy" })}
          />
          <Row label="Acknowledgements" />
          <Row
            label="Version"
            detail={`${appVersion} (build ${buildVersion})`}
            chevron={false}
            last
          />
        </ListGroup>

        <Text style={styles.footer}>Made with curiosity. London, 2026.</Text>
      </ScrollView>
    </Screen>
  )
}

// ─── sub-components ─────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: string }) {
  return <Text style={styles.sectionHeader}>{children}</Text>
}

function ListGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.listGroup}>{children}</View>
}

interface RowProps {
  label: string
  detail?: string
  toggle?: boolean
  on?: boolean
  onToggle?: (value: boolean) => void
  chevron?: boolean
  last?: boolean
  muted?: boolean
  onPress?: () => void
}

function Row({
  label,
  detail,
  toggle,
  on,
  onToggle,
  chevron = true,
  last,
  muted,
  onPress,
}: RowProps) {
  const isInteractive = !!(onPress || toggle)

  const content = (
    <View
      style={[
        styles.row,
        !last && {
          borderBottomWidth: 0.5,
          borderBottomColor: PP_COLORS.birchHairline,
        },
      ]}
    >
      <Text
        style={[
          styles.rowLabel,
          muted && { color: PP_COLORS.stone },
        ]}
      >
        {label}
      </Text>
      {detail ? (
        <Text style={[styles.rowDetail, !chevron && { marginRight: 0 }]}>
          {detail}
        </Text>
      ) : null}
      {toggle ? (
        <PPToggle on={!!on} onChange={onToggle ?? (() => {})} />
      ) : null}
      {chevron && !toggle ? (
        <IconChevronRight size={12} color="rgba(60,60,67,0.35)" strokeWidth={1.6} />
      ) : null}
    </View>
  )

  if (isInteractive) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          if (toggle && onToggle) onToggle(!on)
          else if (onPress) onPress()
        }}
      >
        {content}
      </TouchableOpacity>
    )
  }
  return content
}

function PPToggle({
  on,
  onChange,
}: {
  on: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onChange(!on)}
      style={[
        styles.toggleTrack,
        { backgroundColor: on ? PP_COLORS.tealDeep : "rgba(140,110,70,0.25)" },
      ]}
    >
      <View
        style={[
          styles.toggleThumb,
          { left: on ? 20 : 2 },
        ]}
      />
    </TouchableOpacity>
  )
}

// ─── styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  preferences: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.6,
  },
  title: {
    paddingHorizontal: 24,
    paddingBottom: 6,
    fontFamily: PP_FONT.displayRegular,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -0.6,
    color: PP_COLORS.ink,
  },
  sectionHeader: {
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.3,
  },
  listGroup: {
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: PP_COLORS.parchmentSoft,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorder,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  rowLabel: {
    flex: 1,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 14.5,
    color: PP_COLORS.ink,
  },
  rowDetail: {
    fontFamily: PP_FONT.uiRegular,
    fontSize: 13,
    color: PP_COLORS.stone,
    marginRight: 6,
  },
  // Subscription card
  subCard: {
    marginHorizontal: 18,
    marginBottom: 22,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: PP_COLORS.tealDeep,
    overflow: "hidden",
    position: "relative",
  },
  subGlow: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(168,207,197,0.18)",
  },
  subEyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  subEyebrow: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11,
    color: "rgba(245,237,223,0.85)",
    letterSpacing: 0.5,
    marginLeft: 8,
  },
  subTitle: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.4,
    color: PP_COLORS.parchment,
  },
  subDesc: {
    marginTop: 6,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(245,237,223,0.82)",
    maxWidth: 260,
  },
  subButtonRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
  },
  subPrimaryBtn: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: PP_COLORS.parchment,
    alignItems: "center",
    marginRight: 8,
  },
  subPrimaryText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13.5,
    color: PP_COLORS.tealDeep,
    letterSpacing: 0.1,
  },
  subSecondaryBtn: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(245,237,223,0.4)",
    alignItems: "center",
  },
  subSecondaryText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13,
    color: "rgba(245,237,223,0.9)",
    letterSpacing: 0.1,
  },
  restoreLink: {
    marginTop: 14,
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12,
    color: "rgba(245,237,223,0.65)",
    letterSpacing: 0.1,
    textDecorationLine: "underline",
  },
  // Toggle
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
  },
  toggleThumb: {
    position: "absolute",
    top: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: PP_COLORS.parchmentSoft,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 50,
    textAlign: "center",
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 12,
    color: PP_COLORS.stone,
  },
})
