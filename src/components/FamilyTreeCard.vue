<script setup lang="ts">
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTreePerson } from '@/types/family-tree'

withDefaults(
  defineProps<{
    person: FamilyTreePerson
    portrait?: FamilyMember | null
    size?: 'default' | 'compact'
  }>(),
  { portrait: null, size: 'default' },
)

const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <v-card
    class="tree-card lift-on-hover text-center"
    :class="{ 'tree-card--compact': size === 'compact' }"
    hover
    @click="emit('select')"
  >
    <v-avatar :size="size === 'compact' ? 40 : 64" color="secondary" class="tree-card__avatar">
      <v-img v-if="portrait?.image" :src="portrait.image" :alt="portrait.imageAlt" />
      <span v-else-if="portrait?.emoji" class="tree-card__emoji">{{ portrait.emoji }}</span>
      <v-icon v-else icon="mdi-account" :size="size === 'compact' ? 22 : 32" color="white" />
    </v-avatar>
    <div class="tree-card__name">{{ person.firstName }}</div>
  </v-card>
</template>

<style scoped>
.tree-card {
  padding: 10px 8px;
  width: 96px;
}

.tree-card--compact {
  padding: 6px;
  width: 76px;
}

.tree-card__avatar {
  margin: 0 auto 6px;
}

.tree-card__emoji {
  font-size: 26px;
  line-height: 1;
}

.tree-card__name {
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1.15;
}

.tree-card--compact .tree-card__name {
  font-size: 0.75rem;
}
</style>
