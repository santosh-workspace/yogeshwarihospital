import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiAward, FiCheck, FiClock, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { departments } from "@/config/content";
import { doctors, links, siteConfig } from "@/config/site";
import { breadcrumbSchema, graph, physicianSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";
import { ButtonRow } from "@/components/ui/ButtonRow";

export const metadata: Metadata = {
  title: `Our Doctors — Paediatric Surgeon & Eye Specialist in ${siteConfig.city}`,
  description: `Meet the specialists at Yogeshwari Hospital: Dr. Ramdas D. Nagargoje (Paediatric Surgeon) and Dr. Manisha Nagargoje (Sanap), Ophthalmologist, in ${siteConfig.city}. Qualifications, experience, timings and booking.`,
  alternates: { canonical: "/doctors" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
];

export default function DoctorsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          physicianSchema("dr-ramdas-nagargoje"),
          physicianSchema("dr-manisha-nagargoje"),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Our specialists"
        segments={[
          { text: "The doctors" },
          { text: "you will see", accent: true },
        ]}
        lead="Two consultants, each running their own department. No rotating panel, no registrar you have not met — the person who assesses you on the first visit is the person who follows you up."
        crumbs={crumbs}
      />

      {/* Full profiles */}
      {doctors.map((doc, index) => {
        const dept = departments.find((d) => d.slug === doc.department)!;
        const rose = dept.accent === "rose";
        const flip = index % 2 === 1;

        return (
          <Section
            key={doc.slug}
            id={doc.slug}
            tone={index % 2 === 0 ? "white" : "light"}
            className="scroll-mt-24"
          >
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* Portrait column */}
                <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
                  <Reveal variant="clip">
                    <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-xl2)] bg-surface-3 shadow-[var(--shadow-lift)]">
                      <Image
                        src={doc.image}
                        alt={`Portrait of ${doc.name}, ${doc.role}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-linear-to-t from-ink-950/45 via-transparent to-transparent"
                      />
                      <div className="absolute inset-x-4 bottom-4">
                        <div className="glass rounded-2xl px-4 py-3">
                          <p className="text-[0.82rem] font-bold tracking-tight text-ink-950">
                            {doc.qualification}
                          </p>
                          <p className="mt-0.5 text-[0.75rem] text-ink-600">
                            {doc.experience} in practice
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Timings card */}
                  <Reveal variant="up" delay={0.1}>
                    <div className="mt-5 rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-6">
                      <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                        <FiClock aria-hidden="true" /> Consulting hours
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {doc.timings.map((t) => (
                          <li
                            key={t.time}
                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-dashed border-edge pb-2.5 text-[0.88rem] last:border-0 last:pb-0"
                          >
                            <span className="font-medium text-fg">{t.days}</span>
                            <span
                              className={cn(rose ? "text-rose-700" : "text-brand-700")}
                            >
                              {t.time}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 flex items-center gap-2 text-[0.82rem] text-fg-subtle">
                        <FiGlobe aria-hidden="true" className="shrink-0" />
                        {doc.languages.join(" · ")}
                      </p>
                    </div>
                  </Reveal>
                </div>

                {/* Detail column */}
                <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
                  <Reveal variant="up">
                    <p
                      className={cn(
                        "flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
                        rose ? "text-rose-600" : "text-brand-600",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="font-display text-[0.95rem] not-italic text-ink-300"
                      >
                        0{index + 1}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px w-8",
                          rose
                            ? "bg-linear-to-r from-rose-400 to-transparent"
                            : "bg-linear-to-r from-brand-400 to-transparent",
                        )}
                      />
                      {dept.name}
                    </p>
                  </Reveal>

                  <Reveal variant="up" delay={0.05}>
                    <h2 className="mt-5 text-h2 font-bold tracking-tight text-fg">
                      {doc.name}
                    </h2>
                    <p className="mt-2.5 text-lead text-fg-muted">{doc.role}</p>
                  </Reveal>

                  <Stagger className="mt-7 space-y-4 text-[0.98rem] leading-relaxed text-fg-muted">
                    {doc.bio.map((p) => (
                      <Reveal key={p.slice(0, 20)} child variant="up">
                        <p>{p}</p>
                      </Reveal>
                    ))}
                  </Stagger>

                  {/* Credentials */}
                  <Reveal variant="up" delay={0.1}>
                    <div className="mt-8 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-2 px-3.5 py-1.5 text-[0.82rem] font-semibold text-fg">
                        <FiAward
                          aria-hidden="true"
                          className={rose ? "text-rose-500" : "text-brand-500"}
                        />
                        {doc.qualification}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.82rem] font-semibold",
                          rose ? "bg-rose-50 text-rose-700" : "bg-brand-50 text-brand-700",
                        )}
                      >
                        {doc.experience} experience
                      </span>
                    </div>
                  </Reveal>

                  {/* Specialisations */}
                  <div className="mt-9 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                        Specialisation
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {doc.specializations.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-2.5 text-[0.9rem] text-fg-muted"
                          >
                            <FiCheck
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 shrink-0",
                                rose ? "text-rose-500" : "text-brand-500",
                              )}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
                        Consultation areas
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {doc.consultationAreas.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-2.5 text-[0.9rem] text-fg-muted"
                          >
                            <FiCheck
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 shrink-0",
                                rose ? "text-rose-500" : "text-brand-500",
                              )}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Reveal variant="up" delay={0.15}>
                    <ButtonRow className="mt-10">
                      <BookAppointmentButton
                        department={dept.slug}
                        variant={rose ? "rose" : "primary"}
                        size="lg"
                        arrow
                        fullWidth
                      >
                        Book with {doc.name.split(" ").slice(0, 2).join(" ")}
                      </BookAppointmentButton>
                      <ButtonLink
                        href={links.whatsapp(
                          `Hello, I would like an appointment with ${doc.name}.`,
                        )}
                        variant="whatsapp"
                        size="lg"
                        icon={<FaWhatsapp />}
                        fullWidth
                      >
                        WhatsApp
                      </ButtonLink>
                    </ButtonRow>
                    <Link
                      href={dept.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-fg-muted transition-colors hover:text-fg"
                    >
                      {dept.shortName} department
                      <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <FinalCTA />
    </>
  );
}
