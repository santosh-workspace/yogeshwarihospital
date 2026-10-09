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
import { faqSchema, graph, medicalClinicSchema, physicianSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${siteConfig.tagline} in ${siteConfig.city}`,
  description: `Yogeshwari Hospital — paediatric surgeon and eye specialist in ${siteConfig.city}. Newborn and child surgery, paediatric urology, comprehensive eye examination, cataract and glaucoma screening. Book an appointment online.`,
  alternates: { canonical: "/" },
  openGraph: {
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.tagline} in ${siteConfig.city}`,
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
