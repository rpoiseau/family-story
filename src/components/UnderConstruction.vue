<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <v-container class="text-center py-12">
    <v-icon :icon="icon" size="64" color="grey-darken-1" class="mb-4" />
    <h1 class="mb-2">{{ title }}</h1>
    <v-chip color="grey-darken-1" variant="tonal" class="mb-6">En construction</v-chip>
    <div>
      <v-btn to="/" variant="text">Retour à l'accueil</v-btn>
    </div>
  </v-container>
</template>
