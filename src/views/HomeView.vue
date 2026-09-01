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

    <v-row justify="center" class="mb-10">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-title mb-4">Family Story</h1>
        <p class="text-body-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </v-col>
    </v-row>

    <div class="mb-10">
      <div class="section-kicker">
        <span class="section-kicker__label">Rubriques</span>
        <span class="section-kicker__line" />
      </div>

      <div>
        <div
          v-for="rubrique in rubriques"
          :key="rubrique.to"
          class="rubrique-row lift-on-hover"
        >
          <v-row align="center">
            <v-col cols="auto">
              <v-sheet
                color="secondary"
                rounded="lg"
                class="d-flex align-center justify-center rubrique-row__icon"
              >
                <v-icon :icon="rubrique.icon" size="28" color="white" />
              </v-sheet>
            </v-col>
            <v-col>
              <h2 class="display-title--sm">{{ rubrique.label }}</h2>
              <p class="text-body-2 text-medium-emphasis mb-0 d-none d-sm-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </v-col>
            <v-col cols="auto">
              <v-btn :to="rubrique.to" color="primary" variant="flat">Découvrir</v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-4" />
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div class="section-kicker">
        <span class="section-kicker__label">Citations</span>
        <span class="section-kicker__line" />
      </div>

      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-sheet
            v-for="(citation, index) in citations"
            :key="index"
            rounded="lg"
            class="pa-6 mb-4 quote-sheet"
          >
            <v-icon icon="mdi-format-quote-open" size="28" color="primary" class="mb-2" />
            <p class="text-h6 font-italic mb-0 text-high-emphasis">{{ citation }}</p>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.rubrique-row {
  padding-top: 20px;
  padding-bottom: 4px;
}

.rubrique-row__icon {
  width: 56px;
  height: 56px;
}

.quote-sheet {
  background-color: rgba(var(--v-theme-secondary), 0.16);
}
</style>
