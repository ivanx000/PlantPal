// Dashboard / Field journal — the home screen of PlantPal.
// Greeting + stats + filter chips + a grid of saved finds (polaroid cards),
// plus a floating tab bar with a big primary camera button in the middle.

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Polaroid } from "@/components/plantpal/Polaroid"
import {
  IconBookmark,
  IconCamera,
  IconLeaf,
  IconMap,
  IconSettings,
  IconUser,
} from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT, softShadow } from "@/theme/plantpal"

interface Find {
  name: string
  latin: string
  date: string
  tilt: number
  tint: string
}

const FINDS: Find[] = [
  { name: "Common foxglove", latin: "Digitalis purpurea", date: "May 11", tilt: -1.4, tint: "rgba(189,132,178,0.55)" },
  { name: "English oak", latin: "Quercus robur", date: "May 9", tilt: 1.6, tint: "rgba(120,148,86,0.55)" },
  { name: "Wild garlic", latin: "Allium ursinum", date: "May 6", tilt: -0.8, tint: "rgba(238,244,228,0.7)" },
  { name: "Chanterelle", latin: "Cantharellus cibarius", date: "Apr 29", tilt: 1.2, tint: "rgba(232,165,71,0.55)" },
  { name: "Bluebell", latin: "Hyacinthoides non-scripta", date: "Apr 24", tilt: -1.8, tint: "rgba(110,118,180,0.55)" },
  { name: "Rowan", latin: "Sorbus aucuparia", date: "Apr 18", tilt: 0.7, tint: "rgba(194,98,90,0.55)" },
]

