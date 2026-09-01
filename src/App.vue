<script setup lang="ts">
import AppNavBar from './components/AppNavBar.vue'
</script>

<template>
  <v-app>
    <AppNavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
