import { createContext, useCallback, useContext, useState } from "react"

import { load, save } from "@/utils/storage"

const SETTINGS_KEY = "PLANTPAL_SETTINGS"

export interface AppSettings {
  detectMushrooms: boolean
  toxicWarnings: boolean
  savePhotos: boolean
  embedExif: boolean
  shutterSound: boolean
}

const DEFAULT_SETTINGS: AppSettings = {
  detectMushrooms: true,
  toxicWarnings: true,
  savePhotos: true,
  embedExif: false,
  shutterSound: true,
}

interface SettingsContextValue {
  settings: AppSettings
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSetting: () => {},
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(
    () => load<AppSettings>(SETTINGS_KEY) ?? DEFAULT_SETTINGS,
  )

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value }
      save(SETTINGS_KEY, next)
      return next
    })
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useAppSettings = () => useContext(SettingsContext)
