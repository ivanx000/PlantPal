import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false
  // `status` is on PermissionResponse at runtime but expo-notifications'
  // shipped .d.ts is incomplete — cast through any.
  const existing = (await Notifications.getPermissionsAsync()) as any
  if (existing?.status === "granted") return true
  const next = (await Notifications.requestPermissionsAsync()) as any
  return next?.status === "granted"
}

export async function cancelNotification(id: string): Promise<void> {
  return Notifications.cancelScheduledNotificationAsync(id)
}
