import Link from "next/link";
import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { departments } from "@/config/content";
import { addressLines, doctors, links, siteConfig } from "@/config/site";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Departments", href: "/departments" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white">
      {/* Ambient gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[62rem] -translate-x-1/2 rounded-full bg-brand-600/18 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-rose-500/12 blur-[110px]"
      />

      <div className="container-page relative pt-12 pb-10 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${siteConfig.name} — home`}>
              <Logo invert />
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              {siteConfig.shortDescription}
            </p>
            <SocialLinks tone="dark" className="mt-7" />
          </div>

          {/* Departments */}
          <nav aria-label="Departments" className="lg:col-span-3">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-300">
              Departments
            </h2>
            <ul className="mt-5 space-y-3.5">
              {departments.map((dept) => {
                const doc = doctors.find((d) => d.department === dept.slug)!;
                return (
                  <li key={dept.slug}>
                    <Link
                      href={dept.href}
                      className="group block text-[0.95rem] text-white/80 transition-colors hover:text-white"
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        {dept.name}
                        <FiArrowUpRight
                          aria-hidden="true"
                          className="text-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-300"
                        />
                      </span>
                      <span className="mt-0.5 block text-[0.82rem] text-white/40">
                        {doc.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-300">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.93rem] text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* NAP — must match the Google Business Profile exactly */}
          <div className="lg:col-span-3">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rose-300">
              Visit &amp; Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[0.93rem]">
              <li className="flex gap-3">
                <FiMapPin aria-hidden="true" className="mt-1 shrink-0 text-rose-300" />
                <address className="not-italic text-white/65">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3">
                <FiPhone aria-hidden="true" className="mt-1 shrink-0 text-rose-300" />
                <a
                  href={links.tel}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <FiMail aria-hidden="true" className="mt-1 shrink-0 text-rose-300" />
                <a
                  href={links.email}
                  className="break-all text-white/80 transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <FiClock aria-hidden="true" className="mt-1 shrink-0 text-rose-300" />
                <div className="text-white/65">
                  {siteConfig.hours.map((h) => (
                    <p key={`${h.days}-${h.label}`}>
                      <span className="text-white/80">{h.days}</span> · {h.label}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.82rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {siteConfig.tagline}.
          </p>
          <p className="max-w-xl md:text-right">
            Information on this site is for general guidance and does not replace a
            consultation. For a medical emergency, call the hospital directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
