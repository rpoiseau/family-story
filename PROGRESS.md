# Avancement de Family Story

> Ce document représente uniquement l'état actuel du projet. Claude Code doit le mettre à jour régulièrement conformément à `CLAUDE.md`.

## Objectif actuel

**Lot « export WhatsApp brut » + lot « arbre généalogique » (2026-09-02) : committé localement (commit `981e0e8`), non poussé.** L'utilisateur a validé explicitement l'ensemble et demandé le commit. Séquence complète : Lot A (lecture intégrale du fichier `.txt` dézippé de l'export WhatsApp, ~3200 messages texte, janvier 2024-août 2026, jamais copié dans le dépôt) → liste de candidats présentée → validations explicites de l'utilisateur en deux temps :
1. Fiche portrait de Pierre (Pierrot) créée dans `family-members.json` (id `pierre`, order 11) — alternance ingénieur, permis, vidéos drone, tabac détaxé, 3 citations verbatim. `FamilleView.vue` l'affiche automatiquement (fiche complète au lieu du mini-dialog) sans changement de code, via `portraitById`.
2. Citations et enrichissements de description ajoutés pour Caroline, Romain, Bernard, Agathe, Lucie, Louise, Michel, Tom (portraits complétés d'un paragraphe pour Romain/Bernard/Louise ; quotes complétées pour tous les huit) + 6 nouveaux événements réels dans `events.json` (`maison-romain`, `sondage-chef-noel`, `bernard-70-ans`, `lucie-40-ans`, `finale-coupe-de-france`, `fiancailles-antoine-lucie`), tous `kind: "passe"`.

Contraintes de confidentialité respectées : aucun nom de famille complet ni numéro de téléphone (présents dans le fichier brut) n'a été repris — vérifié par `grep` sur les données publiées. Contenu écarté par la règle mineurs (Jeanne, Louis, Paul, Nina) : aucune donnée nouvelle les concernant au-delà de ce qui existait déjà. `nvm use stable && npm run build` réussi avant le commit, seul l'avertissement de taille de bundle déjà documenté subsiste.

Reste signalé, non traité : `events.json` contient déjà l'entrée `gastro-noel-2025` avec des noms de famille complets (« Fontaine-Poiseau-Obré »), antérieure à la décision de ce lot. Signalé à l'utilisateur, pas de correction appliquée sans demande explicite.

**Lot 7 (GitHub Actions et déploiement GitHub Pages) : implémenté et committé localement (commit `b480052`), non poussé.** Créé `.github/workflows/deploy.yml` (build `npm ci && npm run build`, copie `index.html` → `404.html` pour le routage SPA en mode history, puis déploiement de `dist/` vers GitHub Pages via `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, déclenché sur push vers `main` ou manuellement). `vite.config.ts` : base path conditionnel `/family-story/` en build (site de projet `https://rpoiseau.github.io/family-story/`), `/` en dev. Build local vérifié avec le nouveau base path : assets et favicon correctement préfixés dans `dist/index.html`.

Reste à faire, hors capacité de Claude Code ou nécessitant une décision utilisateur :
1. `git push` (interdit à Claude Code) — le dépôt local est en avance de 14 commits sur `origin/main`.
2. Activer la source « GitHub Actions » dans Settings > Pages du dépôt distant `rpoiseau/family-story` (actuellement : Pages non configuré, `gh api repos/rpoiseau/family-story/pages` renvoie 404). Claude Code dispose d'un token `gh` avec les scopes `repo`/`workflow` et pourrait le faire via l'API, mais il s'agit d'un changement de configuration du dépôt distant visible/partagé : à confirmer explicitement avec l'utilisateur avant exécution, non fait par prudence.

Contexte de l'export WhatsApp : l'utilisateur a fourni l'export WhatsApp officiel du groupe (`Discussion WhatsApp avec La chti family!.zip`, ~3200 messages texte, janvier 2024 à août 2026 — complémentaire des 6 ans couverts par le rapport Brandon). Plan validé en mode plan : régime de confidentialité étendu (comme le rapport Brandon) mais avec exclusion systématique des noms de famille complets et numéros de téléphone présents dans le fichier brut ; correspondance contacts → membres actée avec l'utilisateur (l'export vient du téléphone de Romain : Maman=Valé, Papa Boulot=Bernard, Pepe=Michel, Mon amour=Agathe, Marraine 2=Caroline, Pierrot=Pierre, plus les noms directs Antoine Obré/Thomas Vilette/Louise Césure/Lucie/Romain — nom de famille toujours tronqué au prénom) ; le numéro de téléphone non identifié (1 message) est exclu. Le fichier `.txt`/`.zip` original reste local (`Downloads/`), jamais copié dans le dépôt. Voir le plan `~/.claude/plans/cosmic-splashing-pretzel.md` pour le détail complet.

**Nouveau lot « arbre généalogique » (2026-09-01/02) : implémenté, en attente de validation utilisateur.** L'utilisateur a fourni en conversation, en mode plan, l'arbre généalogique complet de la famille (7 faits de filiation, y compris 4 enfants mineurs : Nina, Jeanne, Louis, Paul). Décisions explicites actées pendant la planification : les prénoms des mineurs sont affichés (extension de l'exception « mineurs » déjà actée pour le rapport Brandon, désormais étendue au contenu fourni directement par l'utilisateur — voir `.claude/rules/data-privacy.md`) ; modèle de données dédié (`family-tree.json`/`family-tree.ts`), séparé du modèle « portrait » existant ; rendu en arbre stylé par génération (CSS pur, sans nouvelle dépendance) ; fusion de `/famille` et `/arbre-genealogique` — `/famille` affiche désormais l'arbre, `/arbre-genealogique` redirige vers `/famille` et a disparu du menu et de l'accueil. Voir la section dédiée ci-dessous pour le détail complet. Build vérifié, contrôle visuel desktop et mobile effectué dans Chrome. Commit local à créer après validation explicite.

**Lot « contenu Brandon » (2026-09-01) : implémenté, en attente de validation utilisateur.** Le site est alimenté avec le contenu réel issu du rapport « What Brandon Thinks » (« La chti family! », 9 754 messages sur six ans). Plan validé par l'utilisateur en mode plan. Plus aucun `Lorem ipsum` ; les pages What Brandon Think et Timeline sont ouvertes. Arbre généalogique reste en construction (aucune filiation fiable dans la source). Arbitrages explicites de l'utilisateur : prénoms et communes réels conservés, anecdotes de santé et mentions d'enfants conservées, reprise quasi intégrale du texte du rapport — écarts assumés vis-à-vis de `data-privacy.md`, actés dans les règles, `CLAUDE.md` et `DECISIONS.md`. Commit local à créer après validation explicite.

Lot 6 validé par l'utilisateur (2026-09-01). Lot 7 (GitHub Actions et déploiement GitHub Pages) proposé mais explicitement non démarré à la demande de l'utilisateur ("ne fait pas le lot suivant tout de suite").

Nouveau lot demandé explicitement par l'utilisateur (2026-09-01) : nouvelle direction visuelle inspirée de https://www.hellokuya.co/ (typographie XL, séparateurs fins, boutons pilule, cartes « étude de cas »), adaptée en version sobre et avec une palette chaude/familiale (terracotta/ambre). Plan détaillé validé via le mode plan, implémenté, puis validé par l'utilisateur (« commit c'est bon », 2026-09-01) et committé localement. Aucun changement de contenu, de route ou de comportement fonctionnel — uniquement l'habillage visuel de l'ensemble du site (thème, navigation, accueil, page Famille, pages en construction, 404). Lot 7 (déploiement) toujours en attente d'instruction.

**Carrousel de citations sur l'accueil (2026-09-02) : implémenté, en attente de validation.** Demande explicite : remplacer le bloc statique de 2 citations de `HomeView.vue` par un carrousel présentant les meilleures citations, une par membre de la famille (11 au total), piochées dans `family-members.json` par référence `{memberId, index}` (pas de duplication de texte). `v-carousel` Vuetify, défilement automatique (6 s), flèches au survol (desktop), points de navigation, attribution du nom sous chaque citation. Bug bloquant rencontré et contourné : la transition par défaut de `v-carousel-item` (Vuetify 4.1.12) reste bloquée en classes `-enter/-leave-active` sans jamais se nettoyer (`onAfterEnter`/`onAfterLeave` jamais déclenchés), provoquant un chevauchement visuel permanent de deux citations — reproduit de façon fiable en navigateur (auto-défilement et clic manuel), confirmé par inspection du DOM (classes de transition Vue jamais retirées). Contournement appliqué sans nouvelle dépendance ni changement de version : `:transition="false"` et `:reverse-transition="false"` sur chaque `v-carousel-item`, qui désactive proprement l'animation Vue (bascule instantanée, sans chevauchement) tout en gardant le défilement automatique, les flèches et les points fonctionnels. Vérifié en navigateur (Chrome, largeur desktop) sur plusieurs cycles complets sans régression. Le redimensionnement vers une largeur mobile n'a pas pu être vérifié visuellement (limitation déjà connue de cet environnement, voir lot 1) ; le comportement responsive du carrousel (hauteurs `200`/`260` selon `useDisplay`) reste donc à confirmer par l'utilisateur. `nvm use stable && npm run build` réussi (type-check + build).

## État global

- Statut : lots 0 à 6 terminés, committés localement et validés. Le restylage visuel complet inspiré de hellokuya.co est terminé, validé et committé localement (commit `1a25786`). Le lot « contenu Brandon » et le lot « arbre généalogique » sont tous deux implémentés et non committés, en attente de validation. Lot 7 (déploiement) non démarré.
- Lot courant : arbre généalogique — implémenté, build vérifié, contrôle visuel desktop + mobile effectué, en attente de validation utilisateur
- Dernière étape achevée : implémentation complète de l'arbre généalogique (données, types, composants, fusion de pages, règle de confidentialité) et vérifications
- Build : dernier `npm run build` réussi (type-check + build). Avertissement non bloquant inchangé : chunk JS/CSS principal > 500 kB après minification, car tous les composants et directives Vuetify sont enregistrés globalement (nécessaire car le point d'entrée `vuetify` de la version 4 n'inclut plus les composants par défaut). Optimisable plus tard par imports ciblés si besoin, non traité pour l'instant.

## Tâches terminées

- Définition du périmètre fonctionnel initial
- Validation du socle Vue 3, TypeScript, Vite, Vuetify 3 et Vue Router
- Définition des règles de confidentialité et de pseudonymisation
- Définition des règles Git
- Définition de l'organisation du développement par lots
- Création initiale des fichiers d'instructions Claude Code
- Inspection du dépôt existant (scaffold Vite/Vue par défaut, non modifié)

## Tâche en cours

Lot « arbre généalogique » : implémenté, en attente de validation explicite de l'utilisateur avant commit local. Le lot « contenu Brandon » reste également en attente de validation (implémenté lors d'une session précédente).

## Détail de l'implémentation de l'arbre généalogique (fusion avec « La famille »)

Contexte : l'utilisateur a fourni en conversation (mode plan) l'arbre complet — Michel père de Caroline/Valé/Antoine ; Caroline mère de Louise ; Lucie femme d'Antoine, 3 enfants (Jeanne, Louis, Paul) ; Valérie (Valé) et Bernard parents de Romain/Agathe/Pierre ; Tom compagnon d'Agathe, une fille Nina. Décisions actées explicitement pendant la planification (voir ci-dessus).

### Règles

- `.claude/rules/data-privacy.md` : nouvelle section « Décision du 2026-09-01 : extension de l'exception mineurs à l'arbre généalogique ». Le prénom des 4 mineurs peut apparaître, uniquement dans l'arbre (nœud + lien de parenté), sans aucune autre donnée.

### Types et données

- `src/types/family-tree.ts` (nouveau) : `FamilyTreePerson`, `FamilyTreeUnion`, `FamilyTree`, `FamilyTreeBlock`, `UnionType`. Modèle « relations » distinct du modèle « portrait » (`family-member.ts`).
- `src/data/family-tree.json` (nouveau) : 15 personnes, 5 unions, transcription fidèle des faits fournis par l'utilisateur. Aucune filiation inventée (ex. le père de Louise n'est pas mentionné, donc absent des données).

### Composants et vue

- `src/components/FamilyTreeCard.vue` (nouveau) : carte de nœud réutilisable (portrait si disponible, sinon icône générique + prénom).
- `src/components/FamilyTreeGenerationRow.vue` (nouveau) : bande horizontale d'une génération, regroupe les couples avec un connecteur (plein pour conjoint, pointillé pour compagnon).
- `src/components/FamilyTreeMobileList.vue` (nouveau) : repli mobile, liste verticale groupée par génération avec libellé de parenté textuel (pas de connecteurs).
- `src/views/FamilleView.vue` : réécrite. Calcule la position en colonnes de chaque personne (génération la plus peuplée = référence, les autres déduites par moyenne, propagation à point fixe), assemble les blocs par génération, dessine les connecteurs de filiation en CSS Grid (desktop `mdAndUp`) ou bascule sur `FamilyTreeMobileList` (mobile). Dialog portrait complet existant conservé à l'identique ; nouveau mini-dialog (prénom + lien de parenté) pour les personnes sans fiche (Pierre, Nina, Jeanne, Louis, Paul).
- `src/router/index.ts` : `/arbre-genealogique` devient une redirection vers `/famille` (route conservée pour ne pas casser un lien existant).
- `src/components/AppNavBar.vue` et `src/views/HomeView.vue` : entrée « Arbre généalogique » retirée (menu desktop, drawer mobile, accueil). Description de la rubrique « La famille » légèrement ajustée pour mentionner l'arbre (détail visuel réversible).
- `src/views/ArbreGenealogiqueView.vue` et `src/components/UnderConstruction.vue` : supprimés (plus aucun usage restant dans le code, confirmé par `grep`).

### Vérifications

- `nvm use stable && npm run build` réussi (type-check + build) après correction de plusieurs erreurs TypeScript liées à l'accès indexé strict (`noUncheckedIndexedAccess`) sur les tableaux `partners`/`children`/`persons` (assertions non-null `!` ajoutées aux endroits garantis par la logique).
- `grep -rn "ArbreGenealogiqueView\|UnderConstruction" src` : aucun résultat.
- Contrôle visuel dans Chrome : desktop (1280×900) — arbre correctement positionné sur 4 générations, connecteurs pleins/pointillés corrects, clic sur Caroline (portrait) ouvre la fiche complète inchangée, clic sur Pierre (sans portrait) ouvre le mini-dialog « Pierre — Fils de Valé et Bernard » ; mobile (390×844) — bascule vers la liste verticale groupée par génération avec libellés, menu hamburger sans l'entrée Arbre généalogique ; `/arbre-genealogique` redirige bien vers `/famille`. Aucune erreur console.

## Détail de l'implémentation du lot « contenu Brandon »

### Règles et décisions mises à jour (préalable au contenu)

- `.claude/rules/data-privacy.md` : réécrit. Acte la levée explicite, pour la seule source « rapport Brandon », de la pseudonymisation, de l'interdiction de présenter des mineurs, de l'interdiction des anecdotes de santé et de la restriction au `Lorem ipsum`. Les autres interdictions (adresse postale précise, coordonnées de contact, données financières, données médicales cliniques, identifiants secrets, date de naissance complète) restent en vigueur.
- `CLAUDE.md` : priorités 5 et 6 reformulées, section « Contexte produit » et « Périmètre fonctionnel initial » mises à jour (What Brandon Think et Timeline ne sont plus « en construction »).
- `DECISIONS.md` : nouvelle section « Contenu éditorial (2026-09-01) » et statut des pages mis à jour.

### Types

- `src/types/family-member.ts` : ajout de `role` (titre satirique), `emoji` et `quotes` aux champs existants. Extension du format JSON validée par l'utilisateur via le plan.
- `src/types/brandon-report.ts` (nouveau) : `BrandonReport`, `BrandonZone`, `BrandonPillar`, `BrandonTrophy`, `BrandonPrediction`, `BrandonReaction`.
- `src/types/timeline-event.ts` (nouveau) : `TimelineEvent` avec `label`, `sortKey`, `icon` et `kind` (`passe` / `prediction`).

### Données

- `src/data/family-members.json` : 10 fiches remplaçant les 4 placeholders, une par personne du trombinoscope, dans l'ordre du rapport. Les trois sections doubles du rapport ont été scindées par personne. Toutes les `image` restent vides (aucune photo validée) : l'emoji du membre sert d'avatar de repli.
- `src/data/brandon-thoughts.json` (nouveau) : intro, 4 zones géographiques, encadré « pire traumatisme familial », 3 piliers développés, 4 trophées, 4 prédictions, 6 réactions prédites, conclusion.
- `src/data/events.json` (nouveau) : 8 entrées, 4 passées et 4 prédictions, triées par `sortKey`.

### Composants et vues

- `src/components/QuoteBlock.vue` (nouveau) : bloc de citation réutilisable extrait du style `.quote-sheet` de l'accueil, avec une variante `dense`. Utilisé par l'accueil, la page famille et What Brandon Think.
- `src/views/HomeView.vue` : titre et sous-titre du rapport, descriptif repris de l'intro de Brandon, descriptions réelles des 4 rubriques, 2 citations issues du rapport. Bandeau « Image principale à venir » conservé.
- `src/views/FamilleView.vue` : carte avec emoji, prénom et rôle satirique ; fiche détaillée scrollable avec portrait en paragraphes, citations et tags. Logique existante (`published`, `order`, plein écran sur mobile) conservée.
- `src/views/WhatBrandonThinkView.vue` : n'utilise plus `UnderConstruction`. Page complète : en-tête + signature Brandon, intro, géopolitique (4 cartes), piliers (encadré + sections + protocole numéroté), trophées (4 cartes), prédictions, réactions, conclusion sur fond primaire, bouton retour.
- `src/views/TimelineView.vue` : n'utilise plus `UnderConstruction`. `v-timeline` avec pastilles `primary` (passé) et `secondary` (prédictions), chip « Déjà arrivé » / « Prédiction », libellé de date en `opposite` sur desktop et dans la carte sur mobile.
- `src/views/ArbreGenealogiqueView.vue` et `src/components/UnderConstruction.vue` : inchangés. L'arbre reste la seule page en construction.
- Aucune route, aucune dépendance et aucun changement de direction visuelle : la palette, les classes `.display-title`, `.section-kicker` et `.lift-on-hover` existantes sont réutilisées telles quelles.

### Vérifications

- `nvm use stable && npm run build` réussi (type-check + build). Seul avertissement : la taille de bundle déjà documentée.
- `grep -ri "lorem" src/` : aucun résultat.
- Contrôle visuel dans Chrome (largeur desktop, serveur de développement) : accueil (titre, intro, 4 rubriques décrites, citations), page Famille (10 cartes, ouverture de la fiche Caroline avec portrait, citation et tags), What Brandon Think (toutes les sections rendues de l'intro à la conclusion), Timeline (8 entrées dans l'ordre, distinction passé/prédiction), Arbre généalogique (toujours en construction). Aucune erreur console.
- Deux ajustements visuels mineurs pendant la vérification : cartes de zones passées d'un `v-card` tonal (texte ambre peu lisible) à un fond teinté avec texte standard, et titre + chip de la timeline regroupés sur une même ligne.
- Limitation connue de cet environnement (voir lot 1) : le rendu en largeur mobile n'a pas pu être confirmé, à vérifier par l'utilisateur.

## Détail de l'implémentation du restylage visuel (inspiré de hellokuya.co)

- `src/main.ts` : nouvelle palette de thème Vuetify (`primary` `#C1552D`, `secondary` `#E3A857`, `background` `#FBF6F0`, texte fort `#2B2420`) ; `defaults` Vuetify pour arrondir `VBtn` en pilule par défaut. Aucune nouvelle dépendance, police système/Roboto inchangée.
- `src/App.vue` : classes utilitaires globales `.section-kicker` (étiquette de section + séparateur fin) et `.display-title` / `.display-title--sm` (titres XL, graisse 900) réutilisées sur toutes les pages.
- `src/components/AppNavBar.vue` : barre plate avec bordure basse discrète, lien de navigation actif souligné (au lieu d'un fond coloré plein), wordmark en gras.
- `src/views/HomeView.vue` : hero avec titre XL ; section « Rubriques » restructurée en lignes pleine largeur (icône colorée + titre + courte description + bouton pilule « Découvrir ») séparées par des filets fins ; citations restylées en pull-quotes (fond ambré atténué, icône de guillemet).
- `src/views/FamilleView.vue` : titre XL, séparateur en tête de page, avatars agrandis en couleur secondaire, nom en gras.
- `src/components/UnderConstruction.vue` (impacte What Brandon Think, Arbre généalogique, Timeline) et `src/views/NotFoundView.vue` : titre XL, icône/« 404 » en couleur secondaire, bouton pilule « Retour à l'accueil ».
- Aucun contenu, donnée, route ou comportement fonctionnel modifié — uniquement l'habillage visuel, conformément au plan validé explicitement par l'utilisateur (mode plan, 2026-09-01).
- `nvm use stable && npm run build` réussi (type-check + build), avertissement de taille de bundle inchangé (déjà documenté).
- Vérification manuelle dans Chrome (largeur desktop) : accueil, page Famille (grille + fiche détaillée), page en construction (Timeline), page 404, lien de navigation actif — tous conformes. Limitation déjà connue de cet environnement (voir lot 1) : le redimensionnement de fenêtre vers une largeur mobile n'a pas été pris en compte par l'outil de test ; le rendu mobile réel reste à confirmer par l'utilisateur.
- Validé par l'utilisateur (« commit c'est bon », 2026-09-01) et committé localement (commit `1a25786`), sans `git push`.

## Détail de l'implémentation du lot 6

- `src/App.vue` : transition de fondu (0,15 s) entre les pages lors de la navigation ; classe utilitaire globale `.lift-on-hover` (léger soulèvement + ombre au survol, transition douce) réutilisée par l'accueil et la page famille.
- `src/components/AppNavBar.vue` : le lien de navigation correspondant à la route active est désormais mis en évidence (couleur primaire), en version desktop et dans le menu mobile.
- `src/views/HomeView.vue` : hauteur du bandeau « Image principale à venir » réduite sur mobile (200 px) et desktop (320 px) via `useDisplay()` ; cartes rubriques avec effet de survol harmonisé.
- `src/views/FamilleView.vue` : fiche détaillée d'un membre ouverte en plein écran sur mobile (`v-dialog fullscreen`) pour une meilleure lisibilité ; cartes membres avec le même effet de survol que l'accueil.
- Aucun contenu, donnée ou comportement fonctionnel modifié — uniquement des finitions visuelles réversibles conformes au plan validé.
- Vérification manuelle dans Chrome (largeur desktop) : lien actif visible dans la navigation, transition de page fluide, effet de survol des cartes, ouverture/fermeture de la fiche membre fonctionnelles. Le redimensionnement de fenêtre vers une largeur mobile n'a pas été pris en compte par l'outil de test dans cet environnement (limitation déjà connue, voir lot 1) ; le comportement responsive (breakpoints Vuetify `useDisplay`) n'a donc pas pu être confirmé visuellement pour cette session et reste à vérifier par l'utilisateur sur mobile réel ou en réduisant la fenêtre du navigateur.

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
