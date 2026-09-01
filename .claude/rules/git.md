# Règles Git

## Autorisé

- Consulter l'état et l'historique du dépôt.
- Examiner les différences.
- Modifier les fichiers du dépôt dans le périmètre validé.
- Créer une branche locale.
- Créer un commit local ciblé après validation explicite d'une tâche.
- Créer un tag local.
- Préparer le texte d'une pull request sans la publier.

## Strictement interdit

- `git push`
- publier une branche ou un tag ;
- ouvrir ou publier une pull request ;
- fusionner une branche distante ;
- réécrire l'historique distant.

## Accord explicite obligatoire

Ne jamais exécuter sans accord explicite :

```bash
git reset --hard
git clean -fd
git checkout -- .
git restore .
git rebase
git commit --amend
```

Avant toute modification, vérifier `git status` et les différences existantes.

Si des modifications non produites par Claude sont présentes :

1. ne pas les annuler ;
2. ne pas les écraser ;
3. les signaler ;
4. travailler autour d'elles lorsque cela est possible.