export function DashboardScreen({ navigation }: MainStackScreenProps<"Home">) {
  const insets = useSafeAreaInsets()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} systemBarStyle="dark" backgroundColor={PP_COLORS.parchment}>
      <ScrollView
        style={{ flex: 1, backgroundColor: PP_COLORS.parchment }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header — greeting + settings */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon, Maya</Text>
            <Text style={styles.title}>Field journal</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            activeOpacity={0.7}
            hitSlop={8}
            style={styles.headerBtn}
          >
            <IconSettings size={18} color={PP_COLORS.charcoal} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          <Stat number="47" label="finds" />
          <Stat number="23" label="species" border />
          <Stat number="6" label="this week" border />
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          <Chip active>All</Chip>
          <Chip color={PP_COLORS.iris}>Flowers</Chip>
          <Chip color={PP_COLORS.walnut}>Trees</Chip>
          <Chip color={PP_COLORS.pollen}>Fungi</Chip>
          <Chip color={PP_COLORS.berry}>Berries</Chip>
        </ScrollView>

        {/* Section heading */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>this month</Text>
          <View style={styles.sectionRule} />
        </View>

        {/* Grid of finds — 2 cols */}
        <View style={styles.grid}>
          {FINDS.map((f) => (
            <View key={f.name} style={styles.gridCell}>
              <FindCard {...f} />
            </View>
          ))}
        </View>

        {/* See earlier */}
        <View style={{ paddingHorizontal: 24, paddingTop: 8, alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeEarlier}>See earlier entries →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating tab bar */}
      <View
        style={[
          styles.tabBarWrap,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.tabBar}>
          <TabButton label="Journal" active>
            <IconBookmark size={20} color={PP_COLORS.tealDeep} strokeWidth={1.6} />
          </TabButton>
          <TabButton label="Explore">
            <IconMap size={20} color={PP_COLORS.stone} strokeWidth={1.6} />
          </TabButton>
          {/* Primary capture button */}
          <View style={styles.captureWrap}>
            <TouchableOpacity activeOpacity={0.8} style={styles.captureBtn}>
              <IconCamera size={26} color={PP_COLORS.parchment} strokeWidth={1.6} />
            </TouchableOpacity>
          </View>
          <TabButton label="Discover">
            <IconLeaf size={20} color={PP_COLORS.stone} strokeWidth={1.6} />
          </TabButton>
          <TabButton label="Profile">
            <IconUser size={20} color={PP_COLORS.stone} strokeWidth={1.6} />
          </TabButton>
        </View>
      </View>
    </Screen>
  )
}

// ─── sub-components ──────────────────────────────────────────────────────────

function Stat({ number, label, border }: { number: string; label: string; border?: boolean }) {
  return (
    <View style={[styles.statCell, border && styles.statBorder]}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

function Chip({
  active,
  color,
  children,
}: {
  active?: boolean
  color?: string
  children: string
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chip,
        active
          ? { backgroundColor: PP_COLORS.tealDeep, borderColor: PP_COLORS.tealDeep }
          : null,
      ]}
    >
      {!active && color ? <View style={[styles.chipDot, { backgroundColor: color }]} /> : null}
      <Text style={[styles.chipText, active ? { color: PP_COLORS.parchment } : null]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

function FindCard({ name, latin, date, tilt, tint }: Find) {
  return (
    <View style={{ alignItems: "center", paddingHorizontal: 4 }}>
      <Polaroid
        tilt={tilt}
        tint={tint}
        width={160}
        photoAspect={160 / 130}
        padding={8}
        captionPadding={26}
        caption={
          <View style={{ paddingHorizontal: 4 }}>
            <Text style={styles.findName} numberOfLines={2}>
              {name}
            </Text>
            <Text style={styles.findLatin} numberOfLines={1}>
              {latin}
            </Text>
            <Text style={styles.findDate}>{date.toUpperCase()}</Text>
          </View>
        }
      />
    </View>
  )
}

function TabButton({
  active,
  label,
  children,
}: {
  active?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.tabBtn}>
      {children}
      <Text
        style={[
          styles.tabLabel,
          { color: active ? PP_COLORS.tealDeep : PP_COLORS.stone },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

// ─── styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 4,
  },
  greeting: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.3,
  },
  title: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -0.6,
    color: PP_COLORS.ink,
    marginTop: 4,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  statsStrip: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 18,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchSoft,
    borderRadius: 12,
    backgroundColor: "rgba(234,217,189,0.35)",
    overflow: "hidden",
  },
  statCell: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  statBorder: {
    borderLeftWidth: 0.5,
    borderLeftColor: PP_COLORS.birchSoft,
  },
  statNumber: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 28,
    lineHeight: 30,
    color: PP_COLORS.ink,
    letterSpacing: -0.4,
  },
  statLabel: {
    marginTop: 2,
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11,
    color: PP_COLORS.stone,
    letterSpacing: 0.4,
  },
  chipRow: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 6,
  },
  chip: {
    flexShrink: 0,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 6,
  },
  chipDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  chipText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13,
    color: PP_COLORS.charcoal,
    letterSpacing: 0.1,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  sectionLabel: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.4,
  },
  sectionRule: {
    flex: 1,
    height: 0.5,
    backgroundColor: PP_COLORS.birch,
    opacity: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  gridCell: {
    width: "50%",
    paddingVertical: 12,
  },
  findName: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 17,
    lineHeight: 19,
    color: PP_COLORS.ink,
    letterSpacing: -0.2,
    textAlign: "center",
    marginTop: 8,
  },
  findLatin: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 11,
    lineHeight: 14,
    color: PP_COLORS.stone,
    textAlign: "center",
    marginTop: 2,
  },
  findDate: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 10,
    color: PP_COLORS.stone,
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 4,
  },
  seeEarlier: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.2,
  },
  tabBarWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PP_COLORS.parchmentSoft,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
    ...softShadow,
  },
  tabBtn: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  tabLabel: {
    fontFamily: PP_FONT.uiRegular,
    fontSize: 9.5,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  captureWrap: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  captureBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PP_COLORS.tealDeep,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
    borderWidth: 4,
    borderColor: PP_COLORS.parchment,
    shadowColor: PP_COLORS.tealDeep,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
})
