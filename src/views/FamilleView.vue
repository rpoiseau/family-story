<script setup lang="ts">
import { ref } from 'vue'
import familyMembersData from '@/data/family-members.json'
import type { FamilyMember } from '@/types/family-member'

const familyMembers: FamilyMember[] = familyMembersData
  .filter((member) => member.published)
  .sort((a, b) => a.order - b.order)

const selectedMember = ref<FamilyMember | null>(null)
const dialog = ref(false)

function openMember(member: FamilyMember) {
  selectedMember.value = member
  dialog.value = true
}
</script>

<template>
  <v-container>
    <h1 class="mb-6">La famille</h1>

    <v-row>
      <v-col v-for="member in familyMembers" :key="member.id" cols="6" sm="4" md="3">
        <v-card class="text-center pa-4" hover @click="openMember(member)">
          <v-avatar size="80" color="grey-lighten-3" class="mb-2">
            <v-img v-if="member.image" :src="member.image" :alt="member.imageAlt" />
            <v-icon v-else icon="mdi-account" size="40" color="grey-darken-1" />
          </v-avatar>
          <div>{{ member.displayName }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="480">
      <v-card v-if="selectedMember">
        <v-card-item>
          <div class="d-flex flex-column align-center text-center pa-4">
            <v-avatar size="96" color="grey-lighten-3" class="mb-4">
              <v-img
                v-if="selectedMember.image"
                :src="selectedMember.image"
                :alt="selectedMember.imageAlt"
              />
              <v-icon v-else icon="mdi-account" size="48" color="grey-darken-1" />
            </v-avatar>
            <v-card-title>{{ selectedMember.displayName }}</v-card-title>
            <v-card-text>{{ selectedMember.portrait }}</v-card-text>
          </div>
        </v-card-item>
        <v-card-actions class="justify-center">
          <v-btn variant="text" @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
