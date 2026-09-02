<script setup lang="ts">
import { useDisplay } from 'vuetify'
import eventsData from '@/data/events.json'
import type { TimelineEvent } from '@/types/timeline-event'

const { mobile } = useDisplay()

const events: TimelineEvent[] = (eventsData as TimelineEvent[])
  .filter((event) => event.published)
  .sort((a, b) => a.sortKey - b.sortKey)
</script>

<template>
  <v-container>
    <h1 class="display-title mb-2">Timeline</h1>
    <p class="text-subtitle-1 text-medium-emphasis mb-6">
      Des traumatismes fondateurs aux prédictions pour les cinq prochaines années.
    </p>
    <v-divider class="mb-8" />

    <v-timeline :side="mobile ? 'end' : undefined" align="start" density="comfortable">
      <v-timeline-item
        v-for="event in events"
        :key="event.id"
        :dot-color="event.kind === 'prediction' ? 'secondary' : 'primary'"
        :icon="event.icon"
        icon-color="white"
        size="small"
      >
        <template #opposite>
          <span class="font-weight-bold text-medium-emphasis">{{ event.label }}</span>
        </template>

        <v-card class="pa-4 lift-on-hover" variant="outlined">
          <div v-if="mobile" class="text-caption text-medium-emphasis mb-1">{{ event.label }}</div>
          <div class="d-flex align-center flex-wrap ga-3 mb-2">
            <h2 class="text-h6 font-weight-bold">{{ event.title }}</h2>
            <v-chip
              :color="event.kind === 'prediction' ? 'secondary' : 'primary'"
              variant="tonal"
              size="x-small"
            >
              {{ event.kind === 'prediction' ? 'Prédiction' : 'Déjà arrivé' }}
            </v-chip>
          </div>
          <p class="text-body-2 mb-0">{{ event.description }}</p>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <div class="text-center mt-10">
      <v-btn to="/" color="primary" variant="flat">Retour à l'accueil</v-btn>
    </div>
  </v-container>
</template>
