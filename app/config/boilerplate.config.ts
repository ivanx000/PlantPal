export interface BoilerplateConfigType {
  app: {
    name: string
    tagline: string
    supportEmail: string
  }
}

export const BoilerplateConfig: BoilerplateConfigType = {
  app: {
    name: "PlantPal",
    tagline: "Curiosity, captured.",
    supportEmail: "hello@plantpal.app",
  },
}
