<script setup lang="ts">
import AppNavBar from './components/AppNavBar.vue'
</script>

<template>
  <v-app>
    <AppNavBar />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lift-on-hover {
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.lift-on-hover:hover {
  transform: translateY(-2px);
}
</style>
