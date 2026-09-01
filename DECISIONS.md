# Décisions validées - Family Story

## Produit

- Site vitrine familial nommé **Family Story**.
- Contenu destiné fonctionnellement aux membres d'une seule famille, mais publié sur une GitHub Pages publique.
- Toutes les informations réelles doivent être pseudonymisées.
- Aucun mineur ne doit être présenté.
- Le contenu familial et les images seront fournis progressivement par l'utilisateur.
- Toute image et tout portrait réels nécessitent une validation explicite avant intégration.
- Le seul contenu temporaire autorisé est `Lorem ipsum`.

## Pages

- Accueil
- La famille
- What Brandon Think, en construction
- Arbre généalogique, en construction
- Timeline, en construction
- Page 404
- Pas de galerie dédiée
- Pas de contact

## Accueil

- Bref descriptif du site et de la famille
- Liens vers les rubriques
- Citations
- Grande image principale fournie ultérieurement
- Menu horizontal sur ordinateur, hamburger sur mobile

## La famille

- Grille de cartes ouvrant une fiche détaillée
- Portraits satiriques exclusivement rédigés par l'utilisateur
- Structure JSON initiale approuvée : `id`, `displayName`, `portrait`, `image`, `imageAlt`, `tags`, `order`, `published`

## Technique

- Vue 3, Composition API et `<script setup>`
- TypeScript
- Vite
- Vuetify 4 (mise à jour du 2026-09-01 : Vuetify 4.1.12 déjà installée localement au moment de l'inspection du lot 0, actée comme version cible à la place de Vuetify 3 initialement mentionnée)
- Vue Router
- npm
- `nvm use stable` avant toute commande npm
- Pinia interdit sans besoin réel et validation
- Nouvelle dépendance interdite sans accord explicite
- Données dans des fichiers JSON locaux avec types TypeScript correspondants
- Images stockées dans le dépôt
- Frontend uniquement

## Design

- Moderne, familial et ludique
- Interface soignée, claire et responsive
- Mobile first
- Thème clair uniquement
- Animations petites et discrètes
- Deux dernières versions de Chrome, Edge, Firefox et Safari

## Qualité

- Aucun framework de test imposé pour la première version
- Le build est la vérification minimale obligatoire
- ESLint, Prettier et Stylelint ne sont pas imposés par principe ; respecter néanmoins les outils déjà présents dans le dépôt
- Aucun objectif formel WCAG ou de couverture de tests

## Git et livraison

- Branche principale : `main`
- Déploiement automatique par GitHub Actions vers GitHub Pages
- Commits locaux autorisés et créés automatiquement après validation d'une tâche
- `git push` et toute publication distante interdits
- Commandes Git destructrices ou de réécriture interdites sans accord explicite
- Les modifications préexistantes ne doivent jamais être annulées ou écrasées

## Lots

1. Lot 0 : initialisation et socle technique
2. Lot 1 : structure générale, thème et navigation
3. Lot 2 : page d'accueil
4. Lot 3 : page La famille
5. Lot 4 : page What Brandon Think
6. Lot 5 : pages Arbre généalogique et Timeline en construction
7. Lot 6 : responsive, finitions visuelles et animations
8. Lot 7 : GitHub Actions et déploiement GitHub Pages

Chaque lot doit être validé avant de commencer le suivant. À sa fin, fournir un résumé, les fichiers modifiés, le résultat du build, les décisions restantes, les vérifications manuelles et la proposition du lot suivant.
