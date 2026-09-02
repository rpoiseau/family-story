export interface TimelineEvent {
  id: string
  /** Libellé de date affiché, ex. « Noël 2025 » */
  label: string
  /** Clé de tri chronologique (année, éventuellement suivie du mois sur deux chiffres) */
  sortKey: number
  title: string
  description: string
  icon: string
  kind: 'passe' | 'prediction'
  published: boolean
}
