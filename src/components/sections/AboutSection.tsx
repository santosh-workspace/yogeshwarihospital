"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Parallax, ScrollZoom } from "@/components/ui/Parallax";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { img } from "@/config/images";
import { siteConfig } from "@/config/site";

/**
 * About band. Two parallax image columns offset against each other, with the
 * copy holding the left. The images move at different rates, which is what
 * makes the depth read.
 */
export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2 py-13 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-50 blur-[110px]"
      />

      <div className="container-page relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-6 lg:pt-8">
            <SectionHeading
              index="02"
              eyebrow="About the hospital"
              segments={[
                { text: "Small enough to" },
                { text: "know you", accent: true },
                { text: "by name" },
              ]}
            />

            <Stagger className="mt-7 space-y-5 text-[1rem] leading-relaxed text-fg-muted">
              <Reveal child variant="up">
                <p>
                  Yogeshwari Hospital was built around a simple observation: families do
                  not organise themselves by medical speciality. A child needs a hernia
                  reviewed, a parent needs their vision checked, a grandparent needs an
                  opinion on a cataract — and all of it happens in the same week, to the
                  same household.
                </p>
              </Reveal>
              <Reveal child variant="up">
                <p>
                  So the hospital runs two departments side by side. Paediatric surgery,
                  led by Dr. Ramdas D. Nagargoje, M.Ch., and eye care, led by
                  Dr. Manisha Nagargoje (Sanap), D.O.M.S. Same building, same records,
                  same day where it can be arranged. Our website address is
                  yogeshwarisurgical.com, so the hospital is also known as
                  Yogeshwari Surgical or Yogeshwari Surgical Hospital — the same
                  hospital and the same two doctors.
                </p>
              </Reveal>
              <Reveal child variant="up">
                <p>
                  What has not changed since the beginning is the length of a
                  consultation. There is time to describe the problem properly, time for
                  the questions that occur to you halfway through, and written
                  instructions to take home — because nobody remembers verbal advice
                  correctly with a sick child on their hip.
                </p>
              </Reveal>
            </Stagger>

            {/* Pull quote */}
            <Reveal variant="blur" delay={0.1}>
              <blockquote className="mt-10 border-l-2 border-brand-400 pl-6">
                <p className="font-display text-[1.4rem] leading-snug text-fg md:text-[1.6rem]">
                  &ldquo;Investigation should change the treatment. If it will not, we do
                  not order it.&rdquo;
                </p>
                <footer className="mt-3 text-[0.84rem] font-medium text-fg-subtle">
                  — Practice principle, {siteConfig.name}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal variant="up" delay={0.15}>
              <div className="mt-9">
                <ButtonLink href="/about" variant="secondary" size="lg" arrow>
                  More about us
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Offset parallax image pair */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <Parallax distance={44} className="pt-10 md:pt-16">
                <div className="space-y-4 md:space-y-5">
                  <ScrollZoom className="relative aspect-3/4 overflow-hidden rounded-[1.5rem] bg-surface-3 shadow-[var(--shadow-soft)]">
                    <Image
                      src={img.consultationRoom.src}
                      alt={img.consultationRoom.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 23vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </ScrollZoom>
                  <ScrollZoom className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-surface-3 shadow-[var(--shadow-soft)]">
                    <Image
                      src={img.ward.src}
                      alt={img.ward.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 23vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </ScrollZoom>
                </div>
              </Parallax>

              <Parallax distance={-52}>
                <div className="space-y-4 md:space-y-5">
                  <ScrollZoom className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-surface-3 shadow-[var(--shadow-soft)]">
                    <Image
                      src={img.corridor.src}
                      alt={img.corridor.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 23vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </ScrollZoom>
                  <ScrollZoom className="relative aspect-3/4 overflow-hidden rounded-[1.5rem] bg-surface-3 shadow-[var(--shadow-soft)]">
                    <Image
                      src={img.patientRoom.src}
                      alt={img.patientRoom.alt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 23vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </ScrollZoom>
                </div>
              </Parallax>
            </div>

            {/* Floating credential card */}
            <Reveal variant="scale" delay={0.2}>
              <div className="relative z-10 -mt-8 ml-4 inline-flex items-center gap-4 rounded-2xl border border-edge bg-surface-2 p-4 pr-6 shadow-[var(--shadow-lift)] md:-mt-10 md:ml-8">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-rose-500 text-white">
                  <FiArrowRight aria-hidden="true" className="-rotate-45 text-xl" />
                </span>
                <div>
                  <p className="text-[0.9rem] font-bold tracking-tight text-fg">
                    Both departments, one visit
                  </p>
                  <p className="mt-0.5 text-[0.78rem] text-fg-subtle">
                    Tell reception when booking
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
