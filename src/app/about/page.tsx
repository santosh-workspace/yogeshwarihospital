import type { Metadata } from "next";
import { FiCheck } from "react-icons/fi";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LocationSection } from "@/components/sections/LocationSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { img } from "@/config/images";
import { siteConfig } from "@/config/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Yogeshwari Surgical, Aurangabad",
  description:
    "About Yogeshwari Surgical Hospital, Beed Bypass, Chhatrapati Sambhajinagar (Aurangabad) — paediatric surgery & eye care under one roof.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Yogeshwari Surgical, Aurangabad",
    description:
      "Eye and paediatric surgery centre in Chhatrapati Sambhajinagar — two specialists, one family practice.",
    url: `${siteConfig.url}/about`,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
];

const facilities = [
  "Dedicated paediatric consultation room",
  "Equipped eye examination suite",
  "Minor procedure and day-care facility",
  "Clean, monitored inpatient beds",
  "Attendant seating in patient rooms",
  "Wheelchair-accessible ground floor",
  "On-site sample collection",
  "Maintained immunisation records",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow="About us"
        segments={[
          { text: "A hospital built" },
          { text: "around families", accent: true },
        ]}
        lead={`Yogeshwari Hospital brings paediatrics and ophthalmology together under one roof in ${siteConfig.city} — because households do not arrange their health needs by speciality.`}
        crumbs={crumbs}
        image={img.hospitalExterior}
      />

      <AboutSection />

      {/* Facilities */}
      <Section tone="light">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                index="03"
                eyebrow="The facility"
                segments={[{ text: "Calm, clean," }, { text: "unhurried", accent: true }]}
                lead="Nothing about a hospital visit is relaxing. The building can at least avoid making it worse — short waits, quiet rooms, and space for the person who came with you."
              />

              <Stagger className="mt-9 grid gap-2.5 sm:grid-cols-2" amount={0.05}>
                {facilities.map((item) => (
                  <Reveal key={item} child variant="up">
                    <div className="flex items-start gap-2.5 rounded-xl border border-edge bg-surface-2 px-3.5 py-3">
                      <FiCheck
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-rose-500"
                      />
                      <span className="text-[0.88rem] leading-snug text-fg-muted">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </Stagger>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              <MediaFrame
                image={img.ward}
                ratio="aspect-3/4"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="mt-8"
              />
              <MediaFrame
                image={img.patientRoom}
                ratio="aspect-3/4"
                sizes="(max-width: 1024px) 45vw, 28vw"
              />
              <MediaFrame
                image={img.consultationRoom}
                ratio="aspect-4/3"
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="col-span-2"
              />
            </div>
          </div>
        </div>
      </Section>

      <WhyChooseUs />
      <LocationSection />
      <FinalCTA />
    </>
  );
}
