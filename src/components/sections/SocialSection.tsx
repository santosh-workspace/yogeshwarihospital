"use client";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Section, SectionHeading } from "@/components/ui/Section";
import { img } from "@/config/images";
import { siteConfig } from "@/config/site";

/**
 * Social band with an Instagram grid preview.
 *
 * TODO: this is a static grid of site imagery, not a live feed. Wiring the
 * real feed needs an Instagram Graph API token (Business/Creator account →
 * Facebook app → long-lived token) fetched server-side and revalidated
 * hourly — deliberately not stubbed with a third-party widget script, which
 * would add ~100KB of blocking JS and a cross-origin dependency for six
 * thumbnails.
 */
const preview = [
  img.childHappy,
  img.eyeExam,
  img.consultationRoom,
  img.newborn,
  img.eyewear,
  img.hospitalExterior,
];

export function SocialSection() {
  return (
    <Section tone="white" spacing="md">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index="07"
              eyebrow="Follow along"
              segments={[
                { text: "Health notes," },
                { text: "not noise", accent: true },
              ]}
              lead="Vaccination reminders, seasonal advice, eye-care tips and hospital updates — short, practical posts worth the notification."
            />

            <Reveal variant="up" delay={0.1}>
              <div className="mt-8">
                <SocialLinks size="lg" />
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.15}>
              {/* Shown only once the real Instagram URL is configured — an
                  empty href would self-link the button. */}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-edge bg-surface-2 p-3 pr-5 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-lg text-white">
                    <FaInstagram aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.88rem] font-bold tracking-tight text-fg">
                      See more on Instagram
                    </span>
                    <span className="block text-[0.76rem] text-fg-subtle">
                      Updates from the hospital
                    </span>
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="text-fg-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </Reveal>
          </div>

          {/* Feed preview. Thumbnails link out only when the real Instagram URL
              is configured; otherwise they render as plain figures so crawlers
              and visitors never hit an empty self-link. */}
          <div className="lg:col-span-7">
            <Stagger className="grid grid-cols-3 gap-2.5 md:gap-3.5" amount={0.06}>
              {preview.map((image, i) =>
                siteConfig.social.instagram ? (
                  <Reveal key={i} child variant="scale">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View this post on Instagram"
                      className="group relative block aspect-square overflow-hidden rounded-xl bg-surface-3 md:rounded-2xl"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 32vw, 18vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 grid place-items-center bg-ink-950/0 text-white opacity-0 transition-all duration-400 group-hover:bg-ink-950/45 group-hover:opacity-100"
                      >
                        <FaInstagram className="text-2xl" />
                      </span>
                    </a>
                  </Reveal>
                ) : (
                  <Reveal key={i} child variant="scale">
                    <figure className="relative block aspect-square overflow-hidden rounded-xl bg-surface-3 md:rounded-2xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 32vw, 18vw"
                        placeholder="blur"
                        className="object-cover"
                      />
                    </figure>
                  </Reveal>
                ),
              )}
            </Stagger>
          </div>
        </div>
      </div>
    </Section>
  );
}
