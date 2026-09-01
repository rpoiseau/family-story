<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <v-container class="text-center py-12">
    <v-icon :icon="icon" size="64" color="secondary" class="mb-4" />
    <h1 class="display-title mb-2">{{ title }}</h1>
    <v-chip color="primary" variant="tonal" class="mb-6">En construction</v-chip>
    <div>
      <v-btn to="/" color="primary" variant="flat">Retour à l'accueil</v-btn>
    </div>
  </v-container>
</template>
