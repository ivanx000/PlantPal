// Shared floating tab bar used across Journal, Explore, Discover, and Profile screens.

import { StyleSheet, TouchableOpacity, View } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import type { MainStackParamList } from "@/navigators/navigationTypes"
import { PP_COLORS, PP_FONT, softShadow } from "@/theme/plantpal"

import {
  IconBookmark,
  IconCamera,
  IconLeaf,
  IconMap,
  IconUser,
} from "./PPIcons"

type Tab = "Journal" | "Explore" | "Discover" | "Profile"

interface TabBarProps {
  active: Tab
  navigation: NavigationProp<MainStackParamList>
}

export function TabBar({ active, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 16) }]}
      pointerEvents="box-none"
    >
      <View style={styles.bar}>
        <TabButton
          label="Journal"
          active={active === "Journal"}
          onPress={() => navigation.navigate("Home")}
        >
          <IconBookmark size={20} color={active === "Journal" ? PP_COLORS.tealDeep : PP_COLORS.stone} strokeWidth={1.6} />
        </TabButton>

        <TabButton
          label="Explore"
          active={active === "Explore"}
          onPress={() => navigation.navigate("Explore")}
        >
          <IconMap size={20} color={active === "Explore" ? PP_COLORS.tealDeep : PP_COLORS.stone} strokeWidth={1.6} />
        </TabButton>

        {/* Primary capture button */}
        <View style={styles.captureWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.captureBtn}
            onPress={() => navigation.navigate("Camera")}
          >
            <IconCamera size={26} color={PP_COLORS.parchment} strokeWidth={1.6} />
          </TouchableOpacity>
        </View>

        <TabButton
          label="Discover"
          active={active === "Discover"}
          onPress={() => navigation.navigate("Discover")}
        >
          <IconLeaf size={20} color={active === "Discover" ? PP_COLORS.tealDeep : PP_COLORS.stone} strokeWidth={1.6} />
        </TabButton>

        <TabButton
          label="Profile"
          active={active === "Profile"}
          onPress={() => navigation.navigate("Profile")}
        >
          <IconUser size={20} color={active === "Profile" ? PP_COLORS.tealDeep : PP_COLORS.stone} strokeWidth={1.6} />
        </TabButton>
      </View>
    </View>
  )
}

function TabButton({
  active,
  label,
  children,
  onPress,
}: {
  active?: boolean
  label: string
  children: React.ReactNode
  onPress: () => void
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.tabBtn} onPress={onPress}>
      {children}
      <Text style={[styles.tabLabel, { color: active ? PP_COLORS.tealDeep : PP_COLORS.stone }]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bar: {
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
