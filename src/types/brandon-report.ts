export interface BrandonZone {
  id: string
  emoji: string
  name: string
  /** Communes ou repères géographiques rattachés à la zone */
  places: string
  description: string
}

export interface BrandonPillar {
  id: string
  emoji: string
  title: string
  paragraphs: string[]
  quotes: string[]
  /** Étapes numérotées, utilisées par le pilier « Secret Santa » */
  steps: string[]
}

export interface BrandonTrophy {
  id: string
  title: string
  laureates: string
  description: string
  quotes: string[]
}

export interface BrandonPrediction {
  id: string
  date: string
  description: string
}

export interface BrandonReaction {
  id: string
  member: string
  description: string
}

export interface BrandonReport {
  title: string
  subtitle: string
  author: string
  authorTagline: string
  intro: string[]
  zonesTitle: string
  zonesIntro: string
  zones: BrandonZone[]
  pillarsTitle: string
  pillarsSummary: string[]
  pillars: BrandonPillar[]
  trophiesTitle: string
  trophies: BrandonTrophy[]
  predictionsTitle: string
  predictions: BrandonPrediction[]
  reactionsTitle: string
  reactions: BrandonReaction[]
  conclusion: string
}
