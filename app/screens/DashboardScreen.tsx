// Dashboard / Field journal — the home screen of PlantPal.
// Greeting + stats + filter chips + a grid of saved finds (polaroid cards),
// plus a floating tab bar with a big primary camera button in the middle.

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

import { Screen } from "@/components/Screen"
import { TabBar } from "@/components/plantpal/TabBar"
import { Polaroid } from "@/components/plantpal/Polaroid"
import { IconSettings } from "@/components/plantpal/PPIcons"
import { Text } from "@/components/Text"
import { useJournal } from "@/context/JournalContext"
import type { PlantFind } from "@/models/types"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"
import { format } from "date-fns"

// Deterministic tilt + tint from a string hash so cards look hand-placed
// but stay stable across re-renders.
function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const TINTS = [
  "rgba(189,132,178,0.55)",
  "rgba(120,148,86,0.55)",
  "rgba(238,244,228,0.7)",
  "rgba(232,165,71,0.55)",
  "rgba(110,118,180,0.55)",
  "rgba(194,98,90,0.55)",
  "rgba(31,78,74,0.35)",
  "rgba(160,123,82,0.45)",
]

function cardProps(find: PlantFind) {
  const h = hashString(find.id)
  const tilt = ((h % 30) - 15) / 10 // –1.5 … +1.5
  const tint = TINTS[h % TINTS.length]
  return { tilt, tint }
}

export function DashboardScreen({ navigation }: MainStackScreenProps<"Home">) {
  const { finds, totalFinds, totalSpecies, thisWeekCount } = useJournal()

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
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good {greeting()}</Text>
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
          <Stat number={String(totalFinds)} label="finds" />
          <Stat number={String(totalSpecies)} label="species" border />
          <Stat number={String(thisWeekCount)} label="this week" border />
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

        {finds.length === 0 ? (
          <EmptyJournal onCapture={() => navigation.navigate("Camera")} />
        ) : (
          <View style={styles.grid}>
            {finds.map((f) => (
              <View key={f.id} style={styles.gridCell}>
                <FindCard find={f} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TabBar active="Journal" navigation={navigation} />
    </Screen>
  )
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "morning"
  if (h < 17) return "afternoon"
  return "evening"
}

// ─── sub-components ──────────────────────────────────────────────────────────

function EmptyJournal({ onCapture }: { onCapture: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyTitle}>Nothing here yet</Text>
      <Text style={styles.emptySub}>
        Tap the camera button below to photograph a plant and add your first find.
      </Text>
      <TouchableOpacity activeOpacity={0.85} style={styles.emptyBtn} onPress={onCapture}>
        <Text style={styles.emptyBtnText}>Identify a plant</Text>
      </TouchableOpacity>
    </View>
  )
}

function Stat({ number, label, border }: { number: string; label: string; border?: boolean }) {
  return (
    <View style={[styles.statCell, border && styles.statBorder]}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

function Chip({ active, color, children }: { active?: boolean; color?: string; children: string }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chip,
        active ? { backgroundColor: PP_COLORS.tealDeep, borderColor: PP_COLORS.tealDeep } : null,
      ]}
    >
      {!active && color ? <View style={[styles.chipDot, { backgroundColor: color }]} /> : null}
      <Text style={[styles.chipText, active ? { color: PP_COLORS.parchment } : null]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

function FindCard({ find }: { find: PlantFind }) {
  const { tilt, tint } = cardProps(find)
  const dateLabel = format(new Date(find.savedAt), "MMM d").toUpperCase()

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 4 }}>
      <Polaroid
        tilt={tilt}
        tint={tint}
        source={find.imageUri ? { uri: find.imageUri } : undefined}
        width={160}
        photoAspect={160 / 130}
        padding={8}
        captionPadding={26}
        caption={
          <View style={{ paddingHorizontal: 4 }}>
            <Text style={styles.findName} numberOfLines={2}>{find.commonName}</Text>
            <Text style={styles.findLatin} numberOfLines={1}>{find.scientificName}</Text>
            <Text style={styles.findDate}>{dateLabel}</Text>
          </View>
        }
      />
    </View>
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
  chipDot: { width: 7, height: 7, borderRadius: 4 },
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
  emptyWrap: {
    paddingHorizontal: 32,
    paddingTop: 16,
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: PP_FONT.serifMedium,
    fontSize: 22,
    color: PP_COLORS.ink,
    letterSpacing: -0.2,
  },
  emptySub: {
    marginTop: 8,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 14,
    lineHeight: 20,
    color: PP_COLORS.stone,
    textAlign: "center",
  },
  emptyBtn: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: PP_COLORS.tealDeep,
  },
  emptyBtnText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14,
    color: PP_COLORS.parchment,
    letterSpacing: 0.1,
  },
})
