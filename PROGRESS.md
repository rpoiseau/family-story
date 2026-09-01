# Avancement de Family Story

> Ce document représente uniquement l'état actuel du projet. Claude Code doit le mettre à jour régulièrement conformément à `CLAUDE.md`.

## Objectif actuel

Lot 0 validé et committé. Préparer et faire valider le plan détaillé du lot 1 (structure générale, thème et navigation).

## État global

- Statut : lot 0 terminé et committé localement, lot 1 en attente de validation du plan
- Lot courant : lot 1 — structure générale, thème et navigation
- Dernière étape achevée : commit local du lot 0
- Build : dernier `npm run build` réussi (type-check + vite build OK)

## Tâches terminées

- Définition du périmètre fonctionnel initial
- Validation du socle Vue 3, TypeScript, Vite, Vuetify 3 et Vue Router
- Définition des règles de confidentialité et de pseudonymisation
- Définition des règles Git
- Définition de l'organisation du développement par lots
- Création initiale des fichiers d'instructions Claude Code
- Inspection du dépôt existant (scaffold Vite/Vue par défaut, non modifié)

## Tâche en cours

Élaboration du plan détaillé du lot 1, en attente de validation explicite de l'utilisateur.

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
