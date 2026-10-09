import { departments } from "@/config/content";
import { doctors, siteConfig } from "@/config/site";

/**
 * JSON-LD builders.
 *
 * Everything is emitted as a single connected @graph on each page, with stable
 * @ids so Google can resolve the relationships (Hospital → Physician →
 * MedicalClinic) instead of treating them as unrelated islands.
 *
 * NOTE ON REVIEWS: no `aggregateRating` or `review` is emitted anywhere. The
 * testimonials in src/config/content.ts are placeholders, and marking up
 * invented reviews as structured data on a real medical practice is both
 * deceptive and a documented cause of manual action. Once the real Google
 * reviews are in place, add aggregateRating here using the true count/average.
 */

const abs = (path = "") => new URL(path, siteConfig.url).toString();

export const ids = {
  organization: abs("#organization"),
  hospital: abs("#hospital"),
  website: abs("#website"),
  place: abs("#place"),
  doctor: (slug: string) => abs(`doctors#${slug}`),
  department: (slug: string) => abs(`departments/${slug}#clinic`),
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: [siteConfig.address.street, siteConfig.address.area]
    .filter(Boolean)
    .join(", "),
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  /* Omitted entirely while unknown — an empty string is worse than absent. */
  ...(siteConfig.address.postalCode
    ? { postalCode: siteConfig.address.postalCode }
    : {}),
  addressCountry: siteConfig.address.country,
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: siteConfig.geo.latitude,
  longitude: siteConfig.geo.longitude,
};

/** Collapses the display-friendly hours into schema.org opening specs. */
const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "17:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Sunday"],
    opens: "10:00",
    closes: "13:00",
  },
];

/** Social profile links — `sameAs` is how Google connects the profiles. */
const sameAs: string[] = Object.values(siteConfig.social).filter(
  (url) => typeof url === "string" && url.length > 0,
);

const contactPoints = [
  {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phoneE164,
    contactType: "reservations",
    name: "Appointment booking",
    areaServed: "IN",
    availableLanguage: ["Marathi", "Hindi", "English"],
  },
  {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phoneE164,
    contactType: "emergency",
    areaServed: "IN",
    availableLanguage: ["Marathi", "Hindi", "English"],
  },
];

const medicalSpecialties = ["Pediatric", "Ophthalmologic", "Surgical"];

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: abs("icon.png"),
      width: 512,
      height: 512,
    },
    image: abs("images/hero-hospital.png"),
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    address: postalAddress,
    contactPoint: contactPoints,
    sameAs,
  };
}

/**
 * Hospital is a subtype of both MedicalOrganization and LocalBusiness, so a
 * multi-typed node satisfies all three requirements without duplicate entities.
 */
export function hospitalSchema() {
  return {
    "@type": ["Hospital", "MedicalOrganization", "LocalBusiness"],
    "@id": ids.hospital,
    name: siteConfig.name,
    alternateName: [siteConfig.legalName, siteConfig.gbpName, ...siteConfig.alternateNames],
    description: siteConfig.shortDescription,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: siteConfig.maps.placeUrl,
    image: [abs("images/hero-hospital.png"), abs("images/hospital-exterior.png")],
    logo: abs("icon.png"),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    openingHoursSpecification: openingHours,
    medicalSpecialty: medicalSpecialties,
    isAcceptingNewPatients: true,
    availableService: departments.flatMap((dept) =>
      dept.services.map((service) => ({
        "@type": "MedicalProcedure",
        name: service.name,
        description: service.description,
      })),
    ),
    department: departments.map((dept) => ({ "@id": ids.department(dept.slug) })),
    employee: doctors.map((doc) => ({ "@id": ids.doctor(doc.slug) })),
    parentOrganization: { "@id": ids.organization },
    areaServed: [
      { "@type": "City", name: siteConfig.city },
      { "@type": "City", name: siteConfig.cityAlt },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: abs("appointment"),
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Appointment" },
    },
    sameAs,
  };
}

