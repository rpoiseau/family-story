export type UnionType = 'conjoint' | 'compagnon' | 'parent-seul'

export interface FamilyTreePerson {
  id: string
  firstName: string
  /** 0 = génération de Michel (racine), incrémentée d'un niveau à chaque filiation */
  generation: number
  /** Ordre d'affichage au sein de sa génération */
  order: number
  /** Description du lien de parenté, ex. "Fils de Valé et Bernard". Absente uniquement pour Michel (racine). */
  relationLabel?: string
  /** true uniquement pour les personnes mineures (Nina, Jeanne, Louis, Paul) : ne jamais leur ajouter d'autre donnée */
  isMinor?: boolean
}

export interface FamilyTreeUnion {
  id: string
  /** 1 seul id pour Michel (conjointe inconnue) et Caroline (père non mentionné), 2 sinon */
  partners: string[]
  type: UnionType
  /** ids des enfants, dans l'ordre d'affichage voulu */
  children: string[]
}

export interface FamilyTree {
  rootId: string
  persons: FamilyTreePerson[]
  unions: FamilyTreeUnion[]
}

/** Groupe d'affichage d'une génération : une personne seule, ou un couple relié par un connecteur */
export interface FamilyTreeBlock {
  id: string
  /** Colonne de grille CSS 1-indexée */
  startColumn: number
  span: 1 | 2
  persons: FamilyTreePerson[]
  unionType?: UnionType
}
