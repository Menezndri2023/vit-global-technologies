import type { ServiceDetails } from "./types";

export const en: ServiceDetails = {
  "transformation-digitale": {
    forWhom:
      "For leaders of SMEs, family groups and organizations that still run part of their business on paper, spreadsheets or messaging apps, and want to know where to start without changing everything at once.",
    useCases: [
      ["Take stock", "Inventory of each department's tools, processes and pain points, then prioritization of the work by cost and business impact."],
      ["Digitize a key process", "Quotes, invoicing, booking or order tracking: we start with the flow that wastes the most time, using an existing tool or a custom one."],
      ["Support your teams", "User training, simple guides and follow-up after launch, so the new tool is actually adopted."]
    ],
    faq: [
      ["Do we need to replace all our tools?", "No. We build on what already works and only replace what gets in the way. Off-the-shelf software is often enough; custom development is only proposed when it is justified."],
      ["How does an engagement start?", "With a scoping phase: interviews with management and teams, process observation, then a costed, prioritized roadmap that you approve before any development."],
      ["Can you rely on your own software?", "Yes, when relevant: KORVA OS for customers, bookings, stock and invoices, or MARGOKIT for quotes and invoices. It is never a requirement."]
    ]
  },
  "developpement-web": {
    forWhom:
      "For businesses that need a website that clearly presents their offer, an online store, or a business platform (client portal, marketplace, SaaS) available from any browser.",
    useCases: [
      ["Multilingual website", "A fast site in French, English and Arabic, optimized for Google and AI answer engines, with contact and quote forms connected to your inbox."],
      ["Platform or client portal", "A secure space where your customers track orders, download documents or book a slot, connected to your internal tools."],
      ["SaaS product", "A subscription web application, like MARGOKIT and KORVA OS, which we designed and run ourselves."]
    ],
    faq: [
      ["How long does a website take?", "A showcase website is usually delivered in 3 to 6 weeks; a custom platform takes 3 to 9 months depending on scope. The exact schedule is set during scoping."],
      ["Will the site rank well?", "Every site ships with the technical SEO foundations: fast pages, meta tags and structured data, sitemap and declared language versions. Rankings then also depend on content and competition."],
      ["Will we own the website?", "Yes. The domain name, the content and the delivered code are yours, and the exact terms are written in the quote."]
    ]
  },
  "developpement-mobile": {
    forWhom:
      "For businesses whose customers or field teams need an app on their phone: ordering, booking, job tracking, inventory or payment.",
    useCases: [
      ["Customer app", "Ordering, booking, loyalty or delivery tracking, published on Google Play and the App Store."],
      ["Field app", "A tool for technicians, sales reps or drivers: forms, photos, signatures and sync with your data, even on a weak connection."],
      ["Mobile version of an existing service", "Extend a web platform to phones, reusing the same accounts and data."]
    ],
    faq: [
      ["Native or cross-platform?", "A single codebase (Flutter or React Native) is enough for most projects and lowers the cost. Native iOS or Android is kept for needs that require it, such as some hardware features."],
      ["Do you handle app store publishing?", "Yes: store listings, screenshots, privacy policies and submission. Apple and Google developer accounts are opened in your name."],
      ["What happens after launch?", "iOS and Android change every year. A monthly maintenance contract covers compatibility updates and fixes."]
    ]
  },
  "intelligence-artificielle": {
    forWhom:
      "For businesses that receive many repetitive requests, handle documents in volume or want to make use of their data, and are looking for a practical use of AI rather than a demo.",
    useCases: [
      ["Customer answer assistant", "An assistant that answers common questions on your website or WhatsApp from your own documents, and hands over to a person when it cannot help."],
      ["Document processing", "Automatic reading and extraction of information from invoices, purchase orders or forms, with human review of doubtful cases."],
      ["Assistant inside your software", "Writing or analysis features built into a business tool, like the AI assistant in KORVA OS."]
    ],
    faq: [
      ["Is our data used to train public models?", "No. We use business plans whose terms exclude training on your data, and we only send what is strictly necessary."],
      ["How do you avoid wrong answers?", "The assistant answers from your documents, cites its sources where possible and hands over to a person when unsure. We test these cases before going live."],
      ["Where should we start?", "With a single measurable use case, such as the time spent answering the same questions. Once results are confirmed, we expand."]
    ]
  },
  "cloud-computing": {
    forWhom:
      "For businesses still hosting applications on an office server, paying for hosting without knowing what it covers, or needing reliable backups.",
    useCases: [
      ["Cloud migration", "Moving an application or server to AWS, Azure or Google Cloud, planned to minimize downtime."],
      ["Backup and recovery", "Automatic off-site backups, tested regularly, with a written restore procedure."],
      ["Cost control", "Review of the resources actually used, removal of what is no longer needed and budget alerts."]
    ],
    faq: [
      ["Which cloud provider should we choose?", "It depends on your existing tools, where you want your data stored and your budget. We compare the options and recommend the right one, with no exclusive partnership."],
      ["Can our data stay in Morocco or Europe?", "Major providers let you choose the hosting region. We take it into account alongside your obligations, including Morocco's Law 09-08 and the GDPR for data on European residents."],
      ["Is the cloud more expensive than a server?", "Not necessarily: you pay for usage, with no hardware to buy. A monthly estimate is provided before migration."]
    ]
  },
  cybersecurite: {
    forWhom:
      "For businesses that store customer data, take payments online or depend on their IT tools every day, and want to know and reduce their risks.",
    useCases: [
      ["Security audit", "Review of accounts, access rights, backups, updates and service configuration, with a prioritized action plan."],
      ["Authorized penetration test", "Controlled attack attempts on your website or application, only with your written consent and within a scope agreed in advance."],
      ["Compliance", "Support on personal data protection: Law 09-08 and CNDP filings in Morocco, the GDPR in Europe, and preparation for frameworks such as ISO 27001."]
    ],
    faq: [
      ["Can a penetration test disrupt our business?", "Scope, timing and techniques are agreed with you before starting. Risky tests are run on a staging environment whenever possible."],
      ["Do you issue ISO 27001 certification?", "No: certification is issued by an accredited body. We help you prepare the audit, put the controls in place and write the documentation."],
      ["What should we do in case of an incident?", "Contact us immediately. We help contain the incident, restore services and prepare mandatory notifications. Clients under contract have a dedicated on-call line."]
    ]
  },
  "developpement-logiciel-sur-mesure": {
    forWhom:
      "For businesses whose way of working is not covered by off-the-shelf software, or who juggle several tools that do not talk to each other.",
    useCases: [
      ["Internal management tool", "Sales management, production tracking, inventory or HR management, designed around your actual steps."],
      ["Connect your existing tools", "Automatic exchanges between your website, accounting, CRM and files, so the same information is never typed twice."],
      ["Start from an existing base", "For some trades, KORVA OS already covers customers, bookings, stock and invoices: the project then means adapting it rather than building everything."]
    ],
    faq: [
      ["Custom or off-the-shelf?", "We compare both honestly. If existing software covers 80% of the need, we recommend it; custom work is justified when your process is an advantage or no tool fits."],
      ["How is the price set?", "After scoping: a fixed price for a defined scope, paid in stages, or a monthly fee for ongoing development. The chosen model is stated in the quote."],
      ["Who maintains the software afterwards?", "We offer a corrective and evolutive maintenance contract. Documentation is delivered so another team can take over the code if you wish."]
    ]
  },
  devops: {
    forWhom:
      "For technical teams and software publishers whose releases are manual, risky or slow, or who learn about outages from their customers.",
    useCases: [
      ["Automated deployment", "Tests and release triggered on every approved change, with one-click rollback."],
      ["Reproducible environments", "Containerized applications and infrastructure as code, so staging truly matches production."],
      ["Monitoring and alerts", "Dashboards, centralized logs and alerts that warn the team before users notice."]
    ],
    faq: [
      ["Should we move to Kubernetes?", "Not always. For many applications a managed platform is enough and cheaper to run. We recommend Kubernetes when size or complexity justifies it."],
      ["Can you work with our existing team?", "Yes: we set up the tools with your developers, document the practices and train them so they stay autonomous."],
      ["Which tools do you use?", "GitHub Actions or GitLab CI for automation, Docker for containers, Terraform for infrastructure, and monitoring tools suited to your hosting provider."]
    ]
  },
  "infrastructures-it": {
    forWhom:
      "For offices, branches and production sites that need a stable network, up-to-date workstations and reliable servers, without an in-house IT department.",
    useCases: [
      ["New office setup", "Wired network and Wi-Fi, firewall, printers, telephony and workstations ready on the day your teams move in."],
      ["Server modernization", "Virtualization, replacement of ageing hardware or a move to the cloud, with verified backups."],
      ["Maintenance and monitoring", "Equipment monitoring, security updates and remote or on-site support depending on the contract."]
    ],
    faq: [
      ["Do you work on site?", "Yes, in Casablanca. Elsewhere we work remotely and arrange travel depending on the project."],
      ["Do you supply the hardware?", "We recommend suitable hardware and can handle purchasing from suppliers. Hardware is billed separately and listed in the quote."],
      ["Which maintenance contract?", "A monthly contract defines the scope, hours and response times based on how critical your equipment is."]
    ]
  },
  "data-analytics": {
    forWhom:
      "For managers who spend time compiling spreadsheets every month, or who have data in several tools without a reliable overall view.",
    useCases: [
      ["Management dashboard", "Revenue, margin, collections and sales activity on one automatically updated page."],
      ["Data centralization", "Collection from your software, website and files into a single, cleaned and documented database."],
      ["One-off analysis", "A study of a precise question: profitability per customer, sales seasonality, lead sources."]
    ],
    faq: [
      ["Which tools do you use?", "Power BI, Looker Studio or a dashboard built into your application, depending on your licences and budget."],
      ["Is our data clean enough?", "Rarely at first. Cleaning and defining each indicator are part of the project: that is what makes the dashboard reliable."],
      ["Who will be able to change the reports?", "We train one or two people on your team so they can adjust reports without depending on us."]
    ]
  },
  "ui-ux-design": {
    forWhom:
      "For businesses launching a website, an app or software, or whose users drop out of a journey (sign-up, order, payment) without knowing why.",
    useCases: [
      ["Designing a new product", "User flows, mockups and a clickable Figma prototype, validated with real users before development."],
      ["Redesigning a journey", "Analysis of friction points and simplification of order, sign-up or payment screens."],
      ["Design system", "A library of components and visual rules shared by designers and developers."]
    ],
    faq: [
      ["Why a prototype before development?", "Changing a mockup costs far less than changing code. The prototype lets you test and correct before investing in development."],
      ["Do you design for Arabic?", "Yes: we design interfaces in French, English and Arabic, with a right-to-left layout for Arabic, as on this website and on VITPAY."],
      ["Is accessibility taken into account?", "Yes: contrast, text sizes and keyboard navigation follow the WCAG guidelines."]
    ]
  },
  "marketing-digital": {
    forWhom:
      "For businesses that want more qualified leads from Google, social media and AI answer engines, and want to know what each dirham spent brings back.",
    useCases: [
      ["Search engine optimization", "Technical audit, site structure, useful content and business listings so you appear when your customers search."],
      ["Advertising campaigns", "Google Ads, Facebook, Instagram and TikTok, with conversion tracking to see which campaigns bring in leads."],
      ["Social media presence", "Editorial calendar, content creation and regular posting on the networks your customers use."]
    ],
    faq: [
      ["Do you guarantee first place on Google?", "No, nobody can honestly guarantee it. We commit to the work done and to transparent reporting of results."],
      ["Is the ad budget included?", "No. The budget paid to the platforms is separate from our fees and stays under your control, on accounts in your name."],
      ["How do you measure results?", "With Google Search Console, Google Analytics and the platforms' conversion tracking, summarized in a monthly report."]
    ]
  },
  branding: {
    forWhom:
      "For founders, companies changing their positioning or entering new markets, and those whose image is inconsistent from one medium to another.",
    useCases: [
      ["Identity creation", "Name, logo, colours, typefaces and tone of voice, defined from your positioning."],
      ["Brand guidelines", "A guide to using the logo and visual elements, with source files ready for print and web."],
      ["Applying it everywhere", "Business cards, sales documents, social media, website and signage."]
    ],
    faq: [
      ["How many logo proposals?", "The number of concepts and revision rounds is set in the quote, so the project moves forward without surprises."],
      ["Do you check that the name is available?", "We run a first check (domains, social media, public searches). Trademark registration is filed with OMPIC in Morocco or the relevant office in your country."],
      ["Who owns the logo rights?", "You do. Usage rights are transferred on delivery and the source files are handed over."]
    ]
  },
  conseil: {
    forWhom:
      "For leaders facing a major technology decision (choosing software, launching a digital product, hiring a team) who want an independent view before committing the budget.",
    useCases: [
      ["Project scoping", "Definition of goals, scope, budget and milestones before any launch or tender."],
      ["Choosing a solution", "Comparison of possible software or providers against your criteria, with a reasoned recommendation."],
      ["Feasibility study", "Checking the technical, regulatory and economic constraints of a digital project before investing in it."]
    ],
    faq: [
      ["Does consulting commit us to building the project with you?", "No. Consulting is billed separately and you remain free to hand the build to whoever you choose."],
      ["How long does an engagement last?", "Scoping usually takes a few days to a few weeks depending on project size. The duration is set in the quote."],
      ["Who works on it?", "The founder leads consulting engagements, with experts brought in depending on the topic. The team is specified in the quote."]
    ]
  },
  "formation-support": {
    forWhom:
      "For businesses that want their teams to become autonomous with a tool or technology, and for those that need reliable day-to-day assistance after a software launch.",
    useCases: [
      ["Training on a new tool", "Hands-on sessions on the delivered software, with materials and videos reusable for new hires."],
      ["Technical training", "Development, artificial intelligence or cybersecurity best practices, adapted to participants' level."],
      ["Support and maintenance", "Help by email, phone and chat, fixes and small improvements under a monthly contract."]
    ],
    faq: [
      ["Is training delivered on site?", "On site in Casablanca or remotely by video call, in French, English or Arabic."],
      ["How do we reach support?", "Through the website's Support Center, by email or by phone. Clients under contract have a dedicated on-call line."],
      ["What does a maintenance contract cover?", "Fixes, security updates and a defined volume of improvements. The service level matches how critical the tool is to your business."]
    ]
  }
};
