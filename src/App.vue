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

.section-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-kicker__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  white-space: nowrap;
}

.section-kicker__line {
  flex: 1 1 auto;
  height: 1px;
  background-color: rgba(var(--v-theme-on-surface), 0.15);
}

.display-title {
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-size: 2.25rem;
}

@media (min-width: 960px) {
  .display-title {
    font-size: 3.75rem;
  }
}

.display-title--sm {
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-size: 1.75rem;
}

@media (min-width: 960px) {
  .display-title--sm {
    font-size: 2.5rem;
  }
}
</style>
