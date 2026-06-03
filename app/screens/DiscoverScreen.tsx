// Discover — curated seasonal plant suggestions for the UK.
// No API needed: data is static and organised by month.

import { ScrollView, StyleSheet, View } from "react-native"

import { Screen } from "@/components/Screen"
import { TabBar } from "@/components/plantpal/TabBar"
import { Text } from "@/components/Text"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

interface DiscoverPlant {
  name: string
  latin: string
  note: string
  tint: string
}

const MONTHLY_PLANTS: Record<number, DiscoverPlant[]> = {
  1: [
    { name: "Snowdrop", latin: "Galanthus nivalis", note: "First winter blooms on woodland floors", tint: PP_COLORS.paleTeal },
    { name: "Hazel", latin: "Corylus avellana", note: "Catkins appear before leaves in hedgerows", tint: "rgba(212,184,150,0.7)" },
  ],
  2: [
    { name: "Winter Aconite", latin: "Eranthis hyemalis", note: "Butter-yellow cups pushing through bare soil", tint: "rgba(232,200,71,0.35)" },
    { name: "Snowdrop", latin: "Galanthus nivalis", note: "Still flowering in sheltered spots", tint: PP_COLORS.paleTeal },
    { name: "Lesser Celandine", latin: "Ficaria verna", note: "Starry flowers opening on hedgebanks", tint: "rgba(232,200,71,0.35)" },
  ],
  3: [
    { name: "Wood Anemone", latin: "Anemone nemorosa", note: "Pale white carpets under bare oaks", tint: "rgba(238,244,228,0.9)" },
    { name: "Blackthorn", latin: "Prunus spinosa", note: "White blossom before leaves — classic spring signal", tint: "rgba(238,244,228,0.9)" },
    { name: "Primrose", latin: "Primula vulgaris", note: "Pale yellow on mossy banks", tint: "rgba(232,200,71,0.35)" },
  ],
  4: [
    { name: "Bluebell", latin: "Hyacinthoides non-scripta", note: "Woodland floors turn violet-blue", tint: "rgba(110,118,180,0.35)" },
    { name: "Wild Garlic", latin: "Allium ursinum", note: "White star-flowers in damp woodland — pungent", tint: "rgba(238,244,228,0.9)" },
    { name: "Greater Stitchwort", latin: "Stellaria holostea", note: "White stars in hedgerow grasses", tint: "rgba(238,244,228,0.9)" },
  ],
  5: [
    { name: "Common Foxglove", latin: "Digitalis purpurea", note: "Tall spires of spotted bells on woodland edges", tint: "rgba(189,132,178,0.35)" },
    { name: "Red Campion", latin: "Silene dioica", note: "Hedgerows flush bright pink", tint: "rgba(210,100,120,0.35)" },
    { name: "Cow Parsley", latin: "Anthriscus sylvestris", note: "White umbels lining country lanes", tint: "rgba(238,244,228,0.9)" },
  ],
  6: [
    { name: "Elder", latin: "Sambucus nigra", note: "Creamy flower heads ready for cordial", tint: "rgba(238,244,228,0.9)" },
    { name: "Meadow Cranesbill", latin: "Geranium pratense", note: "Vivid violet-blue in traditional meadows", tint: "rgba(110,118,180,0.35)" },
    { name: "Honeysuckle", latin: "Lonicera periclymenum", note: "Fragrant tubular flowers — strongest at dusk", tint: "rgba(232,200,71,0.35)" },
  ],
  7: [
    { name: "Purple Loosestrife", latin: "Lythrum salicaria", note: "Magenta spires beside streams and ditches", tint: "rgba(189,132,178,0.35)" },
    { name: "Rosebay Willowherb", latin: "Chamerion angustifolium", note: "Pink columns on disturbed ground, roadsides", tint: "rgba(210,100,150,0.35)" },
    { name: "Common Ragwort", latin: "Jacobaea vulgaris", note: "Yellow composites — vital for Cinnabar moth", tint: "rgba(232,165,71,0.35)" },
  ],
  8: [
    { name: "Heather", latin: "Calluna vulgaris", note: "Moorland blazes purple through August", tint: "rgba(189,132,178,0.35)" },
    { name: "Meadowsweet", latin: "Filipendula ulmaria", note: "Frothy cream heads over wet meadows", tint: "rgba(238,244,228,0.9)" },
    { name: "Teasel", latin: "Dipsacus fullonum", note: "Prickly egg-shaped heads beloved by goldfinches", tint: "rgba(189,132,178,0.25)" },
  ],
  9: [
    { name: "Blackberry", latin: "Rubus fruticosus", note: "Ripe fruit on every hedgerow — best before first frost", tint: "rgba(80,50,100,0.35)" },
    { name: "Hawthorn", latin: "Crataegus monogyna", note: "Haws ripen deep red — vital winter food for birds", tint: "rgba(194,98,90,0.35)" },
    { name: "Ivy", latin: "Hedera helix", note: "Late flowers provide crucial nectar for autumn bees", tint: "rgba(120,148,86,0.35)" },
  ],
  10: [
    { name: "Fly Agaric", latin: "Amanita muscaria", note: "Iconic red caps in birch and pine woodland", tint: "rgba(194,98,90,0.35)" },
    { name: "Spindle", latin: "Euonymus europaeus", note: "Shocking pink and orange berries on hedgerow shrubs", tint: "rgba(210,100,120,0.35)" },
    { name: "Chanterelle", latin: "Cantharellus cibarius", note: "Golden funnel caps in oak and beech woodland", tint: "rgba(232,165,71,0.35)" },
  ],
  11: [
    { name: "Sloe", latin: "Prunus spinosa", note: "Blue-black berries sweeten after first hard frost", tint: "rgba(80,50,100,0.35)" },
    { name: "Dog Rose", latin: "Rosa canina", note: "Scarlet hips — packed with vitamin C", tint: "rgba(194,98,90,0.35)" },
    { name: "Witch-hazel", latin: "Hamamelis mollis", note: "Twisted yellow ribbons on bare branches — winter spice", tint: "rgba(232,165,71,0.35)" },
  ],
  12: [
    { name: "Holly", latin: "Ilex aquifolium", note: "Glossy evergreen — berries for birds, bark for mice", tint: "rgba(120,148,86,0.35)" },
    { name: "Mistletoe", latin: "Viscum album", note: "Parasitic on apple and lime, translucent white berries", tint: "rgba(238,244,228,0.9)" },
    { name: "Gorse", latin: "Ulex europaeus", note: "Coconut-scented yellow flowers even in midwinter", tint: "rgba(232,200,71,0.35)" },
  ],
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export function DiscoverScreen({ navigation }: MainStackScreenProps<"Discover">) {
  const now = new Date()
  const currentMonth = now.getMonth() + 1 // 1-indexed
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1

  const currentPlants = MONTHLY_PLANTS[currentMonth] ?? []
  const nextPlants = MONTHLY_PLANTS[nextMonth] ?? []

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
          <Text style={styles.eyebrow}>what's in season</Text>
          <Text style={styles.title}>Discover</Text>
        </View>

        <PlantSection title={`In season · ${MONTH_NAMES[currentMonth - 1]}`} plants={currentPlants} />
        <PlantSection title={`Coming up · ${MONTH_NAMES[nextMonth - 1]}`} plants={nextPlants} />
      </ScrollView>

      <TabBar active="Discover" navigation={navigation} />
    </Screen>
  )
}

function PlantSection({ title, plants }: { title: string; plants: DiscoverPlant[] }) {
  return (
    <>
      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>{title}</Text>
        <View style={styles.sectionRule} />
      </View>
      <View style={styles.cards}>
        {plants.map((p) => (
          <PlantCard key={p.latin} plant={p} />
        ))}
      </View>
    </>
  )
}

function PlantCard({ plant }: { plant: DiscoverPlant }) {
  return (
    <View style={[styles.card, { backgroundColor: plant.tint }]}>
      <Text style={styles.cardName}>{plant.name}</Text>
      <Text style={styles.cardLatin}>{plant.latin}</Text>
      <Text style={styles.cardNote}>{plant.note}</Text>
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
  cards: {
    paddingHorizontal: 18,
    paddingBottom: 8,
    gap: 10,
    marginBottom: 12,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
  },
  cardName: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.3,
    color: PP_COLORS.ink,
  },
  cardLatin: {
    marginTop: 2,
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.charcoal,
  },
  cardNote: {
    marginTop: 8,
    fontFamily: PP_FONT.uiRegular,
    fontSize: 13.5,
    lineHeight: 19,
    color: PP_COLORS.charcoal,
  },
})
