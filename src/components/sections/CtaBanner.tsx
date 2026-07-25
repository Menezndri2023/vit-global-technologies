import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CtaBanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/devis",
  secondaryLabel,
  secondaryHref = "/contact"
}: {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-y bg-navy-950">
      <div className="container-vit">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-navy-900 px-6 py-16 text-center sm:px-16 sm:py-20">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">{subtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button as={Link} href={primaryHref} variant="secondary" className="!bg-white !text-brand-700 hover:!bg-white/90" icon={<ArrowRight className="h-4 w-4" />}>
                {primaryLabel}
              </Button>
              <Button as={Link} href={secondaryHref} variant="outline" className="!border-white/30 !bg-transparent !text-white hover:!border-white" icon={<MessageCircle className="h-4 w-4" />}>
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
