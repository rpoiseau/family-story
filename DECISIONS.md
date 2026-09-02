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
- La famille, fusionnée avec l'arbre généalogique depuis le 2026-09-02 (voir section dédiée)
- What Brandon Think, alimentée depuis le 2026-09-01
- Timeline, alimentée depuis le 2026-09-01
- Page 404
- Pas de galerie dédiée
- Pas de contact
- `/arbre-genealogique` : route conservée en redirection vers `/famille` (n'apparaît plus dans le menu ni sur l'accueil)

## Contenu éditorial (2026-09-01)

- Source unique du contenu : le rapport satirique « La chti family! » généré par le service What Brandon Thinks à partir du groupe WhatsApp familial (9 754 messages, six ans), fourni par l'utilisateur.
- Mode de reprise validé : **reprise quasi intégrale** du texte du rapport, réparti dans les JSON locaux. Aucune réécriture, aucun ajout inventé.
- Prénoms et communes réels **conservés**, sur décision explicite de l'utilisateur, malgré le caractère public de GitHub Pages.
- Anecdotes de santé et mentions d'enfants **conservées**, sur la même décision.
- La règle « `Lorem ipsum` uniquement » est levée : le site ne contient plus de contenu temporaire.
- Structure `FamilyMember` étendue et validée : ajout de `role`, `emoji` et `quotes` aux champs existants.
- Nouveaux fichiers de données validés : `brandon-thoughts.json` et `events.json`, avec leurs types `BrandonReport` et `TimelineEvent`.
## Arbre généalogique (2026-09-01/02)

- Le rapport Brandon ne fournissant aucune filiation fiable, l'arbre était resté en construction. L'utilisateur a fourni directement, en conversation (mode plan), l'arbre généalogique complet de la famille : cette source directe est légitime au sens de `.claude/rules/data-privacy.md` (« tout contenu doit provenir du rapport Brandon ou de l'utilisateur »).
- Extension explicite de l'exception « mineurs » : les prénoms des 4 enfants mineurs (Nina, Jeanne, Louis, Paul) apparaissent dans l'arbre, sans aucune autre donnée (âge, photo, anecdote, santé). Actée dans `.claude/rules/data-privacy.md`.
- Modèle de données dédié validé : `src/types/family-tree.ts` et `src/data/family-tree.json`, distinct du modèle « portrait » (`family-member.ts`/`family-members.json`).
- Représentation visuelle validée : un arbre stylé par génération, positionné en canvas SVG unique (`FamilyTreeCanvas.vue`), avec des branches courbes générées via `d3-shape` (voir section Technique) ; le composant natif `VTreeview` de Vuetify a été explicitement écarté (mal adapté aux couples à deux parents). Remplace la première version en CSS pur (grille + connecteurs), jugée insuffisamment lisible comme arbre généalogique (2026-09-02).
- Restylage du 2026-09-02 (sur demande explicite « améliore significativement le style et la vue » puis « utilise d3js pour faire l'arbre ») : pas de distinction visuelle par icône entre conjoint/compagnon (uniquement trait plein/pointillé, sans légende) ; pas de mise en avant visuelle de la racine de l'arbre.
- Fusion de pages validée : `/famille` devient la seule vue et affiche désormais l'arbre (la grille de cartes en vrac a disparu) ; `/arbre-genealogique` redirige vers `/famille`.
- Clic sur une personne sans fiche portrait (Pierre, et les 4 mineurs) : mini-fiche avec prénom + lien de parenté uniquement, sans invention de contenu.

## Accueil

- Bref descriptif du site et de la famille
- Liens vers les rubriques
- Citations
- Grande image principale fournie ultérieurement
- Menu horizontal sur ordinateur, hamburger sur mobile

## La famille

- Affichée sous forme d'arbre généalogique par génération depuis le 2026-09-02 (voir section « Arbre généalogique »), chaque personne avec fiche portrait ouvrant la fiche détaillée au clic
- Portraits satiriques exclusivement rédigés par l'utilisateur
- Structure JSON du modèle portrait : `id`, `displayName`, `role`, `emoji`, `portrait`, `quotes`, `image`, `imageAlt`, `tags`, `order`, `published`
- Structure JSON du modèle arbre (relations, distinct du portrait) : `FamilyTreePerson` (`id`, `firstName`, `generation`, `order`, `relationLabel`, `isMinor`) et `FamilyTreeUnion` (`id`, `partners`, `type`, `children`)

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
- `d3-shape` (+ `@types/d3-shape` en devDependency) ajoutée le 2026-09-02, sur demande explicite de l'utilisateur (« utilise d3js pour faire l'arbre »), utilisée uniquement pour générer les chemins SVG courbes des branches de l'arbre généalogique (`d3.linkVertical`), dans `FamilyTreeCanvas.vue`. Pas de manipulation du DOM par D3 (sélection/binding) : Vue reste seul maître du DOM, D3 sert uniquement au calcul des tracés.
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
- Direction visuelle (2026-09-01), inspirée de https://www.hellokuya.co/ dans une version sobre validée explicitement par l'utilisateur :
  - Typographie système/Roboto conservée (pas de nouvelle police, pas de dépendance ajoutée) ; effet impactant obtenu uniquement par la taille et la graisse des titres (classes `.display-title` / `.display-title--sm`).
  - Palette de thème Vuetify chaude et familiale : `primary` `#C1552D` (terracotta), `secondary` `#E3A857` (ambre), `background` `#FBF6F0` (blanc cassé), texte à forte emphase `#2B2420`.
  - Boutons en pilule (`rounded: 'pill'` par défaut sur `VBtn`), étiquettes de section en majuscules suivies d'un séparateur fin (`.section-kicker`), cartes de rubriques en lignes pleine largeur (icône + titre + description + bouton).
  - Explicitement écartés : menu plein écran sombre, texte vertical sur les bords, formes décoratives organiques en arrière-plan.

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
9. Lot 8 (2026-09-02) : arbre généalogique réel, fusionné avec la page La famille

Chaque lot doit être validé avant de commencer le suivant. À sa fin, fournir un résumé, les fichiers modifiés, le résultat du build, les décisions restantes, les vérifications manuelles et la proposition du lot suivant.
