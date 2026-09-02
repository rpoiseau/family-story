<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import QuoteBlock from '@/components/QuoteBlock.vue'
import FamilyTreeGenerationRow from '@/components/FamilyTreeGenerationRow.vue'
import FamilyTreeMobileList from '@/components/FamilyTreeMobileList.vue'
import familyMembersData from '@/data/family-members.json'
import familyTreeData from '@/data/family-tree.json'
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTree, FamilyTreeBlock, FamilyTreePerson } from '@/types/family-tree'

const { mobile, mdAndUp } = useDisplay()

const familyMembers: FamilyMember[] = (familyMembersData as FamilyMember[])
  .filter((member) => member.published)
  .sort((a, b) => a.order - b.order)

const portraitById = new Map(familyMembers.map((member) => [member.id, member]))

const tree = familyTreeData as FamilyTree

/**
 * Position chaque personne sur une colonne (0-indexée) d'une grille commune à toutes les
 * générations : la génération la plus peuplée sert de référence (colonnes = ordre déclaré),
 * les autres générations sont déduites par moyenne (parents = centre de leurs enfants,
 * enfants sans fratrie déclarée = centre de leurs parents), par propagation à point fixe.
 */
function computePersonColumns(familyTree: FamilyTree) {
  const byGeneration = new Map<number, FamilyTreePerson[]>()
  for (const person of familyTree.persons) {
    const list = byGeneration.get(person.generation) ?? []
    list.push(person)
    byGeneration.set(person.generation, list)
  }

  let referenceGeneration = 0
  let maxCount = 0
  for (const [generation, persons] of byGeneration) {
    if (persons.length > maxCount) {
      maxCount = persons.length
      referenceGeneration = generation
    }
  }

  const columns = new Map<string, number>()
  for (const person of byGeneration.get(referenceGeneration) ?? []) {
    columns.set(person.id, person.order - 1)
  }

  let progress = true
  while (progress) {
    progress = false

    for (const union of familyTree.unions) {
      if (union.partners.some((id) => !columns.has(id)) && union.children.every((id) => columns.has(id))) {
        const center =
          union.children.reduce((sum, id) => sum + (columns.get(id) ?? 0), 0) / union.children.length
        if (union.partners.length === 1) {
          columns.set(union.partners[0]!, Math.round(center))
        } else {
          const leftColumn = Math.floor(center)
          columns.set(union.partners[0]!, leftColumn)
          columns.set(union.partners[1]!, leftColumn + 1)
        }
        progress = true
      }

      const missingChildren = union.children.filter((id) => !columns.has(id))
      if (missingChildren.length && union.partners.every((id) => columns.has(id))) {
        const center =
          union.partners.reduce((sum, id) => sum + (columns.get(id) ?? 0), 0) / union.partners.length
        for (const childId of missingChildren) {
          columns.set(childId, Math.round(center))
        }
        progress = true
      }
    }
  }

  return { columns, totalColumns: maxCount }
}

const { columns: personColumns, totalColumns } = computePersonColumns(tree)

const generations = computed(() => {
  const byGeneration = new Map<number, FamilyTreePerson[]>()
  for (const person of tree.persons) {
    const list = byGeneration.get(person.generation) ?? []
    list.push(person)
    byGeneration.set(person.generation, list)
  }

  const spouseOf = new Map<string, string>()
  for (const union of tree.unions) {
    if (union.partners.length === 2) {
      spouseOf.set(union.partners[0]!, union.partners[1]!)
      spouseOf.set(union.partners[1]!, union.partners[0]!)
    }
  }

  return [...byGeneration.entries()]
    .sort(([a], [b]) => a - b)
    .map(([generation, persons]) => {
      const consumed = new Set<string>()
      const blocks: FamilyTreeBlock[] = []
      const sorted = [...persons].sort(
        (a, b) => (personColumns.get(a.id) ?? 0) - (personColumns.get(b.id) ?? 0),
      )

      for (const person of sorted) {
        if (consumed.has(person.id)) continue
        const spouseId = spouseOf.get(person.id)
        const spouse = spouseId ? persons.find((p) => p.id === spouseId) : undefined

        if (spouse && !consumed.has(spouse.id)) {
          const union = tree.unions.find(
            (u) => u.partners.includes(person.id) && u.partners.includes(spouse.id),
          )
          const personColumn = personColumns.get(person.id) ?? 0
          const spouseColumn = personColumns.get(spouse.id) ?? 0
          blocks.push({
            id: union?.id ?? `${person.id}-${spouse.id}`,
            startColumn: Math.min(personColumn, spouseColumn) + 1,
            span: 2,
            persons: personColumn <= spouseColumn ? [person, spouse] : [spouse, person],
            unionType: union?.type,
          })
          consumed.add(person.id)
          consumed.add(spouse.id)
        } else {
          blocks.push({
            id: person.id,
            startColumn: (personColumns.get(person.id) ?? 0) + 1,
            span: 1,
            persons: [person],
          })
          consumed.add(person.id)
        }
      }

      return { generation, blocks }
    })
})

interface ConnectorGap {
  id: string
  parentGeneration: number
  parentColumn: number
  childColumns: number[]
}

