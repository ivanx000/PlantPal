// Identification result — the emotional centre of PlantPal.
// Shows the captured photo as a Polaroid, the top plant ID result with
// confidence, a data row, tags, and a "Save to journal" CTA.

import { useState } from "react"
import { Alert, Image, ScrollView, Share, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Screen } from "@/components/Screen"
import {
  ConfidenceLeaf,
  IconBookmark,
  IconChevronDown,
  IconClose,
  IconMore,
  IconNote,
  IconShare,
} from "@/components/plantpal/PPIcons"
import { Text } from "@/components/Text"
import { useJournal } from "@/context/JournalContext"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"
import { format } from "date-fns"

function confidenceLevel(score: number): { label: string; leaves: 1 | 2 | 3 } {
  if (score >= 0.75) return { label: "High confidence", leaves: 3 }
  if (score >= 0.4) return { label: "Medium confidence", leaves: 2 }
  return { label: "Low confidence", leaves: 1 }
}

export function ResultScreen({ navigation, route }: MainStackScreenProps<"Result">) {
  const { imageUri, identifications } = route.params
  const insets = useSafeAreaInsets()
  const { addFind } = useJournal()
  const [saved, setSaved] = useState(false)

  const top = identifications[0]
  const { label: confidenceText, leaves } = confidenceLevel(top.score)
  const now = new Date()
  const timeLabel = format(now, "h:mm aa").toLowerCase()

  const handleSave = () => {
    if (saved) return
    addFind({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      commonName: top.commonName,
      scientificName: top.scientificName,
      family: top.family,
      confidence: top.score,
      imageUri,
      savedAt: now.toISOString(),
    })
    setSaved(true)
    Alert.alert("Saved!", `${top.commonName} has been added to your journal.`)
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I found a ${top.commonName} (${top.scientificName}) using PlantPal!`,
      })
    } catch {
      // user dismissed share sheet
    }
  }

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
        contentContainerStyle={{ paddingBottom: 180 }}
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
            <IconClose size={18} color={PP_COLORS.charcoal} strokeWidth={1.6} />
          </TouchableOpacity>
          <Text style={styles.spotted}>Spotted {timeLabel}</Text>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} hitSlop={8}>
            <IconMore size={20} color={PP_COLORS.charcoal} />
          </TouchableOpacity>
        </View>

        {/* Photo — real capture shown as Polaroid-style card */}
        <View style={styles.photoWrap}>
          <View style={styles.polaroidCard}>
            <Image
              source={{ uri: imageUri }}
              style={styles.photo}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Identification */}
        <View style={{ paddingHorizontal: 28 }}>
          <Text style={styles.commonName}>{top.commonName}</Text>
          <Text style={styles.binomial}>{top.scientificName}</Text>

          {/* Confidence ramp */}
          <View style={styles.confidenceRow}>
            <View style={styles.leaves}>
              <ConfidenceLeaf filled={leaves >= 1} color={PP_COLORS.sage} size={14} />
              <View style={{ width: 4 }} />
              <ConfidenceLeaf filled={leaves >= 2} color={PP_COLORS.eucalyptus} size={16} />
              <View style={{ width: 4 }} />
              <ConfidenceLeaf filled={leaves >= 3} color={PP_COLORS.tealDeep} size={18} />
            </View>
            <Text style={styles.confidenceLabel}>{confidenceText}</Text>
            <View style={{ flex: 1 }} />
            {identifications.length > 1 && (
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.notQuite}>Not quite?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Data row */}
          {top.family ? (
            <View style={styles.dataRow}>
              <DataCell label="Family" value={top.family} italic />
              <DataCell label="Score" value={`${Math.round(top.score * 100)}%`} border />
            </View>
          ) : null}

          {/* Other matches */}
          {identifications.length > 1 && (
            <View style={styles.otherMatchesWrap}>
              <Text style={styles.otherMatchesTitle}>Other possibilities</Text>
              {identifications.slice(1).map((id) => (
                <View key={id.scientificName} style={styles.otherMatchRow}>
                  <Text style={styles.otherMatchName}>{id.commonName}</Text>
                  <Text style={styles.otherMatchScore}>{Math.round(id.score * 100)}%</Text>
                </View>
              ))}
            </View>
          )}

          {/* About stub */}
          <View style={styles.aboutWrap}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutTitle}>About this plant</Text>
              <IconChevronDown size={16} color={PP_COLORS.stone} />
            </View>
            <Text style={styles.aboutBody}>
              {top.commonName} ({top.scientificName}) belongs to the {top.family || "plant"} family.
              Tap "Save to journal" to add your find and build your field notes over time.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.saveBtn, saved && styles.saveBtnDone]}
            onPress={handleSave}
          >
            <IconBookmark size={17} color={PP_COLORS.parchment} strokeWidth={1.7} />
            <Text style={styles.saveBtnText}>{saved ? "Saved to journal" : "Save to journal"}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.ghostBtn}>
            <IconNote size={18} color={PP_COLORS.tealDeep} strokeWidth={1.6} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.ghostBtn} onPress={handleShare}>
            <IconShare size={18} color={PP_COLORS.tealDeep} strokeWidth={1.6} />
          </TouchableOpacity>
        </View>
        {!saved && identifications.length > 1 && (
          <Text style={styles.matchesLine}>
            Not quite right?{" "}
            <Text style={styles.matchesLink}>See other matches</Text>
          </Text>
        )}
      </View>
    </Screen>
  )
}

function DataCell({
  label,
  value,
  italic,
  border,
}: {
  label: string
  value: string
  italic?: boolean
  border?: boolean
}) {
  return (
    <View style={[styles.dataCell, border && styles.dataCellBorder]}>
      <Text style={styles.dataLabel}>{label.toUpperCase()}</Text>
      <Text
        style={[
          styles.dataValue,
          italic ? { fontFamily: PP_FONT.serifItalic, fontStyle: "italic", fontSize: 15, fontWeight: "400" } : null,
        ]}
      >
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 18,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  spotted: {
    fontFamily: PP_FONT.uiRegular,
    fontSize: 12,
    color: PP_COLORS.stone,
    letterSpacing: 0.2,
  },
  photoWrap: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  polaroidCard: {
    backgroundColor: PP_COLORS.parchmentSoft,
    padding: 10,
    paddingBottom: 42,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "rgba(140,110,70,0.18)",
    shadowColor: "#3C2814",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
    transform: [{ rotate: "-1.2deg" }],
  },
  photo: {
    width: 260,
    height: 236,
    borderRadius: 2,
    backgroundColor: PP_COLORS.birch,
  },
  commonName: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.8,
    color: PP_COLORS.ink,
  },
  binomial: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 19,
    lineHeight: 24,
    color: PP_COLORS.charcoal,
    marginTop: 6,
  },
  confidenceRow: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  leaves: { flexDirection: "row", alignItems: "center" },
  confidenceLabel: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13,
    color: PP_COLORS.tealDeep,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  notQuite: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12,
    color: PP_COLORS.stone,
    textDecorationLine: "underline",
  },
  dataRow: {
    marginTop: 24,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchSoft,
    borderRadius: 10,
    backgroundColor: "rgba(234,217,189,0.35)",
    overflow: "hidden",
  },
  dataCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  dataCellBorder: {
    borderLeftWidth: 0.5,
    borderLeftColor: PP_COLORS.birchSoft,
  },
  dataLabel: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 10.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.6,
  },
  dataValue: {
    marginTop: 4,
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14,
    color: PP_COLORS.ink,
    fontWeight: "500",
  },
  otherMatchesWrap: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: PP_COLORS.birchSoft,
  },
  otherMatchesTitle: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12,
    color: PP_COLORS.stone,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  otherMatchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: PP_COLORS.birchHairline,
  },
  otherMatchName: {
    fontFamily: PP_FONT.uiRegular,
    fontSize: 13.5,
    color: PP_COLORS.charcoal,
    flex: 1,
  },
  otherMatchScore: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 13,
    color: PP_COLORS.stone,
  },
  aboutWrap: {
    marginTop: 26,
    paddingTop: 18,
    borderTopWidth: 0.5,
    borderTopColor: PP_COLORS.birchSoft,
  },
  aboutHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  aboutTitle: {
    fontFamily: PP_FONT.serifMedium,
    fontSize: 22,
    color: PP_COLORS.ink,
    letterSpacing: -0.2,
  },
  aboutBody: {
    marginTop: 8,
    fontFamily: PP_FONT.serifRegular,
    fontSize: 16,
    lineHeight: 23,
    color: PP_COLORS.charcoal,
  },
  bottomBar: {
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
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },
  saveBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    backgroundColor: PP_COLORS.tealDeep,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: PP_COLORS.tealDeep,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  saveBtnDone: {
    backgroundColor: PP_COLORS.sage,
    shadowOpacity: 0,
    elevation: 0,
  },
  saveBtnText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 15,
    color: PP_COLORS.parchment,
    letterSpacing: 0.1,
  },
  ghostBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(31,78,74,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(31,78,74,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  matchesLine: {
    marginTop: 10,
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12.5,
    color: PP_COLORS.stone,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  matchesLink: {
    color: PP_COLORS.tealDeep,
    textDecorationLine: "underline",
  },
})
