"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { departments } from "@/config/content";
import { doctors } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The two department cards. This is the main navigational fork on the
 * homepage, so the cards are large, image-led and unambiguous about which
 * doctor sits behind each one.
 */
export function DepartmentsSection() {
  return (
    <Section id="departments" tone="light">
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="Departments"
          segments={[
            { text: "Two specialities," },
            { text: "one" },
            { text: "waiting room", accent: true },
          ]}
          lead="A family rarely needs just one kind of doctor. Paediatric surgery and eye care run from the same building, so a child's surgical review and a grandparent's cataract opinion can happen on the same morning."
        />

        <Stagger className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-7" amount={0.12}>
          {departments.map((dept, i) => {
            const doc = doctors.find((d) => d.department === dept.slug)!;
            const rose = dept.accent === "rose";
            const Icon = dept.icon;

            return (
              <Reveal key={dept.slug} child variant="up" className="min-w-0">
                <TiltCard
                  className="h-full min-w-0"
                  glow={rose ? "rgb(214 104 140 / 0.16)" : "rgb(42 111 240 / 0.16)"}
                >
                  <Link
                    href={dept.href}
                    className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-xl2)] border border-edge bg-surface-2 shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
                  >
                    {/* Animated border sweep on hover */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        rose
                          ? "shadow-[inset_0_0_0_1.5px_var(--color-rose-300)]"
                          : "shadow-[inset_0_0_0_1.5px_var(--color-brand-300)]",
                      )}
                    />

                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={dept.heroImage.src}
                        alt={dept.heroImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 44vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-107"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70",
                          rose
                            ? "bg-linear-to-tr from-rose-900/85 via-rose-800/35 to-transparent"
                            : "bg-linear-to-tr from-brand-900/85 via-brand-800/35 to-transparent",
                        )}
                      />

                      {/* Oversized ghost numeral — editorial anchor */}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-6 right-4 font-display text-[7rem] leading-none text-white/12"
                      >
                        0{i + 1}
                      </span>

                      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                        <div>
                          <span
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur",
                              rose ? "bg-rose-500/85" : "bg-brand-600/85",
                            )}
                          >
                            {dept.kicker}
                          </span>
                          <h3 className="mt-3 text-h3 font-bold text-white">{dept.name}</h3>
                        </div>
                        <span
                          className={cn(
                            "grid size-13 shrink-0 place-items-center rounded-2xl text-[1.5rem] text-white shadow-lg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
                            rose ? "bg-rose-500" : "bg-brand-600",
                          )}
                        >
                          <Icon aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <p className="text-[0.98rem] leading-relaxed text-fg-muted">
                        {dept.intro}
                      </p>

                      {/*
                        Doctor line. `object-top` matters here: the portraits are
                        head-to-torso at 4:5, so a centred square crop would frame
                        the coat rather than the face.
                      */}
                      <div className="mt-6 flex items-center gap-3 border-t border-edge pt-5">
                        <Image
                          src={doc.image}
                          alt={`Portrait of ${doc.name}`}
                          width={48}
                          height={48}
                          className="size-12 rounded-full object-cover object-top ring-2 ring-surface-2"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.92rem] font-bold tracking-tight text-fg">
                            {doc.name}
                          </p>
                          <p className="truncate text-[0.8rem] text-fg-subtle">
                            {doc.qualification}
                          </p>
                        </div>
                      </div>

                      {/* Top four services */}
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {dept.services.slice(0, 4).map((s) => (
                          <li
                            key={s.name}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[0.74rem] font-medium",
                              rose
                                ? "bg-rose-50 text-rose-700"
                                : "bg-brand-50 text-brand-700",
                            )}
                          >
                            {s.name}
                          </li>
                        ))}
                        <li className="rounded-full bg-surface-3 px-2.5 py-1 text-[0.74rem] font-medium text-fg-subtle">
                          +{dept.services.length - 4} more
                        </li>
                      </ul>

                      <span
                        className={cn(
                          "mt-7 inline-flex items-center gap-2 text-[0.9rem] font-semibold",
                          rose ? "text-rose-700" : "text-brand-700",
                        )}
                      >
                        Explore {dept.shortName}
                        <FiArrowRight
                          aria-hidden="true"
                          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5"
                        />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
