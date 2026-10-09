import type { Metadata } from "next";
import { FiClock, FiMail, FiMapPin, FiNavigation, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { PageHero } from "@/components/layout/PageHero";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqsGeneral } from "@/config/content";
import { img } from "@/config/images";
import { addressLines, links, siteConfig } from "@/config/site";
import { breadcrumbSchema, faqSchema, graph, hospitalSchema } from "@/lib/schema";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";

export const metadata: Metadata = {
  title: "Contact & Address in Aurangabad",
  description:
    "Address, phone, WhatsApp, OPD timings & directions: Yogeshwari Hospital, Beed Bypass, Chhatrapati Sambhajinagar (Aurangabad).",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Yogeshwari Hospital, Aurangabad",
    description:
      "Find us on Beed Bypass, Chhatrapati Sambhajinagar — address, phone, timings and one-tap directions.",
    url: `${siteConfig.url}/contact`,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact Us", href: "/contact" },
];

export default function ContactPage() {
  const cards = [
    {
      icon: FiPhone,
      label: "Call the hospital",
      value: siteConfig.contact.phoneDisplay,
      detail: "Fastest during OPD hours",
      href: links.tel,
      accent: "brand" as const,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "Message us",
      detail: "Questions and booking requests",
      href: links.whatsapp(),
      accent: "rose" as const,
    },
    {
      icon: FiMail,
      label: "Email",
      value: siteConfig.contact.email,
      detail: "For reports and records",
      href: links.email,
      accent: "brand" as const,
    },
    {
      icon: FiNavigation,
      label: "Directions",
      value: "Open in Maps",
      detail: `${siteConfig.address.locality}, ${siteConfig.address.region}`,
      href: siteConfig.maps.directionsUrl,
      accent: "rose" as const,
    },
  ];

  return (
    <>
      <JsonLd
        data={graph(hospitalSchema(), faqSchema(faqsGeneral), breadcrumbSchema(crumbs))}
      />

      <PageHero
        eyebrow="Contact"
        segments={[{ text: "Get in" }, { text: "touch", accent: true }]}
        lead={`Yogeshwari Hospital is in ${siteConfig.address.locality}, ${siteConfig.address.region}. Call, message, or just turn up during OPD hours — walk-in patients are seen between booked slots.`}
        crumbs={crumbs}
        image={img.hospitalExterior}
      />

      {/* Contact cards */}
      <Section tone="white" spacing="md">
        <div className="container-page">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.07}>
            {cards.map((card) => {
              const Icon = card.icon;
              const rose = card.accent === "rose";
              const external = card.href.startsWith("http");

              return (
                <Reveal key={card.label} child variant="up">
                  <a
                    href={card.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full flex-col rounded-[1.4rem] border border-edge bg-surface-2 p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
                  >
                    <span
                      className={
                        rose
                          ? "grid size-12 place-items-center rounded-2xl bg-rose-50 text-[1.25rem] text-rose-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white"
                          : "grid size-12 place-items-center rounded-2xl bg-brand-50 text-[1.25rem] text-brand-600 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white"
                      }
                    >
                      <Icon aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                      {card.label}
                    </p>
                    <p className="mt-2 break-words text-[1rem] font-bold tracking-tight text-fg">
                      {card.value}
                    </p>
                    <p className="mt-1.5 text-[0.83rem] text-fg-subtle">{card.detail}</p>
                  </a>
                </Reveal>
              );
            })}
          </Stagger>

          {/* Address + hours + social */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Reveal variant="up" className="lg:col-span-1">
              <div className="h-full rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-7">
                <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                  <FiMapPin aria-hidden="true" /> Hospital address
                </p>
                <address className="mt-4 text-[1rem] not-italic leading-relaxed text-fg">
                  <strong className="block font-bold text-fg">
                    {siteConfig.name}
                  </strong>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{siteConfig.address.countryName}</span>
                </address>
                <div className="mt-6">
                  <ButtonLink
                    href={siteConfig.maps.directionsUrl}
                    size="sm"
                    icon={<FiNavigation />}
                    magnetic={false}
                  >
                    Get Directions
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.08} className="lg:col-span-1">
              <div className="h-full rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-7">
                <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                  <FiClock aria-hidden="true" /> Hospital timings
                </p>
                <ul className="mt-4 space-y-3">
                  {siteConfig.hours.map((h) => (
                    <li
                      key={`${h.days}-${h.label}`}
                      className="border-b border-dashed border-edge pb-3 last:border-0 last:pb-0"
                    >
                      <p className="text-[0.92rem] font-semibold text-fg">
                        {h.days}
                      </p>
                      <p className="mt-0.5 text-[0.86rem] text-fg-muted">
                        {h.label} · {formatTime(h.open)} – {formatTime(h.close)}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-[0.83rem] leading-relaxed text-brand-800">
                  {siteConfig.emergencyNote}
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.16} className="lg:col-span-1">
              <div className="flex h-full flex-col rounded-[var(--radius-xl2)] border border-edge bg-linear-to-br from-brand-50 to-rose-50/70 p-7">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                  Follow the hospital
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">
                  Vaccination reminders, seasonal health advice and updates on OPD
                  timings go out on social first.
                </p>
                <div className="mt-6">
                  <SocialLinks size="lg" />
                </div>
                <div className="mt-auto pt-7">
                  <BookAppointmentButton fullWidth arrow magnetic={false}>
                    Book Appointment
                  </BookAppointmentButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <LocationSection />
      <FaqSection faqs={faqsGeneral} index="03" tone="white" />
    </>
  );
}

/** "09:00" → "9:00 AM" */
function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
