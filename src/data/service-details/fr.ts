import type { ServiceDetails } from "./types";

export const fr: ServiceDetails = {
  "transformation-digitale": {
    forWhom:
      "Pour les dirigeants de PME, de groupes familiaux et d'organisations qui gèrent encore une partie de leur activité sur papier, sur tableur ou par messagerie, et qui veulent savoir par où commencer sans tout changer d'un coup.",
    useCases: [
      ["Faire l'état des lieux", "Inventaire des outils, des processus et des irritants de chaque service, puis priorisation des chantiers selon leur coût et leur effet sur l'activité."],
      ["Digitaliser un processus clé", "Devis, facturation, prise de rendez-vous ou suivi des commandes : on commence par le flux qui fait perdre le plus de temps, avec un outil existant ou sur mesure."],
      ["Accompagner les équipes", "Formation des utilisateurs, guides simples et suivi après le lancement, pour que le nouvel outil soit réellement adopté."]
    ],
    faq: [
      ["Faut-il remplacer tous nos outils ?", "Non. Nous partons de ce qui fonctionne déjà et ne remplaçons que ce qui bloque. Un logiciel du marché suffit souvent ; le sur-mesure n'est proposé que lorsqu'il se justifie."],
      ["Par quoi commence une mission ?", "Par un cadrage : entretiens avec la direction et les équipes, observation des processus, puis une feuille de route chiffrée et priorisée que vous validez avant tout développement."],
      ["Pouvez-vous vous appuyer sur vos propres logiciels ?", "Oui, lorsque c'est pertinent : KORVA OS pour la gestion des clients, réservations, stock et factures, ou MARGOKIT pour les devis et factures. Ce n'est jamais une obligation."]
    ]
  },
  "developpement-web": {
    forWhom:
      "Pour les entreprises qui ont besoin d'un site qui présente clairement leur offre, d'une boutique en ligne, ou d'une plateforme métier (portail client, marketplace, SaaS) accessible depuis n'importe quel navigateur.",
    useCases: [
      ["Site vitrine multilingue", "Un site rapide en français, anglais et arabe, optimisé pour Google et les moteurs de réponse IA, avec formulaires de contact et de devis reliés à votre messagerie."],
      ["Plateforme ou portail client", "Espace sécurisé où vos clients suivent leurs commandes, téléchargent leurs documents ou réservent un créneau, relié à vos outils internes."],
      ["Produit SaaS", "Application web par abonnement, comme MARGOKIT et KORVA OS que nous avons conçus et exploitons nous-mêmes."]
    ],
    faq: [
      ["Combien de temps faut-il pour un site ?", "Un site vitrine est généralement livré en 3 à 6 semaines ; une plateforme sur mesure demande de 3 à 9 mois selon le périmètre. Le calendrier exact est fixé dès le cadrage."],
      ["Le site sera-t-il bien référencé ?", "Chaque site est livré avec les bases techniques du référencement : pages rapides, balises et données structurées, sitemap, versions linguistiques déclarées. Le positionnement dépend ensuite aussi du contenu et de la concurrence."],
      ["Serons-nous propriétaires du site ?", "Oui. Le nom de domaine, le contenu et le code livré vous appartiennent, et les conditions précises sont inscrites dans le devis."]
    ]
  },
  "developpement-mobile": {
    forWhom:
      "Pour les entreprises dont les clients ou les équipes de terrain ont besoin d'une application sur leur téléphone : commande, réservation, suivi d'intervention, inventaire ou paiement.",
    useCases: [
      ["Application client", "Commande, réservation, fidélité ou suivi de livraison, publiée sur Google Play et l'App Store."],
      ["Application terrain", "Outil pour techniciens, commerciaux ou livreurs : formulaires, photos, signature et synchronisation avec vos données, y compris lorsque la connexion est faible."],
      ["Version mobile d'un service existant", "Prolonger une plateforme web sur téléphone en réutilisant les mêmes comptes et les mêmes données."]
    ],
    faq: [
      ["Native ou cross-platform ?", "Une seule base de code (Flutter ou React Native) suffit pour la plupart des projets et réduit le coût. Le natif iOS ou Android est réservé aux besoins qui l'exigent, comme certaines fonctions matérielles."],
      ["Vous occupez-vous de la publication sur les stores ?", "Oui : préparation des fiches, captures, règles de confidentialité et soumission. Les comptes développeur Apple et Google sont ouverts à votre nom."],
      ["Que se passe-t-il après la mise en ligne ?", "Les systèmes iOS et Android évoluent chaque année. Un contrat de maintenance mensuel couvre les mises à jour de compatibilité et les corrections."]
    ]
  },
  "intelligence-artificielle": {
    forWhom:
      "Pour les entreprises qui reçoivent beaucoup de demandes répétitives, manipulent des documents en volume ou veulent exploiter leurs données, et qui cherchent un usage concret de l'IA plutôt qu'une démonstration.",
    useCases: [
      ["Assistant de réponse client", "Un assistant qui répond aux questions fréquentes sur votre site ou sur WhatsApp à partir de vos propres documents, et transmet à un humain ce qu'il ne sait pas traiter."],
      ["Traitement de documents", "Lecture et extraction automatique d'informations dans des factures, bons de commande ou formulaires, avec vérification humaine des cas douteux."],
      ["Assistant intégré à un logiciel", "Fonctions d'aide à la rédaction ou d'analyse intégrées à un outil métier, comme l'assistant IA de KORVA OS."]
    ],
    faq: [
      ["Nos données servent-elles à entraîner des modèles publics ?", "Non. Nous utilisons des offres professionnelles dont les conditions excluent l'entraînement sur vos données, et nous limitons ce qui est transmis au strict nécessaire."],
      ["Comment éviter les réponses fausses ?", "L'assistant répond à partir de vos documents, cite ses sources quand c'est possible et passe la main à une personne lorsqu'il n'est pas sûr. Nous testons ces cas avant la mise en service."],
      ["Par où commencer ?", "Par un seul cas d'usage mesurable, par exemple le temps passé à répondre aux mêmes questions. Une fois les résultats constatés, on élargit."]
    ]
  },
  "cloud-computing": {
    forWhom:
      "Pour les entreprises qui hébergent encore leurs applications sur un serveur au bureau, qui paient un hébergement sans savoir ce qu'il couvre, ou qui ont besoin de sauvegardes fiables.",
    useCases: [
      ["Migration vers le cloud", "Déplacement d'une application ou d'un serveur vers AWS, Azure ou Google Cloud, planifié pour limiter l'interruption de service."],
      ["Sauvegarde et reprise", "Sauvegardes automatiques, stockées hors site et testées régulièrement, avec une procédure écrite de restauration."],
      ["Maîtrise des coûts", "Revue des ressources réellement utilisées, suppression de ce qui ne sert plus et alertes de budget."]
    ],
    faq: [
      ["Quel fournisseur cloud choisir ?", "Cela dépend de vos outils existants, de la localisation souhaitée des données et du budget. Nous comparons les options et vous recommandons celle qui convient, sans exclusivité."],
      ["Nos données peuvent-elles rester au Maroc ou en Europe ?", "Les grands fournisseurs permettent de choisir la région d'hébergement. Nous en tenons compte avec vos obligations, notamment la loi 09-08 au Maroc et le RGPD pour les données de résidents européens."],
      ["Le cloud coûte-t-il plus cher qu'un serveur ?", "Pas forcément : on paie à l'usage et sans achat de matériel. Une estimation mensuelle est fournie avant la migration."]
    ]
  },
  cybersecurite: {
    forWhom:
      "Pour les entreprises qui stockent des données clients, encaissent en ligne ou dépendent de leurs outils informatiques au quotidien, et qui veulent connaître et réduire leurs risques.",
    useCases: [
      ["Audit de sécurité", "Revue des comptes, des accès, des sauvegardes, des mises à jour et de la configuration de vos services, avec un plan d'action priorisé."],
      ["Test d'intrusion autorisé", "Tentatives d'attaque contrôlées sur votre site ou votre application, uniquement avec votre accord écrit et dans un périmètre défini à l'avance."],
      ["Mise en conformité", "Accompagnement sur la protection des données personnelles : loi 09-08 et déclarations auprès de la CNDP au Maroc, RGPD pour l'Europe, et préparation à des référentiels comme ISO 27001."]
    ],
    faq: [
      ["Un test d'intrusion peut-il perturber notre activité ?", "Le périmètre, les horaires et les techniques sont validés avec vous avant de commencer. Les tests risqués sont menés sur un environnement de préproduction lorsque c'est possible."],
      ["Délivrez-vous une certification ISO 27001 ?", "Non : la certification est délivrée par un organisme accrédité. Nous vous aidons à préparer l'audit, mettre en place les mesures et rédiger la documentation."],
      ["Que faire en cas d'incident ?", "Contactez-nous immédiatement. Nous aidons à contenir l'incident, à restaurer les services et à préparer les notifications obligatoires. Les clients sous contrat disposent d'une ligne d'astreinte."]
    ]
  },
  "developpement-logiciel-sur-mesure": {
    forWhom:
      "Pour les entreprises dont les logiciels du marché ne couvrent pas la façon de travailler, ou qui jonglent entre plusieurs outils qui ne communiquent pas entre eux.",
    useCases: [
      ["Outil de gestion interne", "Gestion commerciale, suivi de production, gestion des stocks ou des ressources humaines, conçue autour de vos étapes réelles."],
      ["Relier vos outils existants", "Échanges automatiques entre votre site, votre comptabilité, votre CRM et vos fichiers, pour ne plus ressaisir les mêmes informations."],
      ["Partir d'une base existante", "Pour certains métiers, KORVA OS couvre déjà clients, réservations, stock et factures : le projet consiste alors à l'adapter plutôt qu'à tout développer."]
    ],
    faq: [
      ["Sur mesure ou logiciel du marché ?", "Nous comparons honnêtement les deux. Si un logiciel existant répond à 80 % du besoin, nous le recommandons ; le sur-mesure se justifie quand votre processus est un avantage ou qu'aucun outil ne convient."],
      ["Comment est fixé le prix ?", "Après le cadrage, au forfait pour un périmètre défini et réglé en plusieurs étapes, ou au mois pour un développement continu. Le mode retenu est indiqué dans le devis."],
      ["Qui maintient le logiciel ensuite ?", "Nous proposons un contrat de maintenance corrective et évolutive. La documentation est livrée pour qu'une autre équipe puisse reprendre le code si vous le souhaitez."]
    ]
  },
  devops: {
    forWhom:
      "Pour les équipes techniques et les éditeurs de logiciels dont les mises en production sont manuelles, risquées ou lentes, ou qui découvrent les pannes par leurs clients.",
    useCases: [
      ["Déploiement automatique", "Tests et mise en ligne déclenchés à chaque modification validée, avec retour arrière possible en un clic."],
      ["Environnements reproductibles", "Applications conteneurisées et infrastructure décrite en code, pour que la préproduction ressemble vraiment à la production."],
      ["Surveillance et alertes", "Tableaux de bord, journaux centralisés et alertes qui préviennent l'équipe avant les utilisateurs."]
    ],
    faq: [
      ["Faut-il passer à Kubernetes ?", "Pas toujours. Pour beaucoup d'applications, une plateforme gérée suffit et coûte moins cher à exploiter. Nous recommandons Kubernetes lorsque la taille ou la complexité le justifie."],
      ["Pouvez-vous travailler avec notre équipe existante ?", "Oui : nous mettons en place les outils avec vos développeurs, documentons les pratiques et les formons pour qu'ils restent autonomes."],
      ["Quels outils utilisez-vous ?", "GitHub Actions ou GitLab CI pour l'automatisation, Docker pour les conteneurs, Terraform pour l'infrastructure, et les outils de surveillance adaptés à votre hébergeur."]
    ]
  },
  "infrastructures-it": {
    forWhom:
      "Pour les bureaux, agences et sites de production qui ont besoin d'un réseau stable, de postes de travail à jour et de serveurs fiables, sans service informatique interne.",
    useCases: [
      ["Installation d'un nouveau bureau", "Réseau câblé et Wi-Fi, pare-feu, imprimantes, téléphonie et postes de travail prêts le jour de l'arrivée des équipes."],
      ["Modernisation des serveurs", "Virtualisation, remplacement du matériel vieillissant ou bascule vers le cloud, avec sauvegardes vérifiées."],
      ["Maintenance et supervision", "Surveillance des équipements, mises à jour de sécurité et intervention à distance ou sur site selon le contrat."]
    ],
    faq: [
      ["Intervenez-vous sur site ?", "Oui à Casablanca. Ailleurs, nous intervenons à distance et organisons les déplacements selon le projet."],
      ["Fournissez-vous le matériel ?", "Nous vous recommandons le matériel adapté et pouvons gérer les achats auprès de fournisseurs. Le matériel est facturé à part et indiqué dans le devis."],
      ["Quel contrat pour la maintenance ?", "Un contrat mensuel définit le périmètre couvert, les horaires et les délais d'intervention selon l'importance de vos équipements."]
    ]
  },
  "data-analytics": {
    forWhom:
      "Pour les dirigeants et responsables qui passent du temps à compiler des tableurs chaque mois, ou qui ont des données dans plusieurs outils sans vue d'ensemble fiable.",
    useCases: [
      ["Tableau de bord de direction", "Chiffre d'affaires, marge, encaissements et activité commerciale réunis sur une page mise à jour automatiquement."],
      ["Centralisation des données", "Collecte depuis vos logiciels, votre site et vos fichiers vers une base unique, nettoyée et documentée."],
      ["Analyse ponctuelle", "Étude d'une question précise : rentabilité par client, saisonnalité des ventes, origine des demandes."]
    ],
    faq: [
      ["Quels outils utilisez-vous ?", "Power BI, Looker Studio ou un tableau de bord intégré à votre application, selon vos licences et votre budget."],
      ["Nos données sont-elles assez propres ?", "Rarement au départ. Le nettoyage et la définition de chaque indicateur font partie du projet : c'est ce qui rend le tableau de bord fiable."],
      ["Qui pourra modifier les rapports ?", "Nous formons une ou deux personnes de votre équipe pour qu'elles ajustent les rapports sans dépendre de nous."]
    ]
  },
  "ui-ux-design": {
    forWhom:
      "Pour les entreprises qui lancent un site, une application ou un logiciel, ou dont les utilisateurs abandonnent un parcours (inscription, commande, paiement) sans savoir pourquoi.",
    useCases: [
      ["Conception d'un nouveau produit", "Parcours, maquettes et prototype cliquable sur Figma, validés avec de vrais utilisateurs avant le développement."],
      ["Refonte d'un parcours", "Analyse des points de blocage et simplification des écrans de commande, d'inscription ou de paiement."],
      ["Design system", "Bibliothèque de composants et de règles visuelles partagée entre designers et développeurs."]
    ],
    faq: [
      ["Pourquoi un prototype avant le développement ?", "Modifier une maquette coûte beaucoup moins cher que modifier du code. Le prototype permet de tester et de corriger avant d'investir dans le développement."],
      ["Concevez-vous pour l'arabe ?", "Oui : nous concevons des interfaces en français, en anglais et en arabe, avec une mise en page de droite à gauche pour l'arabe, comme sur ce site et sur VITPAY."],
      ["L'accessibilité est-elle prise en compte ?", "Oui : contrastes, tailles de texte et navigation au clavier suivent les recommandations WCAG."]
    ]
  },
  "marketing-digital": {
    forWhom:
      "Pour les entreprises qui veulent davantage de demandes qualifiées depuis Google, les réseaux sociaux et les moteurs de réponse IA, et qui veulent savoir ce que rapporte chaque dirham investi.",
    useCases: [
      ["Référencement naturel", "Audit technique, structure du site, contenus utiles et fiches d'établissement pour apparaître sur les recherches de vos clients."],
      ["Campagnes publicitaires", "Google Ads, Facebook, Instagram et TikTok, avec suivi des conversions pour savoir quelles campagnes génèrent des demandes."],
      ["Présence sur les réseaux sociaux", "Calendrier éditorial, création de contenus et publication régulière sur les réseaux où se trouvent vos clients."]
    ],
    faq: [
      ["Garantissez-vous la première place sur Google ?", "Non, personne ne peut le garantir honnêtement. Nous nous engageons sur le travail réalisé et sur un suivi transparent des résultats."],
      ["Le budget publicitaire est-il compris ?", "Non. Le budget versé aux plateformes est distinct de nos honoraires et reste sous votre contrôle, sur des comptes à votre nom."],
      ["Comment mesurez-vous les résultats ?", "Avec Google Search Console, Google Analytics et le suivi des conversions des plateformes, résumés dans un rapport mensuel."]
    ]
  },
  branding: {
    forWhom:
      "Pour les créateurs d'entreprise, les sociétés qui changent de positionnement ou qui s'ouvrent à de nouveaux marchés, et celles dont l'image n'est pas cohérente d'un support à l'autre.",
    useCases: [
      ["Création d'identité", "Nom, logo, couleurs, typographies et ton de communication, définis à partir de votre positionnement."],
      ["Charte graphique", "Guide d'utilisation du logo et des éléments visuels, avec fichiers sources prêts pour l'impression et le web."],
      ["Déclinaison sur les supports", "Cartes de visite, documents commerciaux, réseaux sociaux, site et signalétique."]
    ],
    faq: [
      ["Combien de propositions de logo ?", "Le nombre de pistes et de séries de corrections est fixé dans le devis, pour que le projet avance sans surprise."],
      ["Vérifiez-vous que le nom est disponible ?", "Nous faisons une première vérification (domaines, réseaux sociaux, recherches publiques). Le dépôt de marque se fait auprès de l'OMPIC au Maroc ou de l'office compétent dans votre pays."],
      ["Qui possède les droits du logo ?", "Vous. Les droits d'exploitation sont cédés à la livraison et les fichiers sources vous sont remis."]
    ]
  },
  conseil: {
    forWhom:
      "Pour les dirigeants qui doivent prendre une décision technologique importante (choix d'un logiciel, lancement d'un produit numérique, recrutement d'une équipe) et qui veulent un avis indépendant avant d'engager le budget.",
    useCases: [
      ["Cadrage d'un projet", "Définition des objectifs, du périmètre, du budget et des étapes avant tout lancement ou appel d'offres."],
      ["Choix d'une solution", "Comparaison des logiciels ou prestataires possibles selon vos critères, avec une recommandation argumentée."],
      ["Étude de faisabilité", "Vérification des contraintes techniques, réglementaires et économiques d'un projet numérique avant d'y investir."]
    ],
    faq: [
      ["Le conseil vous oblige-t-il à réaliser le projet ?", "Non. La mission de conseil est facturée séparément et vous restez libre de confier la réalisation à qui vous voulez."],
      ["Combien de temps dure une mission ?", "Un cadrage prend généralement quelques jours à quelques semaines selon la taille du projet. La durée est fixée dans le devis."],
      ["Qui intervient ?", "Le fondateur pilote les missions de conseil, entouré d'experts selon le sujet. L'équipe est précisée dans le devis."]
    ]
  },
  "formation-support": {
    forWhom:
      "Pour les entreprises qui veulent rendre leurs équipes autonomes sur un outil ou une technologie, et pour celles qui ont besoin d'une assistance fiable au quotidien après la mise en service d'un logiciel.",
    useCases: [
      ["Formation à un nouvel outil", "Sessions pratiques sur le logiciel livré, avec supports et vidéos réutilisables pour les nouveaux arrivants."],
      ["Formation technique", "Développement, intelligence artificielle ou bonnes pratiques de cybersécurité, adaptés au niveau des participants."],
      ["Support et maintenance", "Assistance par e-mail, téléphone et chat, corrections et petites évolutions dans le cadre d'un contrat mensuel."]
    ],
    faq: [
      ["Les formations se font-elles sur place ?", "Sur place à Casablanca ou à distance en visioconférence, en français, en anglais ou en arabe."],
      ["Comment contacter le support ?", "Par le Centre de support du site, par e-mail ou par téléphone. Les clients sous contrat disposent d'une ligne d'astreinte."],
      ["Que couvre un contrat de maintenance ?", "Les corrections, les mises à jour de sécurité et un volume d'évolutions défini. Le niveau de service est adapté à l'importance de l'outil pour votre activité."]
    ]
  }
};
