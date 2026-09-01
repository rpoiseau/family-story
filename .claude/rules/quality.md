# Qualité et vérifications

- Avant toute commande npm, exécuter `nvm use stable` dans le terminal courant.
- Le build est la vérification minimale obligatoire avant de terminer une tâche.
- Exécuter aussi les commandes de lint, type-check ou test si elles existent déjà et sont pertinentes.
- Ne pas ajouter ESLint, Prettier, Stylelint ou un framework de test sans accord explicite.
- Ne laisser aucune erreur de compilation ou de build connue.
- Signaler les avertissements et blocages sans masquer leur existence.
- Ne pas élargir le périmètre d'une correction.
- Relire les différences avant de présenter la tâche comme terminée.

Séquence minimale :

```bash
nvm use stable
npm run build
```
