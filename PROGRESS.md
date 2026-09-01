# Avancement de Family Story

> Ce document représente uniquement l'état actuel du projet. Claude Code doit le mettre à jour régulièrement conformément à `CLAUDE.md`.

## Objectif actuel

Lots 4 et 5 validés par l'utilisateur (2026-09-01). Préparer et faire valider le plan détaillé du lot 6 (responsive, finitions visuelles et animations).

## État global

- Statut : lots 0, 1, 2, 3, 4 et 5 terminés, committés localement et validés, lot 6 en attente de plan/validation
- Lot courant : aucun — en attente d'instruction pour le lot 6 (responsive, finitions visuelles et animations)
- Dernière étape achevée : validation utilisateur des lots 4 et 5
- Build : dernier `npm run build` réussi. Avertissement non bloquant : chunk JS/CSS principal > 500 kB après minification, car tous les composants et directives Vuetify sont enregistrés globalement (nécessaire car le point d'entrée `vuetify` de la version 4 n'inclut plus les composants par défaut). Optimisable plus tard par imports ciblés si besoin, non traité pour l'instant.

## Tâches terminées

- Définition du périmètre fonctionnel initial
- Validation du socle Vue 3, TypeScript, Vite, Vuetify 3 et Vue Router
- Définition des règles de confidentialité et de pseudonymisation
- Définition des règles Git
- Définition de l'organisation du développement par lots
- Création initiale des fichiers d'instructions Claude Code
- Inspection du dépôt existant (scaffold Vite/Vue par défaut, non modifié)

## Tâche en cours

Aucune. En attente d'instruction pour le lot 6.

## Détail de l'implémentation des lots 4 et 5

- `src/components/UnderConstruction.vue` (nouveau composant réutilisable, choix technique interne non structurant) : props `title` et `icon`, affiche icône Vuetify, titre, chip « En construction » et bouton « Retour à l'accueil ».
- `src/views/WhatBrandonThinkView.vue` (lot 4), `src/views/ArbreGenealogiqueView.vue` et `src/views/TimelineView.vue` (lot 5) : utilisent désormais `UnderConstruction` avec leur titre et une icône MDI dédiée (`mdi-thought-bubble`, `mdi-family-tree`, `mdi-timeline-clock`, cohérentes avec les icônes déjà utilisées sur l'accueil).
- Aucun contenu fonctionnel futur inventé : seules les indications déjà validées dans `CLAUDE.md` (titre, mention « En construction », illustration/icône, retour accueil) ont été ajoutées.
- Vérification manuelle dans Chrome : les 3 pages affichent correctement titre, icône, chip et bouton ; le bouton « Retour à l'accueil » ramène bien vers `/`.
- Lots enchaînés sans validation intermédiaire sur instruction explicite de l'utilisateur (2026-09-01).

## Détail de l'implémentation du lot 3

- `src/types/family-member.ts` : type `FamilyMember` (`id`, `displayName`, `portrait`, `image`, `imageAlt`, `tags`, `order`, `published`), conforme à la structure JSON validée dans `DECISIONS.md`.
- `src/data/family-members.json` : 4 membres placeholder (« Membre 1 » à « Membre 4 »), portraits en `Lorem ipsum`, aucune image réelle (`image` vide, avatar de repli affiché). Aucun contenu familial réel ou inventé.
- `src/views/FamilleView.vue` : grille de cartes (avatar + nom), clic sur une carte ouvrant une fiche détaillée (`v-dialog`) avec le portrait complet.
- Vérification manuelle dans Chrome : grille affichée correctement, icônes de repli visibles, ouverture/fermeture de la fiche détaillée fonctionnelle.

## Détail de l'implémentation du lot 2

- `src/views/HomeView.vue` : espace réservé pour l'image principale (`v-sheet` gris avec icône et mention « Image principale à venir », en attendant que l'image soit fournie et validée), descriptif `Lorem ipsum`, 4 cartes cliquables vers les rubriques (La famille, What Brandon Think, Arbre généalogique, Timeline), 2 citations `Lorem ipsum` en cartes.
- Aucun contenu familial réel ou inventé : uniquement du `Lorem ipsum` et des libellés déjà validés (noms des rubriques, titre du site).
- Vérification manuelle dans Chrome : rendu correct, cartes de rubriques cliquables et fonctionnelles (testé le lien vers `/famille`).

## Détail de l'implémentation du lot 1

