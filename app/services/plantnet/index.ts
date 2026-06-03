import Config from "@/config"
import type { PlantIdentification } from "@/models/types"

const PLANTNET_URL = "https://my-api.plantnet.org/v2/identify/all"

export async function identifyPlant(imageUri: string): Promise<PlantIdentification[]> {
  if (!Config.plantNetApiKey) {
    return MOCK_IDENTIFICATIONS
  }

  const formData = new FormData()
  formData.append("images", {
    uri: imageUri,
    name: "plant.jpg",
    type: "image/jpeg",
  } as unknown as Blob)
  formData.append("organs", "auto")

  const response = await fetch(
    `${PLANTNET_URL}?api-key=${Config.plantNetApiKey}&lang=en&include-related-images=false`,
    { method: "POST", body: formData },
  )

  if (!response.ok) {
    throw new Error(`PlantNet API error ${response.status}`)
  }

  const data = await response.json()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results ?? []).slice(0, 5).map((r: any): PlantIdentification => ({
    commonName: r.species?.commonNames?.[0] ?? r.species?.scientificNameWithoutAuthor ?? "Unknown plant",
    scientificName: r.species?.scientificNameWithoutAuthor ?? "",
    family: r.species?.family?.scientificNameWithoutAuthor ?? "",
    score: r.score ?? 0,
  }))
}

const MOCK_IDENTIFICATIONS: PlantIdentification[] = [
  { commonName: "Common foxglove", scientificName: "Digitalis purpurea", family: "Plantaginaceae", score: 0.93 },
  { commonName: "Foxglove", scientificName: "Digitalis grandiflora", family: "Plantaginaceae", score: 0.04 },
  { commonName: "Purple loosestrife", scientificName: "Lythrum salicaria", family: "Lythraceae", score: 0.02 },
]
