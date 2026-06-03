// Camera / identify entry point — lets the user take or choose a photo,
// calls PlantNet, then navigates to ResultScreen with real data.

import { useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Screen } from "@/components/Screen"
import { IconCamera, IconClose, IconLeaf } from "@/components/plantpal/PPIcons"
import { Text } from "@/components/Text"
import type { MainStackScreenProps } from "@/navigators/navigationTypes"
import { identifyPlant } from "@/services/plantnet"
import { PP_COLORS, PP_FONT } from "@/theme/plantpal"

export function CameraScreen({ navigation }: MainStackScreenProps<"Camera">) {
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)

  const identify = async (imageUri: string) => {
    setLoading(true)
    try {
      const identifications = await identifyPlant(imageUri)
      navigation.replace("Result", { imageUri, identifications })
    } catch {
      Alert.alert("Identification failed", "Couldn't identify the plant. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      Alert.alert(
        "Camera access needed",
        "Please allow camera access in Settings to photograph plants.",
      )
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.85,
    })
    if (!result.canceled && result.assets[0]) {
      await identify(result.assets[0].uri)
    }
  }

  const handleLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.85,
    })
    if (!result.canceled && result.assets[0]) {
      await identify(result.assets[0].uri)
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
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top - 32, 8) }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <IconClose size={18} color={PP_COLORS.charcoal} strokeWidth={1.6} />
        </TouchableOpacity>
        <Text style={styles.eyebrow}>identify a plant</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.body}>
        <IconLeaf size={52} color={PP_COLORS.mist} strokeWidth={1.2} />
        <Text style={styles.heading}>What's this plant?</Text>
        <Text style={styles.sub}>
          Take a photo or choose one from your library and we'll identify it.
        </Text>

        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={PP_COLORS.tealDeep} />
            <Text style={styles.loadingText}>Identifying…</Text>
          </View>
        ) : (
          <View style={styles.buttonsWrap}>
            <TouchableOpacity activeOpacity={0.85} style={styles.primaryBtn} onPress={handleCamera}>
              <IconCamera size={18} color={PP_COLORS.parchment} strokeWidth={1.6} />
              <Text style={styles.primaryBtnText}>Take a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={styles.ghostBtn} onPress={handleLibrary}>
              <Text style={styles.ghostBtnText}>Choose from library</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 13,
    color: PP_COLORS.stone,
    letterSpacing: 0.3,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  heading: {
    fontFamily: PP_FONT.displayRegular,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -0.6,
    color: PP_COLORS.ink,
    textAlign: "center",
    marginTop: 20,
  },
  sub: {
    marginTop: 10,
    fontFamily: PP_FONT.serifRegular,
    fontSize: 16,
    lineHeight: 23,
    color: PP_COLORS.stone,
    textAlign: "center",
  },
  buttonsWrap: {
    marginTop: 40,
    width: "100%",
    gap: 12,
  },
  primaryBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: PP_COLORS.tealDeep,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: PP_COLORS.tealDeep,
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  primaryBtnText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 15,
    color: PP_COLORS.parchment,
    letterSpacing: 0.1,
  },
  ghostBtn: {
    height: 52,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: PP_COLORS.birchBorderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostBtnText: {
    fontFamily: PP_FONT.uiMedium,
    fontSize: 14.5,
    color: PP_COLORS.charcoal,
    letterSpacing: 0.1,
  },
  loadingWrap: {
    marginTop: 40,
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontFamily: PP_FONT.serifItalic,
    fontStyle: "italic",
    fontSize: 15,
    color: PP_COLORS.stone,
  },
})
