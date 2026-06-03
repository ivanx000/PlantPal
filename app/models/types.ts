// Boilerplate types retained for schedule utilities
export interface TimeFrame {
  id: string
  startTime: string
  endTime: string
  days: number[]
}

export interface BlockedApp {
  id: string
  name: string
  brandColor?: string
  accentColor: string
  blockedForever: boolean
  overrideUnblocked?: boolean
  timeFrames: TimeFrame[]
  createdAt: string
  groupId?: string
  blockingStartedAt?: string
  blockedMinutesByDay?: Record<string, number>
}

export interface PlantIdentification {
  commonName: string
  scientificName: string
  family: string
  score: number // 0–1 confidence
}

export interface PlantFind {
  id: string
  commonName: string
  scientificName: string
  family: string
  confidence: number // 0–1
  imageUri: string
  savedAt: string // ISO date string
  note?: string
}
