import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { LocationSection } from "@/components/sections/LocationSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { SocialSection } from "@/components/sections/SocialSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqsGeneral } from "@/config/content";
import { siteConfig } from "@/config/site";
import { faqSchema, graph, medicalClinicSchema, personSchema, physicianSchema } from "@/lib/schema";

export const metadata: Metadata = {
  // absolute: bypasses the layout title template so the homepage title is
  // exactly this — 44 chars, brand + doctor name first.
  title: { absolute: "Yogeshwari Hospital | Dr. Ramdas Nagargoje" },
  description:
    "Official site of Yogeshwari Hospital, Chhatrapati Sambhajinagar (Aurangabad). Child surgery by Dr. Ramdas Nagargoje & eye care — book a visit.",
  alternates: { canonical: "/" },
  openGraph: {
    url: siteConfig.url,
    title: "Yogeshwari Hospital | Dr. Ramdas Nagargoje",
    description:
      "Eye and paediatric surgery centre in Chhatrapati Sambhajinagar (Aurangabad): child surgery, eye care, timings and appointments.",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Yogeshwari Hospital — Eye and Pediatric Surgery Centre, Chhatrapati Sambhajinagar",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          physicianSchema("dr-ramdas-nagargoje"),
          physicianSchema("dr-manisha-nagargoje"),
          personSchema("dr-ramdas-nagargoje"),
          personSchema("dr-manisha-nagargoje"),
          medicalClinicSchema("pediatric-surgery"),
          medicalClinicSchema("eye-care"),
          faqSchema(faqsGeneral),
        )}
      />

      <Hero />
      <DepartmentsSection />
      <AboutSection />
      <DoctorsSection />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <SocialSection />
      <LocationSection />
      <FaqSection faqs={faqsGeneral} index="09" />
      <FinalCTA />
    </>
  );
}
