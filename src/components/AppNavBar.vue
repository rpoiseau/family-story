<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(false)
const route = useRoute()

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'La famille', to: '/famille' },
  { label: 'What Brandon Think', to: '/what-brandon-think' },
  { label: 'Arbre généalogique', to: '/arbre-genealogique' },
  { label: 'Timeline', to: '/timeline' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <v-app-bar flat border>
    <v-app-bar-nav-icon class="d-flex d-md-none" @click="drawer = !drawer" />

    <v-toolbar-title>Family Story</v-toolbar-title>

    <v-spacer />

    <div class="d-none d-md-flex">
      <v-btn
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        variant="text"
        :color="isActive(link.to) ? 'primary' : undefined"
      >
        {{ link.label }}
      </v-btn>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary class="d-flex d-md-none">
    <v-list nav>
      <v-list-item
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :title="link.label"
        :active="isActive(link.to)"
        color="primary"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>
