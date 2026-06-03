// Profile — the user's journal stats and subscription status.

import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

import { Screen } from "@/components/Screen"
import { TabBar } from "@/components/plantpal/TabBar"
import { Text } from "@/components/Text"
import { useJournal } from "@/context/JournalContext"
import { usePurchases } from "@/context/PurchasesContext"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT, softShadow } from "@/theme/plantpal"
import { format } from "date-fns"

export function ProfileScreen({ navigation }: MainStackScreenProps<"Profile">) {
  const { finds, totalFinds, totalSpecies, thisWeekCount } = useJournal()
  const { isPremium } = usePurchases()

  const recentFinds = finds.slice(0, 3)

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
          <Text style={styles.eyebrow}>your field notes</Text>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <StatCell number={String(totalFinds)} label="total finds" />
          <StatCell number={String(totalSpecies)} label="species" border />
          <StatCell number={String(thisWeekCount)} label="this week" border />
        </View>

        {/* Subscription badge */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.subBadge, { backgroundColor: isPremium ? PP_COLORS.tealDeep : PP_COLORS.sandstone }]}
          onPress={() => {
            if (!isPremium) navigation.getParent()?.navigate("Paywall" as never)
          }}
        >
          <Text style={[styles.subBadgeText, { color: isPremium ? PP_COLORS.parchment : PP_COLORS.charcoal }]}>
            {isPremium ? "✦ PlantPal Premium" : "Free plan · upgrade to Premium"}
          </Text>
        </TouchableOpacity>

        {/* Recent finds */}
        {recentFinds.length > 0 && (
          <>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionLabel}>recent finds</Text>
              <View style={styles.sectionRule} />
            </View>
            <View style={styles.recentList}>
              {recentFinds.map((find) => (
                <View key={find.id} style={styles.recentRow}>
                  <View style={styles.recentInfo}>
                    <Text style={styles.recentName}>{find.commonName}</Text>
                    <Text style={styles.recentLatin}>{find.scientificName}</Text>
                  </View>
                  <Text style={styles.recentDate}>
                    {format(new Date(find.savedAt), "d MMM")}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Empty state */}
        {totalFinds === 0 && (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No finds yet</Text>
            <Text style={styles.emptySub}>
              Tap the camera button to photograph and identify your first plant.
            </Text>
          </View>
        )}

        {/* Settings link */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.settingsLink}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.settingsLinkText}>Open settings →</Text>
        </TouchableOpacity>
      </ScrollView>

      <TabBar active="Profile" navigation={navigation} />
    </Screen>
  )
}

function StatCell({ number, label, border }: { number: string; label: string; border?: boolean }) {
  return (
    <View style={[styles.statCell, border && styles.statBorder]}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  statsCard: {
    marginHorizontal: 18,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchSoft,
    borderRadius: 14,
    backgroundColor: "rgba(234,217,189,0.35)",
    overflow: "hidden",
    ...softShadow,
  },
  statCell: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  statBorder: {
    borderLeftWidth: 0.5,
    borderLeftColor: PP_COLORS.birchSoft,
  },
  statNumber: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 32,
    lineHeight: 34,
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
  subBadge: {
    marginHorizontal: 18,
    marginBottom: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  subBadgeText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14,
    letterSpacing: 0.1,
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
  recentList: {
    marginHorizontal: 18,
    backgroundColor: PP_COLORS.parchmentSoft,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "rgba(140,110,70,0.18)",
    overflow: "hidden",
    marginBottom: 24,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(212,184,150,0.5)",
  },
  recentInfo: {
    flex: 1,
    gap: 2,
  },
  recentName: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14.5,
    color: PP_COLORS.ink,
  },
  recentLatin: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 12,
    color: PP_COLORS.stone,
  },
  recentDate: {
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
  settingsLink: {
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: "center",
  },
  settingsLinkText: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.2,
  },
})
