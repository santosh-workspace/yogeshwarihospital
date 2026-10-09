import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { PageHero } from "@/components/layout/PageHero";
import {
  ServiceCategoryCard,
  type CategoryIconKey,
} from "@/components/sections/ServiceCategoryCard";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section } from "@/components/ui/Section";
import { departments, faqsGeneral, emergencyServices } from "@/config/content";
import { img } from "@/config/images";
import { doctors, siteConfig } from "@/config/site";
import { breadcrumbSchema, faqSchema, graph, hospitalSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";
import {
  ServiceGrid,
  type ServiceCategoryId,
} from "@/components/sections/ServiceGrid";

export const metadata: Metadata = {
  title: "Hospital Services in Aurangabad",
  description:
    "All 26 services at Yogeshwari Hospital, Aurangabad: child surgery, urology, eye exams, cataract & emergency care.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Hospital Services in Aurangabad | Yogeshwari Hospital",
    description:
      "26 services across paediatric surgery, eye care and emergency day-care in Chhatrapati Sambhajinagar.",
    url: `${siteConfig.url}/services`,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

type Category = {
  id: string;
  index: string;
  eyebrow: string;
  segments: { text: string; accent?: boolean }[];
  lead: string;
  accent: "brand" | "rose";
  items: { name: string; description: string; icon: React.ComponentType }[];
  image: (typeof img)[keyof typeof img];
  /** Background photograph for the category card. */
  cardImage: (typeof img)[keyof typeof img];
  iconKey: CategoryIconKey;
  /** Plain id the client-side <ServiceGrid> resolves its own data from. */
  gridId: ServiceCategoryId;
  title: string;
  href?: string;
  hrefLabel?: string;
  doctorName?: string;
};

export default function ServicesPage() {
  const pediatricSurgery = departments.find((d) => d.slug === "pediatric-surgery")!;
  const eyeCare = departments.find((d) => d.slug === "eye-care")!;

  const categories: Category[] = [
    {
      id: "pediatric-surgery-services",
      index: "01",
      eyebrow: "Paediatric surgery",
      segments: [{ text: "Surgery scaled" }, { text: "to a child", accent: true }],
      lead: pediatricSurgery.intro,
      accent: "rose",
      items: pediatricSurgery.services,
      image: img.newborn,
      cardImage: img.operatingTheatre,
      iconKey: "pediatric-surgery",
      gridId: "pediatric-surgery",
      title: "Surgery scaled to a child",
      href: pediatricSurgery.href,
      hrefLabel: "Paediatric surgery department",
      doctorName: `${doctors[0].name}, ${doctors[0].superSpeciality}`,
    },
    {
      id: "eye-care-services",
      index: "02",
      eyebrow: "Eye care services",
      segments: [{ text: "Vision, checked" }, { text: "properly", accent: true }],
      lead: eyeCare.intro,
      accent: "brand",
      items: eyeCare.services,
      image: img.eyeExam,
      cardImage: img.eyeExam,
      iconKey: "eye-care",
      gridId: "eye-care",
      title: "Vision, checked properly",
      href: eyeCare.href,
      hrefLabel: "Eye care department",
      doctorName: `${doctors[1].name}, ${doctors[1].superSpeciality}`,
    },
    {
      id: "emergency-and-day-care",
      index: "03",
      eyebrow: "Emergency & day care",
      segments: [{ text: "When it" }, { text: "cannot wait", accent: true }],
      lead: "Accident and trauma, acute abdomen, and the pre- and post-operative care around a planned procedure — including the cases where the right advice is to wait rather than operate.",
      accent: "rose",
      items: emergencyServices,
      image: img.equipment,
      cardImage: img.corridor,
      iconKey: "emergency",
      gridId: "emergency",
      title: "When it cannot wait",
    },
  ];

  return (
    <>
      <JsonLd
        data={graph(hospitalSchema(), faqSchema(faqsGeneral), breadcrumbSchema(crumbs))}
      />

      <PageHero
        eyebrow="Services"
        segments={[
          { text: "Twenty-six services," },
          { text: "two specialists", accent: true },
        ]}
        lead={`Everything Yogeshwari Hospital offers across paediatric surgery, eye care, and emergency and day-care procedures in ${siteConfig.city}.`}
        crumbs={crumbs}
      >
        {/* In-page jump nav — doubles as internal linking */}
        <nav aria-label="Service categories" className="mt-8">
          <ul className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-2 px-4 py-2 text-[0.86rem] font-medium text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[0.8rem] text-ink-300"
                  >
                    {cat.index}
                  </span>
                  {cat.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {categories.map((cat, i) => {
        const rose = cat.accent === "rose";
        return (
          <Section
            key={cat.id}
            id={cat.id}
            tone={i % 2 === 0 ? "white" : "light"}
            spacing="md"
            className="scroll-mt-24"
          >
            <div className="container-page">
              {/* Image-backed category card — the photograph carries the heading */}
              <ServiceCategoryCard
                index={cat.index}
                eyebrow={cat.eyebrow}
                title={cat.title}
                description={cat.lead}
                image={cat.cardImage}
                iconKey={cat.iconKey}
                accent={cat.accent}
                href={cat.href}
                hrefLabel={cat.hrefLabel}
                count={cat.items.length}
                className="mb-9"
              />

              <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <Reveal variant="up">
                    <h3 className="text-h3 font-bold tracking-tight text-fg">
                      Every {cat.eyebrow.toLowerCase()} service
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
                      {cat.items.length} in total. Each one starts with an unhurried
                      consultation and ends with written instructions to take home.
                    </p>
                  </Reveal>

                  {cat.doctorName && (
                    <Reveal variant="up" delay={0.1}>
                      <p className="mt-6 text-[0.88rem] text-fg-subtle">
                        Led by{" "}
                        <span className="font-semibold text-fg">
                          {cat.doctorName}
                        </span>
                      </p>
                    </Reveal>
                  )}

                  <Reveal variant="up" delay={0.14}>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <BookAppointmentButton
                        variant={rose ? "rose" : "primary"}
                        arrow
                      >
                        Book appointment
                      </BookAppointmentButton>
                      {cat.href && (
                        <Link
                          href={cat.href}
                          className={cn(
                            "inline-flex items-center gap-1.5 self-center text-[0.9rem] font-semibold transition-colors",
                            rose
                              ? "text-rose-700 hover:text-rose-800"
                              : "text-brand-700 hover:text-brand-800",
                          )}
                        >
                          {cat.hrefLabel}
                          <FiArrowUpRight aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </Reveal>

                  <div className="mt-9 hidden lg:block">
                    <MediaFrame
                      image={cat.image}
                      ratio="aspect-4/3"
                      sizes="(max-width: 1024px) 100vw, 34vw"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <ServiceGrid category={cat.gridId} />
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <FaqSection faqs={faqsGeneral} index="04" tone="white" />
      <FinalCTA />
    </>
  );
}