export function physicianSchema(slug: string) {
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) return null;
  const dept = departments.find((d) => d.slug === doc.department)!;

  return {
    "@type": "Physician",
    "@id": ids.doctor(doc.slug),
    name: doc.name,
    honorificPrefix: doc.honorific,
    jobTitle: doc.role,
    description: doc.bio[0],
    url: abs(`doctors#${doc.slug}`),
    image: abs(doc.photo.replace(/^\//, "")),
    medicalSpecialty: doc.department === "pediatric-surgery" ? "Pediatric" : "Ophthalmologic",
    knowsLanguage: doc.languages,
    knowsAbout: doc.specializations,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: doc.qualification,
    },
    /* State medical council registration — a strong entity signal for a doctor. */
    identifier: {
      "@type": "PropertyValue",
      name: "Medical Council Registration",
      value: doc.registration,
    },
    worksFor: { "@id": ids.hospital },
    memberOf: { "@id": ids.department(dept.slug) },
    address: postalAddress,
    telephone: siteConfig.contact.phoneE164,
    availableService: dept.services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
    })),
  };
}

/**
 * Person node for a verified doctor. The `Physician` node above describes the
 * practice entity; this one describes the human being — the association is
 * verified (both doctors run departments at this hospital and the hospital's
 * own Google Business Profile listing carries Dr. Ramdas Nagargoje's name),
 * and every field mirrors visible page content. Only verified fields: no
 * awards, no outcome claims, no invented identifiers.
 */
export function personSchema(slug: string) {
  const doc = doctors.find((d) => d.slug === slug);
  if (!doc) return null;

  return {
    "@type": "Person",
    "@id": abs(`doctors#${slug}-person`),
    name: doc.name,
    honorificPrefix: doc.honorific,
    jobTitle: doc.role,
    description: doc.bio[0],
    url: abs(`doctors#${doc.slug}`),
    image: abs(doc.photo.replace(/^\//, "")),
    knowsLanguage: doc.languages,
    knowsAbout: doc.specializations,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: doc.qualification,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "Medical Council Registration",
      value: doc.registration,
    },
    worksFor: { "@id": ids.hospital },
    address: postalAddress,
    telephone: siteConfig.contact.phoneE164,
  };
}

export function medicalClinicSchema(slug: "pediatric-surgery" | "eye-care") {
  const dept = departments.find((d) => d.slug === slug)!;
  const doc = doctors.find((d) => d.department === slug)!;

  return {
    "@type": "MedicalClinic",
    "@id": ids.department(slug),
    name: `${dept.name} — ${siteConfig.name}`,
    description: dept.intro,
    url: abs(`departments/${slug}`),
    telephone: siteConfig.contact.phoneE164,
    address: postalAddress,
    geo: geoCoordinates,
    openingHoursSpecification: openingHours,
    medicalSpecialty: slug === "pediatric-surgery" ? "Pediatric" : "Ophthalmologic",
    isPartOf: { "@id": ids.hospital },
    physician: { "@id": ids.doctor(doc.slug) },
    availableService: dept.services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      description: s.description,
    })),
    areaServed: { "@type": "City", name: siteConfig.city },
  };
}

export function medicalWebPageSchema(slug: "pediatric-surgery" | "eye-care") {
  const dept = departments.find((d) => d.slug === slug)!;

  return {
    "@type": "MedicalWebPage",
    "@id": abs(`departments/${slug}#webpage`),
    url: abs(`departments/${slug}`),
    name: dept.metaTitle,
    description: dept.metaDescription,
    inLanguage: "en-IN",
    about: { "@id": ids.department(slug) },
    isPartOf: { "@id": ids.website },
    publisher: { "@id": ids.organization },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ids.organization },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.href.replace(/^\//, "")),
    })),
  };
}

/** Wraps any set of nodes into a single connected graph document. */
export function graph(...nodes: (object | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
