"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiAward, FiClock, FiGlobe } from "react-icons/fi";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { departments } from "@/config/content";
import { doctors } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Specialist cards. Portrait-led, with the credentials that actually drive a
 * booking decision surfaced on the card itself: qualification, years, and when
 * they are available.
 */
export function DoctorsSection() {
  return (
    <Section id="doctors" tone="light">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Meet our specialists"
          segments={[
            { text: "The same doctor," },
            { text: "every visit", accent: true },
          ]}
          lead="Continuity is not a nicety in medicine. Seeing the same specialist each time means your history is known, and a small change is noticed against a real baseline rather than read cold."
        />

        <Stagger className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8" amount={0.14}>
          {doctors.map((doc) => {
            const dept = departments.find((d) => d.slug === doc.department)!;
            const rose = dept.accent === "rose";

            return (
              <Reveal key={doc.slug} child variant="up">
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-xl2)] border border-edge bg-surface-2 shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                  <div className="grid sm:grid-cols-5">
                    {/* Portrait */}
                    <div className="relative aspect-4/5 overflow-hidden sm:col-span-2 sm:aspect-auto">
                      <Image
                        src={doc.image}
                        alt={
                          doc.slug === "dr-ramdas-nagargoje"
                            ? "Portrait of Dr. Ramdas D. Nagargoje, Paediatric Surgeon"
                            : "Portrait of Dr. Manisha Nagargoje (Sanap), Ophthalmologist"
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 20vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100",
                          rose
                            ? "bg-linear-to-t from-rose-900/40 to-transparent"
                            : "bg-linear-to-t from-brand-900/40 to-transparent",
                        )}
                      />
                      {/* Experience badge */}
                      <span
                        className={cn(
                          "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white shadow-md backdrop-blur",
                          rose ? "bg-rose-600/90" : "bg-brand-700/90",
                        )}
                      >
                        {doc.experience}
                      </span>
                    </div>

                    {/* Detail */}
                    <div className="flex flex-col p-6 sm:col-span-3 sm:p-7">
                      <p
                        className={cn(
                          "text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
                          rose ? "text-rose-600" : "text-brand-600",
                        )}
                      >
                        {dept.name}
                      </p>
                      <h3 className="mt-2 text-h3 font-bold tracking-tight text-fg">
                        {doc.name}
                      </h3>
                      <p className="mt-1.5 text-[0.92rem] text-fg-muted">{doc.role}</p>

                      <dl className="mt-6 space-y-3 text-[0.86rem]">
                        <div className="flex gap-2.5">
                          <dt className="sr-only">Qualification</dt>
                          <FiAward
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 shrink-0",
                              rose ? "text-rose-500" : "text-brand-500",
                            )}
                          />
                          <dd className="font-medium text-fg">{doc.qualification}</dd>
                        </div>
                        <div className="flex gap-2.5">
                          <dt className="sr-only">Consulting hours</dt>
                          <FiClock
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 shrink-0",
                              rose ? "text-rose-500" : "text-brand-500",
                            )}
                          />
                          <dd className="text-fg-muted">
                            {doc.timings[0].days} · {doc.timings[0].time}
                          </dd>
                        </div>
                        <div className="flex gap-2.5">
                          <dt className="sr-only">Languages</dt>
                          <FiGlobe
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 shrink-0",
                              rose ? "text-rose-500" : "text-brand-500",
                            )}
                          />
                          <dd className="text-fg-muted">{doc.languages.join(" · ")}</dd>
                        </div>
                      </dl>

                      <ul className="mt-6 flex flex-wrap gap-1.5">
                        {doc.specializations.slice(0, 3).map((s) => (
                          <li
                            key={s}
                            className="rounded-full bg-surface-3 px-2.5 py-1 text-[0.73rem] font-medium text-fg-muted"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-7">
                        <Link
                          href={`/doctors#${doc.slug}`}
                          className={cn(
                            "inline-flex items-center gap-1.5 text-[0.89rem] font-semibold transition-colors",
                            rose
                              ? "text-rose-700 hover:text-rose-800"
                              : "text-brand-700 hover:text-brand-800",
                          )}
                        >
                          Full profile
                          <FiArrowUpRight
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                        <Link
                          href="/appointment"
                          className="text-[0.89rem] font-semibold text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
                        >
                          Book appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
