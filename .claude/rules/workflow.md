# Workflow et lots

## Déroulement d'une session

1. Lire `CLAUDE.md`, `DECISIONS.md`, `PROGRESS.md` et les règles de `.claude/rules/`.
2. Inspecter `git status` et les différences existantes.
3. Mettre à jour `PROGRESS.md` avant une tâche significative.
4. Ne travailler que sur le lot explicitement validé.
5. Mettre à jour `PROGRESS.md` après chaque étape significative.
6. Exécuter les vérifications applicables, avec `nvm use stable` avant npm.
7. Résumer les changements et demander la validation de la tâche ou du lot.
8. Après validation, mettre à jour `PROGRESS.md`, puis créer un commit local ciblé.
9. Ne jamais pousser le commit.

## Fin de lot

Fournir systématiquement :

- résumé des changements ;
- fichiers modifiés ;
- résultat du build et des autres contrôles exécutés ;
- points restant à décider ;
- instructions de vérification manuelle ;
- proposition du lot suivant.

Attendre la validation avant de commencer le lot suivant.

## Suggestions hors périmètre

Signaler toute amélioration non demandée, avec sa justification, sans l'implémenter.

## Gestion d'une décision manquante

Présenter le problème, les options, leurs avantages et inconvénients, une recommandation et les fichiers concernés. Mettre à jour `PROGRESS.md`, puis attendre une réponse explicite.
