<script setup lang="ts">
import { useDisplay } from 'vuetify'
import QuoteBlock from '@/components/QuoteBlock.vue'
import familyImage from '@/assets/images/family.png'
import brandonReport from '@/data/brandon-thoughts.json'
import familyMembersData from '@/data/family-members.json'
import type { BrandonReport } from '@/types/brandon-report'
import type { FamilyMember } from '@/types/family-member'

const { mdAndUp } = useDisplay()

const report = brandonReport as BrandonReport

const familyMembers = familyMembersData as FamilyMember[]
const memberById = new Map(familyMembers.map((member) => [member.id, member]))

// Sélection éditoriale des meilleures citations, une par membre, référencées par index
// dans le tableau `quotes` de family-members.json (source unique, pas de duplication de texte).
const bestQuoteRefs = [
  { memberId: 'caroline', index: 4 },
  { memberId: 'antoine', index: 1 },
  { memberId: 'romain', index: 5 },
  { memberId: 'vale', index: 0 },
  { memberId: 'bernard', index: 1 },
  { memberId: 'agathe', index: 2 },
  { memberId: 'tom', index: 0 },
  { memberId: 'lucie', index: 0 },
  { memberId: 'louise', index: 1 },
  { memberId: 'michel', index: 4 },
  { memberId: 'pierre', index: 0 },
]

const bestQuotes = bestQuoteRefs
  .map(({ memberId, index }) => {
    const member = memberById.get(memberId)
    const text = member?.quotes[index]
    return member && text ? { text, author: member.displayName } : null
  })
  .filter((quote): quote is { text: string; author: string } => quote !== null)

const rubriques = [
  {
    label: 'La famille',
    to: '/famille',
    icon: 'mdi-family-tree',
    description: 'Le trombinoscope au vitriol, en arbre généalogique : qui descend de qui ?',
  },
  {
    label: 'What Brandon Think',
    to: '/what-brandon-think',
    icon: 'mdi-thought-bubble',
    description: 'Le rapport intégral : géopolitique du clan, piliers fondateurs et trophées.',
  },
  {
    label: 'Timeline',
    to: '/timeline',
    icon: 'mdi-timeline-clock',
    description: 'Des traumatismes fondateurs aux prédictions pour les cinq prochaines années.',
  },
]
</script>

<template>
  <v-container>
    <v-sheet rounded class="mb-8 overflow-hidden hero-image-wrapper">
      <v-img
        :src="familyImage"
        alt="Portrait illustré de la famille"
        :height="mdAndUp ? 320 : 200"
        cover
      />
    </v-sheet>

    <v-row justify="center" class="mb-10">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-title mb-4">{{ report.title }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis mb-6">{{ report.subtitle }}</p>
        <p class="text-body-1 mb-4">{{ report.intro[1] }}</p>
        <p class="text-body-1 mb-0">{{ report.intro[2] }}</p>
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
                {{ rubrique.description }}
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
          <v-carousel
            cycle
            :interval="6000"
            :height="mdAndUp ? 200 : 260"
            hide-delimiter-background
            :show-arrows="mdAndUp ? 'hover' : false"
            color="primary"
            class="quote-carousel"
          >
            <v-carousel-item
              v-for="(quote, index) in bestQuotes"
              :key="index"
              :transition="false"
              :reverse-transition="false"
            >
              <div class="quote-carousel__slide">
                <QuoteBlock :text="quote.text" />
                <p class="text-center text-medium-emphasis text-body-2 mb-0">
                  — {{ quote.author }}
                </p>
              </div>
            </v-carousel-item>
          </v-carousel>
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

.quote-carousel__slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
}

.rubrique-row__icon {
  width: 56px;
  height: 56px;
}
</style>
