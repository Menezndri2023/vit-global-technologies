import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Section, Eyebrow } from "@/components/ui/Section";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/data/types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({ locale, title: t("heroTitle"), description: t("heroSubtitle"), path: "/blog" });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const t = await getTranslations("blog");
  const tCommon = await getTranslations("common");

  return (
    <>
      <section className="bg-grid bg-white pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="container-vit">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t("heroEyebrow")}</Eyebrow>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-silver-600">{t("heroSubtitle")}</p>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
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
                  {t("byAuthor")} {post.author} · {post.date} · {post.readTime} {tCommon("readTime")}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
