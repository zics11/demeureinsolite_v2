# Demeure Insolite – Système de réservation

Cette branche ajoute un back-office complet et un tunnel de réservation pour les annonces "Villa Cosita" et "La Forêt".

## Prérequis

- Node.js 18 (≥18.16). Prisma 5.x est installé pour rester compatible.
- SQLite (inclus par défaut, aucune installation supplémentaire nécessaire).

## Installation

```bash
npm install
npm run prisma:migrate   # applique le schéma Prisma sur prisma/dev.db
npx prisma db seed       # injecte deux annonces avec données de démo
npm run dev
```

Les migrations et le fichier `prisma/dev.db` sont versionnés pour l’environnement de développement. Pour repartir d’une base propre :

```bash
npx prisma migrate reset --force
npx prisma db seed
```

## Variables d’environnement

Ajouter au besoin :

```
DATABASE_URL="file:./dev.db"             # déjà présent dans .env et .env.local
MAILGUN_API_KEY=…                         # existant
MAILGUN_DOMAIN=…                          # existant
ADMIN_API_KEY=…                           # optionnel, protège les API admin
```

Lorsque `ADMIN_API_KEY` est défini, les requêtes vers `/api/admin/*` doivent fournir l’en-tête `x-admin-key` correspondant. Le back-office intégré fonctionne côté serveur et n’expose pas cette clé.

## Back-office

- Emplacement : [`/admin`](http://localhost:3000/admin)
- Fonctionnalités :
  - Edition des informations d’annonce (tarif de base, frais de ménage, description).
  - Ajout/suppression de tarifs journaliers spécifiques.
  - Blocage/déblocage de plages de dates.
  - Création, mise à jour (statut) et suppression de réservations.
  - Rafraîchissement des données depuis Prisma.

Les actions s’appuient sur `app/admin/actions.js` (server actions) et réutilisent la logique centralisée dans `lib/booking.js` pour vérifier disponibilités, calculer les montants et prévenir les conflits.

## Côté visiteur

- Nouvelles pages par annonce : `/listings/villa-cosita` et `/listings/la-foret`.
- Widget de réservation :
  - Sélection de plage de dates via calendrier (dates passées, réservées ou bloquées désactivées).
  - Affichage du prix total (tarifs journaliers + ménage) en temps réel.
  - Formulaire de demande : nom, email, téléphone, occupants, message.
  - Appel à `POST /api/listings/[slug]/reservations` pour enregistrer la demande (statut `PENDING`).

La page d’accueil contient un bouton "Voir & réserver" qui redirige vers chaque fiche.

## API

Principaux points d’entrée :

- Public :
  - `GET /api/listings` – liste des annonces.
  - `GET /api/listings/[slug]/availability?start=YYYY-MM-DD&end=YYYY-MM-DD` – disponibilité/journalier.
  - `GET /api/listings/[slug]/quote?start=…&end=…` – vérifie la disponibilité et calcule le tarif.
  - `POST /api/listings/[slug]/reservations` – crée une réservation (statut `PENDING`).
- Admin (protégés facultativement par `ADMIN_API_KEY`) : CRUD complet sur annonces, tarifs, réservations et plages bloquées via `/api/admin/...`.

Les réponses et erreurs sont uniformisées avec `lib/api-utils.js` (statuts HTTP cohérents, payload JSON).

## Données de démo

`prisma/seed.js` crée :

- Deux annonces (`villa-cosita`, `la-foret`).
- Une réservation confirmée (mois prochain), une plage bloquée (dans 2 semaines) et quelques tarifs majorés (saison haute).

Cela permet de tester le calendrier et la gestion admin immédiatement après le seed.

## Tests & lint

ESLint 9.x requiert Node ≥18.18 ; avec Node 18.16, `npm run lint` peut émettre un warning "Unsupported engine". Mettre à jour Node si besoin pour profiter du linting complet.
