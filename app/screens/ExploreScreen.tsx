// Explore — shows a chronological list of journal finds organised by location.
// Full map integration is a future milestone; this screen provides value now
// by surfacing the saved journal with location stamps and a map placeholder.

import { ScrollView, StyleSheet, View } from "react-native"

import { Screen } from "@/components/Screen"
import { TabBar } from "@/components/plantpal/TabBar"
import { Text } from "@/components/Text"
import { useJournal } from "@/context/JournalContext"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"
import { format } from "date-fns"

export function ExploreScreen({ navigation }: MainStackScreenProps<"Explore">) {
  const { finds } = useJournal()

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      systemBarStyle="dark"
      backgroundColor={PP_COLORS.parchment}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>where you've been</Text>
          <Text style={styles.title}>Explore</Text>
        </View>

        {/* Map placeholder */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapContent}>
            <Text style={styles.mapEmoji}>🗺</Text>
            <Text style={styles.mapTitle}>Map coming soon</Text>
            <Text style={styles.mapSub}>
              We're building an interactive map of your finds. For now, browse your sightings below.
            </Text>
          </View>
        </View>

        {/* Finds list */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>all sightings</Text>
          <View style={styles.sectionRule} />
        </View>

        {finds.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>Nothing yet</Text>
            <Text style={styles.emptySub}>
              Tap the camera button and identify your first plant to see it here.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {finds.map((find) => (
              <View key={find.id} style={styles.findRow}>
                <View style={styles.findDot} />
                <View style={styles.findInfo}>
                  <Text style={styles.findName}>{find.commonName}</Text>
                  <Text style={styles.findLatin}>{find.scientificName}</Text>
                </View>
                <Text style={styles.findDate}>
                  {format(new Date(find.savedAt), "d MMM")}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TabBar active="Explore" navigation={navigation} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 20,
  },
  eyebrow: {
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
  mapPlaceholder: {
    marginHorizontal: 18,
    marginBottom: 24,
    height: 180,
    borderRadius: 16,
    backgroundColor: PP_COLORS.paleTeal,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContent: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  mapEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  mapTitle: {
    fontFamily: PP_FONT.serifMedium,
    fontSize: 18,
    color: PP_COLORS.tealDeep,
    letterSpacing: -0.2,
  },
  mapSub: {
    marginTop: 6,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 13,
    color: PP_COLORS.eucalyptus,
    textAlign: "center",
    lineHeight: 18,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 14,
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
  list: {
    marginHorizontal: 18,
    backgroundColor: PP_COLORS.parchmentSoft,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "rgba(140,110,70,0.18)",
    overflow: "hidden",
  },
  findRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(212,184,150,0.5)",
    gap: 12,
  },
  findDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PP_COLORS.sage,
    flexShrink: 0,
  },
  findInfo: {
    flex: 1,
    gap: 2,
  },
  findName: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14.5,
    color: PP_COLORS.ink,
  },
  findLatin: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 12,
    color: PP_COLORS.stone,
  },
  findDate: {
    fontFamily: PP_FONT.uiRegular,
    fontSize: 12,
    color: PP_COLORS.stone,
  },
  emptyWrap: {
    paddingHorizontal: 24,
    paddingTop: 24,
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
    color: PP_COLORS.stone,
    textAlign: "center",
    lineHeight: 20,
  },
})
