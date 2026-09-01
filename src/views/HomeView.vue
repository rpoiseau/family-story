<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const rubriques = [
  { label: 'La famille', to: '/famille', icon: 'mdi-account-group' },
  { label: 'What Brandon Think', to: '/what-brandon-think', icon: 'mdi-thought-bubble' },
  { label: 'Arbre généalogique', to: '/arbre-genealogique', icon: 'mdi-family-tree' },
  { label: 'Timeline', to: '/timeline', icon: 'mdi-timeline-clock' },
]

const citations = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
]
</script>

<template>
  <v-container>
    <v-sheet
      color="grey-lighten-3"
      :height="mdAndUp ? 320 : 200"
      rounded
      class="d-flex flex-column align-center justify-center text-center mb-8"
    >
      <v-icon icon="mdi-image-outline" size="48" color="grey-darken-1" />
      <p class="text-grey-darken-1 mt-2 mb-0">Image principale à venir</p>
    </v-sheet>

    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="mb-4">Family Story</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </v-col>
    </v-row>

    <v-row class="mb-8">
      <v-col v-for="rubrique in rubriques" :key="rubrique.to" cols="6" md="3">
        <v-card :to="rubrique.to" variant="outlined" class="text-center pa-4 lift-on-hover" hover>
          <v-icon :icon="rubrique.icon" size="32" class="mb-2" />
          <div>{{ rubrique.label }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card
          v-for="(citation, index) in citations"
          :key="index"
          variant="tonal"
          class="pa-4 mb-4"
        >
          <p class="font-italic mb-0">« {{ citation }} »</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
