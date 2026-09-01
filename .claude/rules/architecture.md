# Architecture frontend

- Utiliser Vue 3, TypeScript, Vite, Vuetify 3 et Vue Router.
- Utiliser la Composition API avec `<script setup>`.
- Ne créer aucun backend, serveur applicatif, API privée ou base de données.
- Interdire Pinia jusqu'à ce qu'un besoin réel soit démontré et validé.
- Préférer les composants Vuetify aux composants visuels personnalisés lorsqu'ils répondent au besoin.
- Séparer les vues, composants réutilisables, données, types et assets.
- Ne pas modifier l'architecture sans accord explicite.
- Toute nouvelle dépendance nécessite une proposition et un accord explicite avant installation.

Organisation cible initiale :

```text
src/
├── assets/
│   └── images/
├── components/
├── data/
│   ├── family-members.json
│   ├── events.json
│   └── brandon-thoughts.json
├── router/
├── types/
└── views/
```

Adapter cette structure à l'existant uniquement après inspection et sans écraser les choix déjà présents.
