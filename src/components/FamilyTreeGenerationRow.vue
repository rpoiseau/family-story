<script setup lang="ts">
import FamilyTreeCard from './FamilyTreeCard.vue'
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTreeBlock, FamilyTreePerson } from '@/types/family-tree'

defineProps<{
  blocks: FamilyTreeBlock[]
  totalColumns: number
  portraitById: Map<string, FamilyMember>
}>()

const emit = defineEmits<{ select: [person: FamilyTreePerson] }>()
</script>

<template>
  <div class="tree-row" :style="{ gridTemplateColumns: `repeat(${totalColumns}, 1fr)` }">
    <div
      v-for="block in blocks"
      :key="block.id"
      class="tree-row__block"
      :style="{ gridColumn: `${block.startColumn} / span ${block.span}` }"
    >
      <template v-if="block.persons.length === 2">
        <FamilyTreeCard
          :person="block.persons[0]!"
          :portrait="portraitById.get(block.persons[0]!.id)"
          @select="emit('select', block.persons[0]!)"
        />
        <div class="tree-row__union" :class="`tree-row__union--${block.unionType}`" />
        <FamilyTreeCard
          :person="block.persons[1]!"
          :portrait="portraitById.get(block.persons[1]!.id)"
          @select="emit('select', block.persons[1]!)"
        />
      </template>
      <FamilyTreeCard
        v-else
        :person="block.persons[0]!"
        :portrait="portraitById.get(block.persons[0]!.id)"
        @select="emit('select', block.persons[0]!)"
      />
    </div>
  </div>
</template>

<style scoped>
.tree-row {
  display: grid;
  align-items: start;
  justify-items: center;
}

.tree-row__block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tree-row__union {
  width: 20px;
  height: 0;
  border-top: 2px solid rgb(var(--v-theme-primary));
  flex: none;
}

.tree-row__union--compagnon {
  border-top-style: dashed;
}
</style>
