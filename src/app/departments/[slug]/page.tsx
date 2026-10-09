import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { DepartmentDetail } from "@/components/sections/DepartmentDetail";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { departments, faqsEyeCare, faqsPediatricSurgery } from "@/config/content";
import { getDoctorByDepartment, siteConfig } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  medicalClinicSchema,
  medicalWebPageSchema,
  physicianSchema,
} from "@/lib/schema";

type Params = { slug: string };

/** Both departments are prerendered at build time — no runtime rendering. */
export function generateStaticParams(): Params[] {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return {};

  return {
    title: dept.metaTitle,
    description: dept.metaDescription,
    alternates: { canonical: `/departments/${dept.slug}` },
    openGraph: {
      title: `${dept.metaTitle} | ${siteConfig.name}`,
      description: dept.metaDescription,
      url: `${siteConfig.url}/departments/${dept.slug}`,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${dept.name} at ${siteConfig.name}, ${siteConfig.city}`,
        },
      ],
    },
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  const doctor = getDoctorByDepartment(dept.slug);
  const faqs = dept.slug === "pediatric-surgery" ? faqsPediatricSurgery : faqsEyeCare;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Departments", href: "/departments" },
    { name: dept.name, href: `/departments/${dept.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          medicalWebPageSchema(dept.slug),
          medicalClinicSchema(dept.slug),
          physicianSchema(doctor.slug),
          faqSchema(faqs),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow={dept.kicker}
        segments={[
          { text: dept.name.split(" ")[0] },
          { text: dept.name.split(" ").slice(1).join(" ") || "Care", accent: true },
          // Old city name in parentheses: many patients still search "Aurangabad".
          { text: `in ${siteConfig.city} (${siteConfig.cityAlt})` },
        ]}
        lead={dept.intro}
        crumbs={crumbs}
        image={dept.heroImage}
        accent={dept.accent}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={`/appointment#${dept.slug}`}
            variant={dept.accent === "rose" ? "rose" : "primary"}
            size="lg"
            arrow
          >
            Book {dept.shortName} Appointment
          </ButtonLink>
          <ButtonLink href="/doctors" variant="secondary" size="lg">
            Meet {doctor.name.split(" ").slice(0, 2).join(" ")}
          </ButtonLink>
        </div>
      </PageHero>

      <DepartmentDetail slug={dept.slug} />

      <Testimonials />

      <FaqSection
        faqs={faqs}
        index="04"
        eyebrow={`${dept.shortName} FAQs`}
        segments={[{ text: "Questions parents" }, { text: "and patients", accent: true }, { text: "ask" }]}
        lead={`Common questions about ${dept.shortName.toLowerCase()} at Yogeshwari Hospital.`}
        tone="light"
      />

      <FinalCTA />
    </>
  );
}
