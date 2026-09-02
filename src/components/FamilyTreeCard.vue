<script setup lang="ts">
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTreePerson } from '@/types/family-tree'

const props = withDefaults(
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
    variant="flat"
    hover
    @click="emit('select')"
  >
    <v-avatar
      :size="size === 'compact' ? 40 : 64"
      :color="props.portrait?.image || props.portrait?.emoji ? 'surface' : 'secondary'"
      class="tree-card__avatar"
    >
      <v-img v-if="portrait?.image" :src="portrait.image" :alt="portrait.imageAlt" cover />
      <span v-else-if="portrait?.emoji" class="tree-card__emoji">{{ portrait.emoji }}</span>
      <v-icon v-else icon="mdi-account" :size="size === 'compact' ? 22 : 32" color="white" />
    </v-avatar>
    <div class="tree-card__name">{{ person.firstName }}</div>
  </v-card>
</template>

<style scoped>
.tree-card {
  position: relative;
  overflow: visible;
  padding: 10px 8px 8px;
  width: 100px;
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 16px;
}

.tree-card--compact {
  padding: 8px 6px 6px;
  width: 80px;
  border-radius: 14px;
}

.tree-card__avatar {
  margin: 0 auto 6px;
  box-shadow: 0 0 0 3px rgb(var(--v-theme-surface)),
    0 0 0 4px rgba(var(--v-theme-primary), 0.35);
}

.tree-card--compact .tree-card__avatar {
  box-shadow: 0 0 0 2px rgb(var(--v-theme-surface)),
    0 0 0 3px rgba(var(--v-theme-primary), 0.35);
}

.tree-card__emoji {
  font-size: 26px;
  line-height: 1;
}

.tree-card__name {
  font-weight: 700;
  font-size: 0.85rem;
  line-height: 1.15;
  color: rgb(var(--v-theme-on-surface));
}

.tree-card--compact .tree-card__name {
  font-size: 0.75rem;
}
</style>
