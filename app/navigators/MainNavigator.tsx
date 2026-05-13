import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { DashboardScreen } from "@/screens/DashboardScreen"
import { LegalScreen } from "@/screens/LegalScreen"
import { ResultScreen } from "@/screens/ResultScreen"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { useAppTheme } from "@/theme/context"

import type { MainStackParamList } from "./navigationTypes"

const Stack = createNativeStackNavigator<MainStackParamList>()

export function MainNavigator() {
  const { theme: { colors } } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={DashboardScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
    </Stack.Navigator>
  )
}
