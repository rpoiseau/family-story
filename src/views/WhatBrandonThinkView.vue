<script setup lang="ts">
import QuoteBlock from '@/components/QuoteBlock.vue'
import brandonReport from '@/data/brandon-thoughts.json'
import type { BrandonReport } from '@/types/brandon-report'

const report = brandonReport as BrandonReport
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <h1 class="display-title mb-3">{{ report.title }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-4">{{ report.subtitle }}</p>

        <div class="d-flex align-center mb-8">
          <v-avatar size="44" color="primary" class="me-3">
            <v-icon icon="mdi-thought-bubble" color="white" />
          </v-avatar>
          <div>
            <div class="font-weight-bold">{{ report.author }}</div>
            <div class="text-caption text-medium-emphasis">{{ report.authorTagline }}</div>
          </div>
        </div>

        <p v-for="(paragraph, index) in report.intro" :key="index" class="text-body-1">
          {{ paragraph }}
        </p>

        <!-- Géopolitique -->
        <div class="section-kicker mt-12">
          <span class="section-kicker__label">🗺️ Géopolitique</span>
          <span class="section-kicker__line" />
        </div>
        <h2 class="display-title--sm mb-4">{{ report.zonesTitle }}</h2>
        <p class="text-body-1 mb-6">{{ report.zonesIntro }}</p>

        <v-row>
          <v-col v-for="zone in report.zones" :key="zone.id" cols="12" sm="6">
            <v-card variant="flat" class="pa-5 h-100 lift-on-hover zone-card">
              <div class="text-h5 mb-2">{{ zone.emoji }}</div>
              <h3 class="text-h6 font-weight-bold">{{ zone.name }}</h3>
              <p class="text-caption text-medium-emphasis mb-2">{{ zone.places }}</p>
              <p class="text-body-2 mb-0">{{ zone.description }}</p>
            </v-card>
          </v-col>
        </v-row>

        <!-- Piliers -->
        <div class="section-kicker mt-12">
          <span class="section-kicker__label">💥 Piliers fondateurs</span>
          <span class="section-kicker__line" />
        </div>
        <h2 class="display-title--sm mb-4">{{ report.pillarsTitle }}</h2>

        <v-sheet rounded="lg" border class="pa-5 mb-8">
          <p class="text-overline mb-2">Élection du pire traumatisme familial</p>
          <ol class="ps-5 mb-0">
            <li v-for="(item, index) in report.pillarsSummary" :key="index" class="text-body-2">
              {{ item }}
            </li>
          </ol>
        </v-sheet>

        <div v-for="pillar in report.pillars" :key="pillar.id" class="mb-10">
          <h3 class="text-h6 font-weight-bold mb-3">{{ pillar.emoji }} {{ pillar.title }}</h3>
          <p v-for="(paragraph, index) in pillar.paragraphs" :key="index" class="text-body-1">
            {{ paragraph }}
          </p>
          <ol v-if="pillar.steps.length" class="ps-5 mb-4">
            <li v-for="(step, index) in pillar.steps" :key="index" class="text-body-1 mb-1">
              {{ step }}
            </li>
          </ol>
          <QuoteBlock
            v-for="(quote, index) in pillar.quotes"
            :key="`quote-${index}`"
            :text="quote"
            dense
          />
        </div>

        <!-- Trophées -->
        <div class="section-kicker mt-12">
          <span class="section-kicker__label">🏆 Palmarès</span>
          <span class="section-kicker__line" />
        </div>
        <h2 class="display-title--sm mb-6">{{ report.trophiesTitle }}</h2>

        <v-row>
          <v-col v-for="trophy in report.trophies" :key="trophy.id" cols="12" sm="6">
            <v-card variant="outlined" class="pa-5 h-100 lift-on-hover">
              <v-icon icon="mdi-trophy" color="secondary" size="28" class="mb-2" />
              <h3 class="text-subtitle-1 font-weight-bold">{{ trophy.title }}</h3>
              <p class="text-caption text-primary font-weight-bold mb-2">{{ trophy.laureates }}</p>
              <p v-if="trophy.description" class="text-body-2">{{ trophy.description }}</p>
              <QuoteBlock
                v-for="(quote, index) in trophy.quotes"
                :key="`quote-${index}`"
                :text="quote"
                dense
              />
            </v-card>
          </v-col>
        </v-row>

        <!-- Prédictions -->
        <div class="section-kicker mt-12">
          <span class="section-kicker__label">🔮 Prédictions</span>
          <span class="section-kicker__line" />
        </div>
        <h2 class="display-title--sm mb-6">{{ report.predictionsTitle }}</h2>

        <div v-for="prediction in report.predictions" :key="prediction.id" class="mb-4">
          <v-row align="start">
            <v-col cols="12" sm="3">
              <p class="font-weight-bold text-primary mb-0">{{ prediction.date }}</p>
            </v-col>
            <v-col cols="12" sm="9">
              <p class="text-body-1 mb-0">{{ prediction.description }}</p>
            </v-col>
          </v-row>
          <v-divider class="mt-4" />
        </div>

        <!-- Réactions -->
        <div class="section-kicker mt-12">
          <span class="section-kicker__label">🚨 Réactions</span>
          <span class="section-kicker__line" />
        </div>
        <h2 class="display-title--sm mb-6">{{ report.reactionsTitle }}</h2>

        <div v-for="reaction in report.reactions" :key="reaction.id" class="mb-4">
          <v-row align="start">
            <v-col cols="12" sm="3">
              <p class="font-weight-bold text-primary mb-0">{{ reaction.member }}</p>
            </v-col>
            <v-col cols="12" sm="9">
              <p class="text-body-1 mb-0">{{ reaction.description }}</p>
            </v-col>
          </v-row>
          <v-divider class="mt-4" />
        </div>

        <!-- Conclusion -->
        <v-sheet rounded="lg" color="primary" class="pa-6 mt-10 text-center">
          <p class="text-h6 font-italic mb-0">{{ report.conclusion }}</p>
        </v-sheet>

        <div class="text-center mt-8">
          <v-btn to="/" color="primary" variant="flat">Retour à l'accueil</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.zone-card {
  background-color: rgba(var(--v-theme-secondary), 0.16);
}
</style>
