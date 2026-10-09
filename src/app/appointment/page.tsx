import type { Metadata } from "next";
import Image from "next/image";
import { FiClock, FiFileText, FiMapPin, FiPhone, FiUsers } from "react-icons/fi";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { departments, faqsGeneral } from "@/config/content";
import { addressLines, doctors, links, siteConfig } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  hospitalSchema,
  medicalClinicSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book Appointment in Aurangabad",
  description:
    "Book in Aurangabad with Dr. Ramdas Nagargoje (child surgery) or Dr. Manisha Nagargoje (eye care). Request a slot in 1 minute.",
  alternates: { canonical: "/appointment" },
  openGraph: {
    title: "Book Appointment in Aurangabad | Yogeshwari Hospital",
    description:
      "One form, one minute — request a paediatric surgery or eye-care slot in Chhatrapati Sambhajinagar.",
    url: `${siteConfig.url}/appointment`,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Book Appointment", href: "/appointment" },
];

const prep = [
  {
    icon: FiFileText,
    title: "Bring previous records",
    body: "Prescriptions, discharge summaries and — for a surgical opinion — the actual scan films or CD, not just the report. For eye patients, your current spectacles and last prescription.",
  },
  {
    icon: FiClock,
    title: "Arrive ten minutes early",
    body: "Enough time for registration without eating into your consultation. If you are running late, call — the slot can usually be shifted rather than lost.",
  },
  {
    icon: FiUsers,
    title: "Book both departments together",
    body: "Mention it in the form and reception will sequence the two slots back to back, so one trip covers the whole family.",
  },
  {
    icon: FiPhone,
    title: "Dilating drops need a driver",
    body: "A full eye examination usually involves dilation, which blurs vision for four to six hours. Arrange for someone else to drive you home.",
  },
];

export default function AppointmentPage() {
  return (
    <>
      <JsonLd
        data={graph(
          hospitalSchema(),
          medicalClinicSchema("pediatric-surgery"),
          medicalClinicSchema("eye-care"),
          faqSchema(faqsGeneral),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Book appointment"
        segments={[{ text: "One form." }, { text: "One minute.", accent: true }]}
        lead="Tell us who the patient is, which department you need and when suits you. The request goes straight to reception, who confirm the slot."
        crumbs={crumbs}
      />

      <Section tone="white" spacing="md">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* The form — the same component the pop-up dialog uses */}
            <div className="min-w-0 lg:col-span-7">
              <div className="rounded-[var(--radius-xl2)] border border-edge bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
                <BookingForm syncHash />
              </div>
            </div>

            {/* Reassurance column */}
            <aside className="min-w-0 lg:col-span-5">
              <Reveal variant="up">
                <div className="rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-6 sm:p-7">
                  <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                    Who you will see
                  </h2>
                  <ul className="mt-5 space-y-5">
                    {departments.map((dept) => {
                      const doc = doctors.find((d) => d.department === dept.slug)!;
                      const rose = dept.accent === "rose";
                      return (
                        <li key={dept.slug} className="flex gap-3.5">
                          <Image
                            src={doc.image}
                            alt={`Portrait of ${doc.name}`}
                            width={52}
                            height={52}
                            className="size-13 shrink-0 rounded-xl object-cover object-top"
                          />
                          <div className="min-w-0">
                            <p
                              className={
                                rose
                                  ? "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-rose-600"
                                  : "text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-600"
                              }
                            >
                              {dept.name}
                            </p>
                            <p className="mt-1 text-[0.95rem] font-bold tracking-tight text-fg">
                              {doc.name}
                            </p>
                            <p className="mt-0.5 text-[0.82rem] text-fg-subtle">
                              {doc.qualification}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>

              <Reveal variant="up" delay={0.08}>
                <div className="mt-4 rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-6 sm:p-7">
                  <h2 className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                    <FiClock aria-hidden="true" /> OPD hours
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-[0.9rem]">
                    {siteConfig.hours.map((h) => (
                      <li
                        key={`${h.days}-${h.label}`}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dashed border-edge pb-2.5 last:border-0 last:pb-0"
                      >
                        <span className="font-medium text-fg">{h.days}</span>
                        <span className="text-fg-muted">{h.label}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-6 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                    <FiMapPin aria-hidden="true" /> Where to come
                  </h2>
                  <address className="mt-3 text-[0.9rem] not-italic leading-relaxed text-fg-muted">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={links.tel}
                    className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    <FiPhone aria-hidden="true" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </Section>

      {/* Before you come in */}
      <Section tone="light" spacing="md">
        <div className="container-page">
          <Reveal variant="up">
            <h2 className="text-h3 font-bold tracking-tight text-fg">
              Before you come in
            </h2>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.07}>
            {prep.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} child variant="up">
                  <div className="flex h-full flex-col rounded-[1.4rem] border border-edge bg-surface-2 p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-[1.15rem] text-brand-600">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[0.98rem] font-bold leading-snug tracking-tight text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.87rem] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </Stagger>
        </div>
      </Section>

      <FaqSection faqs={faqsGeneral} index="03" tone="white" />
    </>
  );
}
