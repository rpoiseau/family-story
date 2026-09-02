<script setup lang="ts">
import FamilyTreeCard from './FamilyTreeCard.vue'
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTree, FamilyTreePerson } from '@/types/family-tree'

const props = defineProps<{
  tree: FamilyTree
  portraitById: Map<string, FamilyMember>
}>()

const emit = defineEmits<{ select: [person: FamilyTreePerson] }>()

const generations = [...new Set(props.tree.persons.map((person) => person.generation))].sort(
  (a, b) => a - b,
)

function personsInGeneration(generation: number) {
  return props.tree.persons.filter((person) => person.generation === generation)
}
</script>

<template>
  <div>
    <div v-for="generation in generations" :key="generation" class="tree-mobile-group">
      <div class="text-caption text-medium-emphasis font-weight-bold mb-2">
        Génération {{ generation + 1 }}
      </div>
      <div class="tree-mobile-group__list">
        <div
          v-for="person in personsInGeneration(generation)"
          :key="person.id"
          class="tree-mobile-group__item"
        >
          <FamilyTreeCard
            :person="person"
            :portrait="portraitById.get(person.id)"
            size="compact"
            @select="emit('select', person)"
          />
          <div v-if="person.relationLabel" class="text-caption text-medium-emphasis mt-1">
            {{ person.relationLabel }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-mobile-group {
  margin-bottom: 24px;
}

.tree-mobile-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tree-mobile-group__item {
  width: 96px;
  text-align: center;
}
</style>
