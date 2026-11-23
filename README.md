# VIT GLOBAL TECHNOLOGIES GROUP — Site officiel

Site vitrine, commercial et back-office de VIT GLOBAL TECHNOLOGIES GROUP : présentation de l'entreprise, des services, des filiales et des réalisations ; demandes de devis, rendez-vous, candidatures et partenariats ; espaces client et partenaire ; tableau de bord d'administration ; propositions commerciales signées électroniquement.

Production : https://www.vit-global.tech (le domaine nu `vit-global.tech` redirige vers `www`).

## Stack

- **Next.js 15** (App Router) + TypeScript strict
- **Tailwind CSS v4** — design system dans `src/app/globals.css`
- **next-intl** — FR / EN / AR (arabe en RTL), routes préfixées (`/fr`, `/en`, `/ar`)
- **Prisma + PostgreSQL** — persistance des formulaires, comptes, propositions et signatures
- **Auth.js (next-auth v5)** — e-mail + mot de passe (avec vérification d'e-mail), Google, Microsoft Entra ID, LinkedIn
- **nodemailer** (SMTP Zoho ou Gmail), **Twilio** (WhatsApp), **pdf-lib** (devis PDF)
- **Vitest** — tests unitaires

## Démarrage

```bash
npm install
cp .env.example .env          # puis renseigner les variables (AUTH_SECRET obligatoire)
npx prisma migrate dev        # base locale uniquement
npm run dev
```

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | contrôle TypeScript |
| `npm test` | tests unitaires (Vitest) |
| `npm run db:migrate:deploy` | applique les migrations Prisma sur la base pointée par `DATABASE_URL` |

La CI GitHub Actions (`.github/workflows/ci.yml`) exécute lint, typecheck, tests, validation du schéma et build à chaque push sur `main` et sur chaque pull request.

## Déploiement

Les migrations ne sont **pas** appliquées automatiquement par le build. Avant de déployer une version qui contient une nouvelle migration (`prisma/migrations/`), l'appliquer sur la base de production :

```bash
DATABASE_URL="<url de production>" npm run db:migrate:deploy
```

## Sécurité — principes en place

- **Admin** : session signée (HMAC, 8 h), jamais le mot de passe dans le cookie ; tentatives limitées. Les utilisateurs au rôle `ADMIN` avec e-mail vérifié y accèdent aussi.
- **Espaces client/partenaire** : aucune donnée affichée tant que l'adresse e-mail n'est pas vérifiée ; réinitialisation du mot de passe par lien à usage unique.
- **Signature des devis** : l'admin fige une proposition (version + lignes tarifaires) et envoie un lien personnel à usage unique (jeton aléatoire, 14 jours, seul son hash est stocké). Le signataire doit être le destinataire ; la preuve conserve la copie figée, le consentement, l'horodatage, l'IP et une empreinte SHA-256. Il s'agit d'une **signature électronique simple**.
- **Formulaires publics** : validation serveur (zod, longueurs maximales), limitation de fréquence partagée en base, e-mails échappés, pièces jointes vérifiées par leur contenu (4 Mo max).
- **En-têtes** : CSP, `X-Frame-Options: DENY`, `nosniff`, HSTS, `Referrer-Policy`, `Permissions-Policy`.

## Contenu éditorial

Le contenu (services, filiales, réalisations, blog, offres d'emploi, FAQ, équipe, partenaires, textes légaux) est centralisé dans `src/data/*.ts`, traduit FR/EN/AR. Les chaînes d'interface sont dans `messages/{fr,en,ar}.json`. Les identifiants légaux (RC, ICE, IF, capital, CNDP) sont à renseigner dans `src/data/legal.ts`.

## Non implémenté à ce stade

Paiement en ligne, CRM externe, assistant IA connecté à un modèle (le chat collecte des demandes de contact), signature électronique qualifiée.
