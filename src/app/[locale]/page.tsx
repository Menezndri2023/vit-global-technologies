import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card, StatBlock } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { services } from "@/data/services";
import { filiales } from "@/data/filiales";
import { realisations } from "@/data/realisations";
import { blogPosts } from "@/data/blog";
import { testimonials, companyStats, partners } from "@/data/company";
import { faqItems } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowRight, ArrowUpRight, Quote, ChevronDown } from "lucide-react";
import { RealisationCover } from "@/components/ui/RealisationCover";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale, title: t("defaultTitle"), description: t("defaultDescription") });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations();

  const processSteps = t.raw("home.processSteps") as { title: string; description: string }[];
  const heroTags = t.raw("home.heroTags") as string[];
  const whyReasons = t.raw("home.whyReasons") as { title: string; description: string }[];
  const whyIcons = ["Sparkles", "Lightbulb", "Headset", "ShieldCheck", "Award", "HeartHandshake", "Wallet", "Clock"];
  const homeFaqs = faqItems.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-grid relative overflow-hidden bg-white pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="pointer-events-none absolute -top-32 end-[-10%] h-[420px] w-[420px] rounded-full bg-brand-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 start-[-10%] h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-vit relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t("home.heroEyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver-600">
              {t("home.heroSubtitle")}
            </p>
            <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-navy-950/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900/80 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button as={Link} href="/devis" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                {t("home.heroCtaPrimary")}
              </Button>
              <Button as={Link} href="/rendez-vous" variant="outline" size="lg">
                {t("home.heroCtaSecondary")}
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-navy-950/[0.06] pt-10 sm:grid-cols-3 lg:grid-cols-6">
            {companyStats.map((stat) => (
              <StatBlock key={stat.label.fr} value={stat.value} label={stat.label[loc]} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <div className="border-y border-navy-950/[0.06] bg-navy-950/[0.02] py-8">
        <div className="container-vit">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-silver-500">
            {t("home.trustedBy")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((p) => (
              <span key={p.name} className="text-sm font-semibold tracking-tight text-navy-900/40">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <Section tone="white">
        <SectionHeading eyebrow={t("common.ourServices")} title={t("home.servicesTitle")} subtitle={t("home.servicesSubtitle")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 9).map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{service.title[loc]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-600">{service.summary[loc]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {t("common.discoverService")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as={Link} href="/services" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            {t("common.seeAllServices")}
          </Button>
        </div>
      </Section>

      {/* Process */}
      <Section tone="muted">
        <SectionHeading eyebrow={t("common.ourServices")} title={t("home.processTitle")} subtitle={t("home.processSubtitle")} align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl bg-white p-6 shadow-card">
              <span className="font-display text-4xl font-bold text-brand-500/20">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Filiales */}
      <Section tone="navy">
        <SectionHeading eyebrow={t("common.ourSubsidiaries")} title={t("home.filialesTitle")} subtitle={t("home.filialesSubtitle")} align="center" tone="light" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filiales.map((filiale) => (
            <Link
              key={filiale.slug}
              href={`/filiales/${filiale.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${filiale.color}22`, color: filiale.color }}
              >
                <Icon name={filiale.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{filiale.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-white/40">{filiale.sector[loc]}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{filiale.tagline[loc]}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
                {t("common.learnMore")} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Work */}
      <Section tone="white">
        <SectionHeading eyebrow={t("nav.realisations")} title={t("home.workTitle")} subtitle={t("home.workSubtitle")} align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {realisations.slice(0, 3).map((item) => (
            <Link key={item.slug} href={`/realisations/${item.slug}`}>
              <Card className="flex h-full flex-col">
                <RealisationCover item={item} className="h-32 rounded-xl" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">{item.industry[loc]}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">{item.title[loc]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{item.summary[loc]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {t("common.viewCaseStudy")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as={Link} href="/realisations" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            {t("common.viewAll")}
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="muted">
        <SectionHeading title={t("home.testimonialsTitle")} align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} hover={false}>
              <Quote className="h-6 w-6 text-brand-500/40" />
              <p className="mt-4 text-sm leading-relaxed text-navy-900">“{testimonial.quote[loc]}”</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-sm font-semibold text-brand-600">
                  {testimonial.author.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950">{testimonial.author}</p>
                  <p className="text-xs text-silver-600">
                    {testimonial.role[loc]}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section tone="white">
        <SectionHeading title={t("home.whyTitle")} subtitle={t("home.whySubtitle")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyReasons.map((reason, i) => (
            <div key={reason.title} className="rounded-2xl border border-navy-950/[0.06] p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Icon name={whyIcons[i] ?? "Sparkles"} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-950">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Blog */}
      <Section tone="white">
        <SectionHeading eyebrow={t("nav.blog")} title={t("home.blogTitle")} subtitle={t("home.blogSubtitle")} align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="flex h-full flex-col">
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: post.color }}
                >
                  {post.category[loc]}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{post.title[loc]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver-600">{post.excerpt[loc]}</p>
                <p className="mt-4 text-xs text-silver-500">
                  {post.date} · {post.readTime} {t("common.readTime")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ preview */}
      <Section tone="muted">
        <SectionHeading eyebrow={t("nav.support")} title={t("home.faqTitle")} subtitle={t("home.faqSubtitle")} align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-navy-950/[0.06] rounded-2xl border border-navy-950/[0.06] bg-white">
          {homeFaqs.map((item) => (
            <details key={item.question.fr} className="group px-6 py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy-950 sm:text-base">
                {item.question[loc]}
                <ChevronDown className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-silver-600">{item.answer[loc]}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button as={Link} href="/support" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            {t("common.viewAll")}
          </Button>
        </div>
      </Section>

      <CtaBanner
        title={t("home.ctaTitle")}
        subtitle={t("home.ctaSubtitle")}
        primaryLabel={t("home.ctaPrimary")}
        primaryHref="/devis"
        secondaryLabel={t("home.ctaSecondary")}
        secondaryHref="/contact"
      />
    </>
  );
}
