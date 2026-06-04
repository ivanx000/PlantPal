// PlantPal Settings — parchment-themed grouped lists.
// Identification, Capture, Journal, and About sections.

import {
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
} from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { BoilerplateConfig } from "@/config/boilerplate.config"
import { useAppSettings } from "@/context/SettingsContext"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

export function SettingsScreen({ navigation }: MainStackScreenProps<"Settings">) {
  const { settings, updateSetting } = useAppSettings()
  const insets = useSafeAreaInsets()

  const appVersion = Application.nativeApplicationVersion ?? "1.0.0"
  const buildVersion = Application.nativeBuildVersion ?? "1"

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

        {/* Identification */}
        <SectionHeader>Identification</SectionHeader>
        <ListGroup>
          <Row label="Region" detail="United Kingdom" />
          <Row
            label="Detect mushrooms"
            toggle
            on={settings.detectMushrooms}
            onToggle={(v) => updateSetting("detectMushrooms", v)}
          />
          <Row
            label="Show toxic warnings"
            toggle
            on={settings.toxicWarnings}
            onToggle={(v) => updateSetting("toxicWarnings", v)}
          />
          <Row label="Confidence threshold" detail="Medium" last />
        </ListGroup>

        {/* Capture */}
        <SectionHeader>Capture</SectionHeader>
        <ListGroup>
          <Row
            label="Save originals to Photos"
            toggle
            on={settings.savePhotos}
            onToggle={(v) => updateSetting("savePhotos", v)}
          />
          <Row
            label="Embed location in EXIF"
            toggle
            on={settings.embedExif}
            onToggle={(v) => updateSetting("embedExif", v)}
          />
          <Row
            label="Sound on shutter"
            toggle
            on={settings.shutterSound}
            onToggle={(v) => updateSetting("shutterSound", v)}
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
            onPress={() => Linking.openURL(`mailto:${BoilerplateConfig.app.supportEmail}`)}
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

function Row({ label, detail, toggle, on, onToggle, chevron = true, last, muted, onPress }: RowProps) {
  const isInteractive = !!(onPress || toggle)

  const content = (
    <View
      style={[
        styles.row,
        !last && { borderBottomWidth: 0.5, borderBottomColor: PP_COLORS.birchHairline },
      ]}
    >
      <Text style={[styles.rowLabel, muted && { color: PP_COLORS.stone }]}>{label}</Text>
      {detail ? (
        <Text style={[styles.rowDetail, !chevron && { marginRight: 0 }]}>{detail}</Text>
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

function PPToggle({ on, onChange }: { on: boolean; onChange: (value: boolean) => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onChange(!on)}
      style={[
        styles.toggleTrack,
        { backgroundColor: on ? PP_COLORS.tealDeep : "rgba(140,110,70,0.25)" },
      ]}
    >
      <View style={[styles.toggleThumb, { left: on ? 20 : 2 }]} />
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
