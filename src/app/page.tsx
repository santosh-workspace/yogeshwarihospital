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
  title: `${siteConfig.name} | Dr. Ramdas Nagargoje | ${siteConfig.city}`,
  description: `Official website of Yogeshwari Hospital (Yogeshwari Surgical) in ${siteConfig.city} — paediatric surgery by Dr. Ramdas Nagargoje, eye care by Dr. Manisha Nagargoje, location, timings and appointments.`,
  alternates: { canonical: "/" },
  openGraph: {
    url: siteConfig.url,
    title: `${siteConfig.name} | Dr. Ramdas Nagargoje | ${siteConfig.tagline} in ${siteConfig.city}`,
    description: siteConfig.shortDescription,
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
