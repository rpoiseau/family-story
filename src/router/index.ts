import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/famille',
      name: 'famille',
      component: () => import('../views/FamilleView.vue'),
    },
    {
      path: '/what-brandon-think',
      name: 'what-brandon-think',
      component: () => import('../views/WhatBrandonThinkView.vue'),
    },
    {
      path: '/arbre-genealogique',
      name: 'arbre-genealogique',
      component: () => import('../views/ArbreGenealogiqueView.vue'),
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
