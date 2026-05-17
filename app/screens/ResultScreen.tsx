// Identification result — the emotional centre of PlantPal.
// A polaroid photo, plant name (display serif), Latin binomial (italic serif),
// a 3-leaf confidence ramp, a data row, content tags, a peek of "About this plant",
// and a primary "Save to journal" CTA.

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Polaroid } from "@/components/plantpal/Polaroid"
import {
  ConfidenceLeaf,
  IconBookmark,
  IconChevronDown,
  IconClose,
  IconMore,
  IconNote,
  IconShare,
} from "@/components/plantpal/PPIcons"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

export function ResultScreen({ navigation }: MainStackScreenProps<"Result">) {
  const insets = useSafeAreaInsets()

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
          <Text style={styles.spotted}>Spotted 2:14 pm</Text>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7} hitSlop={8}>
            <IconMore size={20} color={PP_COLORS.charcoal} />
          </TouchableOpacity>
        </View>

        {/* Polaroid */}
        <View style={styles.polaroidWrap}>
          <Polaroid
            tilt={-1.2}
            width={286}
            photoAspect={262 / 296}
            tint="rgba(189,132,178,0.55)"
            caption={
              <Text style={styles.locStamp}>HAMPSTEAD HEATH · MAY 11</Text>
            }
          />
        </View>

        {/* Identification — name + binomial */}
        <View style={{ paddingHorizontal: 28 }}>
          <Text style={styles.commonName}>Common foxglove</Text>
          <Text style={styles.binomial}>Digitalis purpurea</Text>

          {/* Confidence ramp */}
          <View style={styles.confidenceRow}>
            <View style={styles.leaves}>
              <ConfidenceLeaf filled color={PP_COLORS.sage} size={14} />
              <View style={{ width: 4 }} />
              <ConfidenceLeaf filled color={PP_COLORS.eucalyptus} size={16} />
              <View style={{ width: 4 }} />
              <ConfidenceLeaf filled color={PP_COLORS.tealDeep} size={18} />
            </View>
            <Text style={styles.confidenceLabel}>High confidence</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.notQuite}>Not quite?</Text>
            </TouchableOpacity>
          </View>

          {/* Three-up data row */}
          <View style={styles.dataRow}>
            <DataCell label="Family" value="Plantaginaceae" italic />
            <DataCell label="Bloom" value="Jun – Sep" border />
            <DataCell label="Height" value="up to 2 m" border />
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <Tag color={PP_COLORS.iris} bg="rgba(123,90,143,0.14)">
              Flowering plant
            </Tag>
            <Tag color={PP_COLORS.oak} bg="rgba(160,123,82,0.14)">
              Biennial
            </Tag>
            <Tag color={PP_COLORS.eucalyptus} bg={PP_COLORS.paleTeal}>
              Pollinator
            </Tag>
            <Tag color={PP_COLORS.berry} bg="rgba(194,98,90,0.14)">
              Toxic
            </Tag>
          </View>

          {/* About — scroll cue */}
          <View style={styles.aboutWrap}>
            <View style={styles.aboutHeader}>
              <Text style={styles.aboutTitle}>About this plant</Text>
              <IconChevronDown size={16} color={PP_COLORS.stone} />
            </View>
            <Text style={styles.aboutBody}>
              Foxglove rises through the woodland edge in its second summer,
              sending up a one-sided spire of speckled bells. Bumblebees climb…
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <View style={styles.actionsRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.saveBtn}>
            <IconBookmark size={17} color={PP_COLORS.parchment} strokeWidth={1.7} />
            <Text style={styles.saveBtnText}>Save to journal</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.ghostBtn}>
            <IconNote size={18} color={PP_COLORS.tealDeep} strokeWidth={1.6} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={styles.ghostBtn}>
            <IconShare size={18} color={PP_COLORS.tealDeep} strokeWidth={1.6} />
          </TouchableOpacity>
        </View>
        <Text style={styles.matchesLine}>
          Not quite right?{" "}
          <Text style={styles.matchesLink}>See other matches</Text>
        </Text>
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
          italic
            ? {
                fontFamily: PP_FONT.serifItalic,
                fontStyle: "italic",
                fontSize: 15,
                fontWeight: "400",
              }
            : null,
        ]}
      >
        {value}
      </Text>
    </View>
  )
}

function Tag({
  color,
  bg,
  children,
}: {
  color: string
  bg: string
  children: string
}) {
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.tagText, { color }]}>{children}</Text>
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
  polaroidWrap: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  locStamp: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 11.5,
    color: PP_COLORS.stone,
    letterSpacing: 0.4,
    textAlign: "center",
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
  tagsRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 12,
    letterSpacing: 0.1,
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
