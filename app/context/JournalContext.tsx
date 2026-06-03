import { createContext, useCallback, useContext, useMemo, useState } from "react"

import type { PlantFind } from "@/models/types"
import { load, save } from "@/utils/storage"

const JOURNAL_KEY = "PLANTPAL_JOURNAL"

interface JournalContextValue {
  finds: PlantFind[]
  addFind: (find: PlantFind) => void
  removeFind: (id: string) => void
  totalFinds: number
  totalSpecies: number
  thisWeekCount: number
}

const JournalContext = createContext<JournalContextValue>({
  finds: [],
  addFind: () => {},
  removeFind: () => {},
  totalFinds: 0,
  totalSpecies: 0,
  thisWeekCount: 0,
})

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [finds, setFinds] = useState<PlantFind[]>(() => load<PlantFind[]>(JOURNAL_KEY) ?? [])

  const addFind = useCallback((find: PlantFind) => {
    setFinds((prev) => {
      const next = [find, ...prev]
      save(JOURNAL_KEY, next)
      return next
    })
  }, [])

  const removeFind = useCallback((id: string) => {
    setFinds((prev) => {
      const next = prev.filter((f) => f.id !== id)
      save(JOURNAL_KEY, next)
      return next
    })
  }, [])

  const totalSpecies = useMemo(() => new Set(finds.map((f) => f.scientificName)).size, [finds])

  const thisWeekCount = useMemo(() => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return finds.filter((f) => new Date(f.savedAt) > weekAgo).length
  }, [finds])

  return (
    <JournalContext.Provider
      value={{ finds, addFind, removeFind, totalFinds: finds.length, totalSpecies, thisWeekCount }}
    >
      {children}
    </JournalContext.Provider>
  )
}

export const useJournal = () => useContext(JournalContext)
