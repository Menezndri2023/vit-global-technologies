import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => blogPosts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const loc = locale as Locale;
  return buildMetadata({ locale, title: post.title[loc], description: post.excerpt[loc], path: `/blog/${slug}` });
}

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="bg-grid bg-white pb-12 pt-16 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              <ArrowLeft className="h-4 w-4" /> {tCommon("backToList")}
            </Link>
            <span
              className="mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category[loc]}
            </span>
            <h1 className="font-display mt-5 text-3xl font-bold tracking-tight text-navy-950 sm:text-5xl">{post.title[loc]}</h1>
            <p className="mt-5 text-sm text-silver-500">
              {t("byAuthor")} {post.author}, {post.authorRole[loc]} · {post.date} · {post.readTime} {tCommon("readTime")}
            </p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-5">
          {post.content[loc].map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-navy-900">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-lg font-bold text-navy-950">{tCommon("viewAll")}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <Card>
                  <span
                    className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.category[loc]}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold text-navy-950">{p.title[loc]}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
