<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { linkVertical } from 'd3-shape'
import FamilyTreeCard from './FamilyTreeCard.vue'
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTree, FamilyTreePerson } from '@/types/family-tree'

const props = defineProps<{
  tree: FamilyTree
  portraitById: Map<string, FamilyMember>
}>()

const emit = defineEmits<{ select: [person: FamilyTreePerson] }>()

const { mobile } = useDisplay()

const cardSize = computed(() => (mobile.value ? 'compact' : 'default'))
const columnWidth = computed(() => (mobile.value ? 96 : 132))
const rowHeight = computed(() => (mobile.value ? 128 : 168))
const cardHeight = computed(() => (mobile.value ? 84 : 108))
const labelGutter = computed(() => (mobile.value ? 76 : 104))

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

const { columns: personColumns, totalColumns } = computePersonColumns(props.tree)

interface PositionedPerson extends FamilyTreePerson {
  x: number
  y: number
}

const positioned = computed<PositionedPerson[]>(() =>
  props.tree.persons.map((person) => ({
    ...person,
    x: labelGutter.value + ((personColumns.get(person.id) ?? 0) + 0.5) * columnWidth.value,
    y: person.generation * rowHeight.value,
  })),
)

const positionById = computed(() => new Map(positioned.value.map((person) => [person.id, person])))

const generationLabels = computed(() => {
  const generations = [...new Set(props.tree.persons.map((person) => person.generation))].sort(
    (a, b) => a - b,
  )
  return generations.map((generation) => ({ generation, y: generation * rowHeight.value }))
})

const spouseLinks = computed(() => {
  const links: { id: string; x1: number; x2: number; y: number; dashed: boolean }[] = []
  for (const union of props.tree.unions) {
    if (union.partners.length !== 2) continue
    const a = positionById.value.get(union.partners[0]!)
    const b = positionById.value.get(union.partners[1]!)
    if (!a || !b) continue
    links.push({
      id: union.id,
      x1: Math.min(a.x, b.x),
      x2: Math.max(a.x, b.x),
      y: a.y + cardHeight.value / 2,
      dashed: union.type === 'compagnon',
    })
  }
  return links
})

const linkGenerator = linkVertical<{ source: { x: number; y: number }; target: { x: number; y: number } }, { x: number; y: number }>()
  .source((link) => link.source)
  .target((link) => link.target)
  .x((point) => point.x)
  .y((point) => point.y)

const branchLinks = computed(() => {
  const paths: { id: string; d: string }[] = []
  for (const union of props.tree.unions) {
    if (!union.children.length) continue
    const parents = union.partners
      .map((id) => positionById.value.get(id))
      .filter((person): person is PositionedPerson => Boolean(person))
    if (!parents.length) continue

    const anchor = {
      x: parents.reduce((sum, person) => sum + person.x, 0) / parents.length,
      y: parents[0]!.y + cardHeight.value + 6,
    }

    for (const childId of union.children) {
      const child = positionById.value.get(childId)
      if (!child) continue
      const d = linkGenerator({
        source: anchor,
        target: { x: child.x, y: child.y - 6 },
      })
      if (d) paths.push({ id: `${union.id}-${childId}`, d })
    }
  }
  return paths
})

const canvasWidth = computed(() => labelGutter.value + totalColumns * columnWidth.value)
const canvasHeight = computed(() => {
  const maxGeneration = Math.max(...props.tree.persons.map((person) => person.generation))
  return (maxGeneration + 1) * rowHeight.value
})
</script>

<template>
  <div class="tree-canvas-wrapper">
    <div
      class="tree-canvas"
      :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }"
    >
      <svg
        class="tree-canvas__svg"
        :width="canvasWidth"
        :height="canvasHeight"
        :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
      >
        <path
          v-for="link in branchLinks"
          :key="link.id"
          :d="link.d"
          class="tree-canvas__branch"
        />
        <line
          v-for="link in spouseLinks"
          :key="link.id"
          :x1="link.x1"
          :x2="link.x2"
          :y1="link.y"
          :y2="link.y"
          class="tree-canvas__spouse"
          :class="{ 'tree-canvas__spouse--dashed': link.dashed }"
        />
      </svg>

      <div
        v-for="label in generationLabels"
        :key="label.generation"
        class="tree-canvas__label"
        :style="{ top: `${label.y}px` }"
      >
        Génération {{ label.generation + 1 }}
      </div>

      <div
        v-for="person in positioned"
        :key="person.id"
        class="tree-canvas__node"
        :style="{ left: `${person.x}px`, top: `${person.y}px` }"
      >
        <FamilyTreeCard
          :person="person"
          :portrait="portraitById.get(person.id)"
          :size="cardSize"
          @select="emit('select', person)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-canvas-wrapper {
  overflow: auto;
  padding-bottom: 8px;
}

.tree-canvas {
  position: relative;
}

.tree-canvas__svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.tree-canvas__branch {
  fill: none;
  stroke: rgba(var(--v-theme-primary), 0.45);
  stroke-width: 2;
  stroke-linecap: round;
}

.tree-canvas__spouse {
  stroke: rgba(var(--v-theme-primary), 0.45);
  stroke-width: 2;
  stroke-linecap: round;
}

.tree-canvas__spouse--dashed {
  stroke-dasharray: 3 5;
}

.tree-canvas__label {
  position: absolute;
  left: 0;
  width: 88px;
  padding: 3px 10px 3px 0;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: right;
  color: rgba(var(--v-theme-on-surface), 0.45);
}

.tree-canvas__node {
  position: absolute;
  transform: translate(-50%, 0);
}
</style>
