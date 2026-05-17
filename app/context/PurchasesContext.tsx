import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases"

import { BoilerplateConfig } from "@/config/boilerplate.config"

type PurchasesContextType = {
  isPremium: boolean
  isLoading: boolean
  offerings: PurchasesOfferings | null
  customerInfo: CustomerInfo | null
  purchasePackage: (pkg: PurchasesPackage) => Promise<boolean>
  restorePurchases: () => Promise<boolean>
}

const PurchasesContext = createContext<PurchasesContextType | null>(null)

// True if the RevenueCat API key has been replaced with a real one.
// While the boilerplate placeholder is in place we skip SDK init entirely,
// so the console isn't spammed with "Invalid API Key" errors.
function hasValidRevenueCatKey(): boolean {
  const key = BoilerplateConfig.revenueCat.apiKey
  return (
    !!key &&
    key !== "YOUR_REVENUECAT_API_KEY" &&
    !key.startsWith("YOUR_") &&
    key.length > 8
  )
}

export const PurchasesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!hasValidRevenueCatKey()) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.info(
          "[PlantPal] RevenueCat API key not configured — running in mock mode. " +
            "Add your appl_… key in app/config/boilerplate.config.ts to enable purchases.",
        )
      }
      setIsLoading(false)
      return
    }

    if (__DEV__) {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG)
    }

    Purchases.configure({ apiKey: BoilerplateConfig.revenueCat.apiKey })

    const loadInitialData = async () => {
      try {
        const [info, currentOfferings] = await Promise.all([
          Purchases.getCustomerInfo(),
          Purchases.getOfferings(),
        ])
        setCustomerInfo(info)
        setOfferings(currentOfferings)
      } catch (e) {
        console.warn("RevenueCat init error:", e)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()

    // The newer react-native-purchases versions don't return a subscription
    // handle from addCustomerInfoUpdateListener — explicitly remove on cleanup.
    const listener = (info: CustomerInfo) => setCustomerInfo(info)
    Purchases.addCustomerInfoUpdateListener(listener)

    return () => {
      try {
        // Available on most react-native-purchases versions.
        const anyPurchases = Purchases as unknown as {
          removeCustomerInfoUpdateListener?: (l: typeof listener) => void
        }
        anyPurchases.removeCustomerInfoUpdateListener?.(listener)
      } catch {
        // Swallow — not critical if the SDK doesn't expose this on a given version.
      }
    }
  }, [])

  const isPremium = useMemo(() => {
    if (!customerInfo) return false
    return !!customerInfo.entitlements.active[BoilerplateConfig.revenueCat.entitlementName]
  }, [customerInfo])

  const purchasePackage = useCallback(async (pkg: PurchasesPackage): Promise<boolean> => {
    if (!hasValidRevenueCatKey()) return false
    try {
      const { customerInfo: info } = await Purchases.purchasePackage(pkg)
      setCustomerInfo(info)
      return !!info.entitlements.active[BoilerplateConfig.revenueCat.entitlementName]
    } catch (e: any) {
      if (!e.userCancelled) {
        console.warn("Purchase error:", e)
      }
      return false
    }
  }, [])

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    if (!hasValidRevenueCatKey()) return false
    try {
      const info = await Purchases.restorePurchases()
      setCustomerInfo(info)
      return !!info.entitlements.active[BoilerplateConfig.revenueCat.entitlementName]
    } catch (e) {
      console.warn("Restore error:", e)
      return false
    }
  }, [])

  const value = useMemo(
    () => ({ isPremium, isLoading, offerings, customerInfo, purchasePackage, restorePurchases }),
    [isPremium, isLoading, offerings, customerInfo, purchasePackage, restorePurchases],
  )

  return <PurchasesContext.Provider value={value}>{children}</PurchasesContext.Provider>
}

export const usePurchases = () => {
  const ctx = useContext(PurchasesContext)
  if (!ctx) throw new Error("usePurchases must be used within a PurchasesProvider")
  return ctx
}