- `src/router/index.ts` : les 6 routes prévues (`/`, `/famille`, `/what-brandon-think`, `/arbre-genealogique`, `/timeline`, route de rattrapage 404), chacune avec import différé (lazy loading).
- Vues créées (contenu strictement minimal — un titre, pas de contenu fonctionnel, réservé aux lots 2 à 5) : `HomeView.vue`, `FamilleView.vue`, `WhatBrandonThinkView.vue`, `ArbreGenealogiqueView.vue`, `TimelineView.vue`, `NotFoundView.vue` (404 avec message générique et lien retour accueil).
- `src/components/AppNavBar.vue` : barre de navigation horizontale sur ordinateur (`v-app-bar` + `v-btn`), menu hamburger sur mobile (`v-app-bar-nav-icon` + `v-navigation-drawer` temporaire), via les classes utilitaires responsive Vuetify (`d-none d-md-flex` / `d-flex d-md-none`).
- `src/App.vue` intègre `AppNavBar` au-dessus de `router-view`.
- **Bug détecté et corrigé** : Vuetify 4 n'enregistre plus automatiquement tous les composants/directives par défaut (changement de comportement vs Vuetify 3). `src/main.ts` importe désormais explicitement `vuetify/components` et `vuetify/directives` et les passe à `createVuetify`. Sans cela, aucun composant Vuetify ne s'affichait (avertissements Vue "Failed to resolve component").
- Vérification manuelle effectuée dans Chrome : rendu desktop (barre horizontale, styles Vuetify appliqués), navigation entre `/` et `/famille` fonctionnelle, route inconnue affichant bien la page 404 avec lien de retour. Le test du menu hamburger en largeur mobile n'a pas pu être confirmé visuellement (le redimensionnement de fenêtre n'a pas été pris en compte par l'outil de test dans cet environnement) ; vérifié en revanche que le bouton hamburger est bien masqué et le menu horizontal bien affiché en largeur desktop (comportement CSS standard Vuetify basé sur le point de rupture `md`, à confirmer visuellement par vous sur mobile réel ou en réduisant la fenêtre du navigateur).
- `npm run build` réussi avec un avertissement non bloquant (voir État global) sur la taille du bundle, lié à l'enregistrement global des composants Vuetify.

## Détail de l'implémentation du lot 0

- Installation de `@mdi/font` (accord explicite obtenu) pour le jeu d'icônes MDI de Vuetify 4.
- Enregistrement du plugin Vuetify dans `src/main.ts` (thème clair uniquement, icônes MDI via `@mdi/font`).
- Nettoyage de `src/App.vue` : suppression du contenu de démo Vite, remplacé par le socle minimal `v-app` / `v-main` / `router-view` (aucune navigation ni contenu fonctionnel, réservés au lot 1).
- Création de l'arborescence cible (`.claude/rules/architecture.md`) : `src/assets/images/`, `src/components/`, `src/data/`, `src/types/`, `src/views/` (dossiers vides avec `.gitkeep`).
- Correction de `index.html` : `lang="fr"`, `<title>Family Story</title>`.
- Ajout de `.gitignore` (`node_modules/`, `dist/`, `.DS_Store`, etc.).
- Retrait de `.DS_Store` du suivi Git (`git rm --cached`), conservé dans `.gitignore`.
- Vérification finale : `nvm use stable && npm run build` → succès (type-check + build OK).

## Observations de l'inspection (2026-09-01)

- Le dépôt contient un scaffold Vite + Vue 3 + TypeScript par défaut (créé via l'outil officiel `create-vue`), non encore adapté au projet.
- `src/` ne contient que `App.vue` (contenu de démo "You did it!"), `main.ts` et `router/index.ts` (routes vides). Aucun dossier `assets/`, `components/`, `data/`, `types/`, `views/`.
- `index.html` a `lang=""` et `<title>Vite App</title>` (non conformes au projet).
- `package.json` contient une modification locale **non committée** ajoutant `"vuetify": "^4.1.12"` en dépendance. Cette version est installée dans `node_modules` et présente dans `package-lock.json` (untracked), mais **aucune configuration Vuetify n'existe encore** (pas de plugin enregistré dans `main.ts`, pas d'import de styles, pas d'icônes MDI).
- Écart initial constaté puis résolu : le socle documenté mentionnait Vuetify 3 alors que la version présente localement est Vuetify 4. Décision explicite de l'utilisateur le 2026-09-01 : **Vuetify 4 retenue**, actée dans `DECISIONS.md`.
- Aucun fichier `.gitignore` n'existe à la racine. `node_modules/`, `package-lock.json` et le dossier `dist/` (généré par le build) apparaissent comme non suivis par défaut, sans exclusion explicite — risque de commit accidentel de `node_modules/` ou `dist/`.
- `.DS_Store` est **suivi par Git** (fichier système macOS) et actuellement modifié localement.
- `CLAUDE.md`, `DECISIONS.md`, `PROGRESS.md` et `.claude/` (règles) sont présents à la racine mais **non encore committés**.
- Le build (`npm run build`) réussit sans erreur avec la configuration actuelle.

## Prochaines tâches

1. Obtenir la décision explicite de l'utilisateur sur l'écart Vuetify 3 / Vuetify 4.
2. Obtenir la validation du plan détaillé du lot 0 (voir échange avec l'utilisateur).
3. Implémenter le lot 0 une fois validé.
4. Vérifier `npm run build` après implémentation.
5. Committer localement (sans push) après validation de la tâche.

## Décisions validées

Voir `DECISIONS.md` pour la liste structurée des décisions.

## Décisions en attente

- Ajout d'un `.gitignore` (node_modules, dist, .DS_Store, etc.).
- Retrait de `.DS_Store` du suivi Git.
- Contenu exact du lot 0 (voir proposition détaillée présentée à l'utilisateur).

## Problèmes rencontrés

- Absence de `.gitignore` — signalé, non résolu.

## Décisions résolues durant cette session

- Version de Vuetify tranchée : **Vuetify 4** (celle déjà installée localement), actée dans `DECISIONS.md` le 2026-09-01.

## Prompt conseillé pour reprendre

```text
Lis CLAUDE.md, tous les fichiers de .claude/rules/, DECISIONS.md et PROGRESS.md. Le lot 0 est en attente de validation (voir section "Décisions en attente" de PROGRESS.md, notamment l'écart Vuetify 3/4). Attends ma décision avant d'implémenter.
```
