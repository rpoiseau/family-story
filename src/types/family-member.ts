export interface FamilyMember {
  id: string
  displayName: string
  /** Titre satirique donné par Brandon, ex. « La Tisseuse de Lumière sous haute tension » */
  role: string
  /** Emoji associé au membre dans le trombinoscope du rapport */
  emoji: string
  portrait: string
  /** Citations WhatsApp reprises dans le portrait */
  quotes: string[]
  image: string
  imageAlt: string
  tags: string[]
  order: number
  published: boolean
}
