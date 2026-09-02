<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    dense?: boolean
  }>(),
  { dense: false },
)
</script>

<template>
  <v-sheet rounded="lg" class="quote-block" :class="{ 'quote-block--dense': dense }">
    <v-icon icon="mdi-format-quote-open" :size="dense ? 20 : 28" color="primary" class="mb-1" />
    <p class="font-italic mb-0 text-high-emphasis" :class="dense ? 'text-body-1' : 'text-h6'">
      {{ text }}
    </p>
  </v-sheet>
</template>

<style scoped>
.quote-block {
  background-color: rgba(var(--v-theme-secondary), 0.16);
  padding: 24px;
  margin-bottom: 16px;
}

.quote-block--dense {
  padding: 16px;
  margin-bottom: 12px;
}
</style>