const connectorGaps = computed(() => {
  const personById = new Map(tree.persons.map((person) => [person.id, person]))
  const gaps: ConnectorGap[] = []

  for (const union of tree.unions) {
    const parentPersons = union.partners.map((id) => personById.get(id)).filter(Boolean) as FamilyTreePerson[]
    const childPersons = union.children.map((id) => personById.get(id)).filter(Boolean) as FamilyTreePerson[]
    if (!parentPersons.length || !childPersons.length) continue

    const parentColumns = parentPersons.map((person) => personColumns.get(person.id) ?? 0)
    gaps.push({
      id: union.id,
      parentGeneration: parentPersons[0]!.generation,
      parentColumn: parentColumns.reduce((a, b) => a + b, 0) / parentColumns.length,
      childColumns: childPersons.map((person) => personColumns.get(person.id) ?? 0),
    })
  }

  return gaps
})

function connectorsFor(generation: number) {
  return connectorGaps.value.filter((gap) => gap.parentGeneration === generation)
}

function stemColumn(column: number) {
  return Math.round(column) + 1
}

function busColumn(cols: number[]) {
  return `${Math.min(...cols) + 1} / ${Math.max(...cols) + 2}`
}

const selectedMember = ref<FamilyMember | null>(null)
const dialog = ref(false)
const selectedPerson = ref<FamilyTreePerson | null>(null)
const miniDialog = ref(false)

function openPerson(person: FamilyTreePerson) {
  const portrait = portraitById.get(person.id)
  if (portrait) {
    selectedMember.value = portrait
    dialog.value = true
  } else {
    selectedPerson.value = person
    miniDialog.value = true
  }
}

function paragraphs(portrait: string): string[] {
  return portrait.split('\n\n')
}
</script>

<template>
  <v-container>
    <h1 class="display-title mb-2">La famille</h1>
    <p class="text-subtitle-1 text-medium-emphasis mb-6">
      🎭 L'arbre au vitriol : qui descend de qui dans ce zoo ? 🌳
    </p>
    <v-divider class="mb-8" />

    <div v-if="mdAndUp" class="family-tree">
      <template v-for="row in generations" :key="row.generation">
        <FamilyTreeGenerationRow
          :blocks="row.blocks"
          :total-columns="totalColumns"
          :portrait-by-id="portraitById"
          @select="openPerson"
        />
        <div
          v-if="connectorsFor(row.generation).length"
          class="tree-connectors"
          :style="{ gridTemplateColumns: `repeat(${totalColumns}, 1fr)` }"
        >
          <template v-for="gap in connectorsFor(row.generation)" :key="gap.id">
            <div
              class="tree-connectors__stem tree-connectors__stem--up"
              :style="{ gridColumn: stemColumn(gap.parentColumn) }"
            />
            <div
              v-if="gap.childColumns.length > 1"
              class="tree-connectors__bus"
              :style="{ gridColumn: busColumn(gap.childColumns) }"
            />
            <div
              v-for="col in gap.childColumns"
              :key="`${gap.id}-${col}`"
              class="tree-connectors__stem tree-connectors__stem--down"
              :style="{ gridColumn: col + 1 }"
            />
          </template>
        </div>
      </template>
    </div>

    <FamilyTreeMobileList v-else :tree="tree" :portrait-by-id="portraitById" @select="openPerson" />

    <v-dialog v-model="dialog" max-width="640" :fullscreen="mobile" scrollable>
      <v-card v-if="selectedMember">
        <v-card-text class="pa-6">
          <div class="d-flex flex-column align-center text-center mb-4">
            <v-avatar size="96" color="secondary" class="mb-4">
              <v-img
                v-if="selectedMember.image"
                :src="selectedMember.image"
                :alt="selectedMember.imageAlt"
              />
              <span v-else class="member-card__emoji">{{ selectedMember.emoji }}</span>
            </v-avatar>
            <h2 class="display-title--sm">{{ selectedMember.displayName }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis mb-0">{{ selectedMember.role }}</p>
          </div>

          <p
            v-for="(paragraph, index) in paragraphs(selectedMember.portrait)"
            :key="index"
            class="text-body-1"
          >
            {{ paragraph }}
          </p>

          <QuoteBlock
            v-for="(quote, index) in selectedMember.quotes"
            :key="`quote-${index}`"
            :text="quote"
            dense
          />

          <div v-if="selectedMember.tags.length" class="mt-4">
            <v-chip
              v-for="tag in selectedMember.tags"
              :key="tag"
              color="primary"
              variant="tonal"
              size="small"
              class="me-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="miniDialog" max-width="360">
      <v-card v-if="selectedPerson">
        <v-card-text class="pa-6 text-center">
          <v-avatar size="72" color="secondary" class="mb-3">
            <v-icon icon="mdi-account" size="32" color="white" />
          </v-avatar>
          <h2 class="display-title--sm mb-1">{{ selectedPerson.firstName }}</h2>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ selectedPerson.relationLabel }}</p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="miniDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.member-card__emoji {
  font-size: 40px;
  line-height: 1;
}

.family-tree {
  overflow-x: auto;
  padding-bottom: 8px;
}

.family-tree :deep(.tree-row),
.family-tree :deep(.tree-connectors) {
  min-width: 820px;
}

.tree-connectors {
  display: grid;
  height: 32px;
}

.tree-connectors__stem {
  border-left: 2px solid rgb(var(--v-theme-primary));
  justify-self: center;
  width: 0;
}

.tree-connectors__stem--up {
  height: 50%;
  align-self: start;
}

.tree-connectors__stem--down {
  height: 50%;
  align-self: end;
}

.tree-connectors__bus {
  align-self: center;
  height: 0;
  border-top: 2px solid rgb(var(--v-theme-primary));
}
</style>
