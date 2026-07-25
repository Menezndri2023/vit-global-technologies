# VIT GLOBAL TECHNOLOGIES GROUP — Site officiel

Site vitrine, commercial et back-office minimal de VIT GLOBAL TECHNOLOGIES GROUP : présentation de l'entreprise, des services, des filiales, des réalisations, prise de rendez-vous, demandes de devis, candidatures, espaces client/partenaire et mini-tableau de bord admin.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — design system (couleurs, typographies) dans `src/app/globals.css`
- **next-intl** — multilingue FR / EN / AR (arabe en RTL natif), routes préfixées par langue (`/fr`, `/en`, `/ar`)
- **Prisma + SQLite** — persistance réelle des formulaires (contact, devis, rendez-vous, candidatures, demandes partenaires, leads du chat)
- **lucide-react** — iconographie

## Démarrage

```bash
npm install
npx prisma migrate dev   # première fois seulement
npm run dev
```

Le site est servi sur http://localhost:3000 (redirection automatique vers `/fr`).

Copier `.env.example` en `.env` et ajuster `ADMIN_PASSWORD` avant tout déploiement.

## Contenu éditorial

Tout le contenu (services, filiales, réalisations, blog, offres d'emploi, FAQ, équipe, partenaires) est centralisé dans `src/data/*.ts`, avec une traduction FR/EN/AR par élément. Les chaînes d'interface (navigation, formulaires, libellés) sont dans `messages/{fr,en,ar}.json`.

## Back-office

- `/[locale]/admin` — tableau de bord protégé par mot de passe (`ADMIN_PASSWORD`), affiche les soumissions de chaque formulaire.
- Routes API sous `src/app/api/*` : `contact`, `quote`, `appointment`, `careers/apply`, `partners`, `chat`, `admin/*`.

## Périmètre actuel

Cette version couvre l'intégralité des pages et parcours demandés avec un back-end minimal réel (formulaires → base de données). Ne sont pas connectés à ce stade : passerelle de paiement, génération PDF, CRM externe, assistant IA connecté à un LLM, authentification complète des espaces client/partenaire — le chat et les espaces sont fonctionnels comme générateurs de leads (UI complète, données enregistrées) en attendant l'intégration de ces briques.
