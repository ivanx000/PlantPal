import { ComponentProps } from "react"
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import type { PlantIdentification } from "@/models/types"

export type MainStackParamList = {
  Home: undefined
  Result: {
    imageUri: string
    identifications: PlantIdentification[]
  }
  Camera: undefined
  Explore: undefined
  Discover: undefined
  Profile: undefined
  Settings: undefined
  Legal: { type: "privacy" | "terms" }
}

export type AppStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>
  Legal: { type: "privacy" | "terms" }
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type MainStackScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}
