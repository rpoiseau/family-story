# Family Story - Instructions pour Claude Code

## Mission

Développer **Family Story**, un site vitrine familial public en français. Le site présente une famille pseudonymisée, ses membres, des souvenirs, des anecdotes, des photos et des événements.

Le développement est organisé en lots. Ne jamais commencer un nouveau lot avant validation explicite du lot courant.

## Priorités absolues

1. Respecter strictement les demandes validées.
2. Ne prendre aucune liberté fonctionnelle ou technique structurante sans accord explicite.
3. Ne jamais exécuter `git push` ni publier une branche, un tag ou une pull request.
4. Mettre à jour `PROGRESS.md` avant et après toute étape significative.
5. Ne jamais inventer de contenu familial. Le contenu provient exclusivement du rapport « What Brandon Thinks » fourni par l'utilisateur ou de textes qu'il écrit lui-même.
6. Ne pas introduire de donnée personnelle réelle au-delà de ce que contient déjà ce rapport (voir `.claude/rules/data-privacy.md`).
7. Exécuter `nvm use stable` avant toute commande `npm`, sans exception.
8. Vérifier au minimum `npm run build` avant de considérer une tâche comme terminée.

## Contexte produit

- Nom : **Family Story**.
- Audience fonctionnelle : membres d'une seule famille.
- Hébergement : GitHub Pages publique.
- Le contenu éditorial provient du rapport « What Brandon Thinks » fourni par l'utilisateur, repris quasi intégralement (décision du 2026-09-01). La pseudonymisation, l'interdiction de présenter des mineurs et l'interdiction des anecdotes de santé sont levées pour cette source uniquement.
- Chaque image réelle doit être explicitement validée avant intégration.
- Le site est exclusivement frontend pour le moment.
- Langue de l'interface et du contenu : français.

## Socle technique validé

- Vue 3
- TypeScript
- Composition API
- Composants avec `<script setup>`
- Vite
- Vuetify 3
- Vue Router
- npm
- Données éditables dans des fichiers JSON locaux
- Thème clair uniquement
- Approche mobile first
- Deux dernières versions de Chrome, Edge, Firefox et Safari

Pinia est interdit tant qu'un besoin réel n'a pas été identifié et validé.
Toute nouvelle dépendance, y compris une `devDependency`, exige un accord explicite avant installation.

## Commandes npm

Toujours exécuter les commandes dans cet ordre :

```bash
nvm use stable
npm <commande>
```

Ne jamais lancer directement une commande `npm` sans avoir exécuté `nvm use stable` dans le terminal courant.

## Périmètre fonctionnel initial

Routes prévues :

- `/` : accueil
- `/famille` : portraits satiriques des membres
- `/what-brandon-think` : le rapport Brandon (géopolitique, piliers, trophées, prédictions, réactions)
- `/arbre-genealogique` : page en construction
- `/timeline` : chronologie des événements marquants et des prédictions
- route de rattrapage : page 404

La page d'accueil contient :

- un bref descriptif du site et de la famille ;
- des liens vers les rubriques ;
- des citations ;
- une grande image principale fournie ultérieurement.

La navigation est horizontale sur ordinateur et utilise un menu hamburger sur mobile.

La page **La famille** utilise une grille de cartes ouvrant une fiche détaillée. Les portraits satiriques proviennent du trombinoscope du rapport Brandon. Ne jamais les inventer, les corriger ou les réécrire sans demande explicite.

La page **Arbre généalogique** reste en construction : elle comprend un titre, une indication `En construction`, une icône Vuetify et un retour vers l'accueil. Ne pas inventer de filiation, le rapport n'en fournit aucune de fiable.

Aucune galerie et aucune page de contact ne sont prévues pour le moment.

## Règle de décision

Avant toute décision non couverte par les fichiers du projet, présenter :

1. le problème ;
2. les options ;
3. les avantages et inconvénients ;
4. la recommandation ;
5. les fichiers concernés.

Attendre ensuite la décision explicite de l'utilisateur.

Les petits détails visuels réversibles peuvent être choisis librement s'ils respectent Vuetify, le thème et la cohérence existante. Demander un accord pour tout changement visuel important.

Toute amélioration non demandée doit être signalée, mais jamais implémentée sans validation.

## Autonomie autorisée

Sans accord supplémentaire, Claude peut :

- corriger une erreur de compilation, de TypeScript, de build ou de routage bloquante ;
- corriger un import ou un chemin incorrect ;
- exécuter les commandes de vérification ;
- réaliser un petit refactoring interne sans impact fonctionnel ou visuel ;
- réaliser les actions déjà explicitement prévues dans le lot validé.

Un accord est obligatoire avant de :

- ajouter ou supprimer une fonctionnalité ;
- modifier un texte fourni par l'utilisateur ;
- modifier le comportement ou la navigation ;
- modifier significativement le design ;
- installer une dépendance ;
- modifier l'architecture ou le format des JSON ;
- ajouter Pinia ;
- modifier GitHub Pages ou GitHub Actions hors du lot validé.

## Gestion du travail

Lire `PROGRESS.md` et `DECISIONS.md` au début de chaque session.

Mettre à jour `PROGRESS.md` :

- avant une tâche significative ;
- après chaque étape significative ;
- dès qu'un blocage apparaît ;
- avant de demander une décision ;
- avant la fin de chaque session ;
- immédiatement après validation d'une tâche.

`PROGRESS.md` représente uniquement l'état courant. Le rendre suffisamment précis pour qu'une nouvelle session puisse reprendre sans reconstituer le contexte.

## Git

Les règles Git détaillées dans `.claude/rules/git.md` sont obligatoires.

Après validation explicite d'une tâche, créer automatiquement un commit local clair et ciblé, sauf instruction contraire. Ne jamais pousser ce commit.

## Règles détaillées

Consulter et respecter tous les fichiers de `.claude/rules/` :

- `architecture.md`
- `design.md`
- `data-privacy.md`
- `git.md`
- `quality.md`
- `workflow.md`
