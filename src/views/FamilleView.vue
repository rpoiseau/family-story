<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import QuoteBlock from '@/components/QuoteBlock.vue'
import FamilyTreeCanvas from '@/components/FamilyTreeCanvas.vue'
import familyMembersData from '@/data/family-members.json'
import familyTreeData from '@/data/family-tree.json'
import type { FamilyMember } from '@/types/family-member'
import type { FamilyTree, FamilyTreePerson } from '@/types/family-tree'

const { mobile } = useDisplay()

const familyMembers: FamilyMember[] = (familyMembersData as FamilyMember[])
  .filter((member) => member.published)
  .sort((a, b) => a.order - b.order)

const portraitById = new Map(familyMembers.map((member) => [member.id, member]))

const tree = familyTreeData as FamilyTree

const selectedMember = ref<FamilyMember | null>(null)
const dialog = ref(false)
const selectedPerson = ref<FamilyTreePerson | null>(null)
const miniDialog = ref(false)

function openPerson(person: FamilyTreePerson) {
  const portrait = portraitById.get(person.id)
  if (portrait) {
    selectedMember.value = portrait
    dialog.value = true
  } else {
    selectedPerson.value = person
    miniDialog.value = true
  }
}

function paragraphs(portrait: string): string[] {
  return portrait.split('\n\n')
}
</script>

<template>
  <v-container>
    <h1 class="display-title mb-2">La famille</h1>
    <p class="text-subtitle-1 text-medium-emphasis mb-6">
      🎭 L'arbre au vitriol : qui descend de qui dans ce zoo ? 🌳
    </p>
    <v-divider class="mb-8" />

    <div class="tree-panel">
      <FamilyTreeCanvas :tree="tree" :portrait-by-id="portraitById" @select="openPerson" />
    </div>

    <v-dialog v-model="dialog" max-width="640" :fullscreen="mobile" scrollable>
      <v-card v-if="selectedMember" class="position-relative">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          class="dialog-close"
          aria-label="Fermer"
          @click="dialog = false"
        />
        <v-card-text class="pa-6">
          <div class="d-flex flex-column align-center text-center mb-4">
            <v-avatar size="96" color="secondary" class="mb-4">
              <v-img
                v-if="selectedMember.image"
                :src="selectedMember.image"
                :alt="selectedMember.imageAlt"
              />
              <span v-else class="member-card__emoji">{{ selectedMember.emoji }}</span>
            </v-avatar>
            <h2 class="display-title--sm">{{ selectedMember.displayName }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis mb-0">{{ selectedMember.role }}</p>
          </div>

          <p
            v-for="(paragraph, index) in paragraphs(selectedMember.portrait)"
            :key="index"
            class="text-body-1"
          >
            {{ paragraph }}
          </p>

          <QuoteBlock
            v-for="(quote, index) in selectedMember.quotes"
            :key="`quote-${index}`"
            :text="quote"
            dense
          />

          <div v-if="selectedMember.tags.length" class="mt-4">
            <v-chip
              v-for="tag in selectedMember.tags"
              :key="tag"
              color="primary"
              variant="tonal"
              size="small"
              class="me-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="miniDialog" max-width="360">
      <v-card v-if="selectedPerson" class="position-relative">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          class="dialog-close"
          aria-label="Fermer"
          @click="miniDialog = false"
        />
        <v-card-text class="pa-6 text-center">
          <v-avatar size="72" color="secondary" class="mb-3">
            <v-icon icon="mdi-account" size="32" color="white" />
          </v-avatar>
          <h2 class="display-title--sm mb-1">{{ selectedPerson.firstName }}</h2>
          <p class="text-body-2 text-medium-emphasis mb-0">{{ selectedPerson.relationLabel }}</p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="miniDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.member-card__emoji {
  font-size: 40px;
  line-height: 1;
}

.dialog-close {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.tree-panel {
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-secondary), 0.1),
    rgba(var(--v-theme-secondary), 0.02)
  );
  border: 1px solid rgba(var(--v-theme-secondary), 0.25);
  border-radius: 24px;
  padding: 20px 12px;
}

@media (min-width: 960px) {
  .tree-panel {
    padding: 36px 32px;
  }
}
</style>
