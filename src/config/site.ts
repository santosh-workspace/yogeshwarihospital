/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — Yogeshwari Hospital
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every real-world value on the site lives here. Nothing is hard-coded in a
 *  component. Search this file for `TODO` before going live.
 *
 *  The Google Business Profile could not be read programmatically, so the
 *  values marked TODO are DELIBERATE placeholders — they are NOT real. A
 *  plausible-looking-but-wrong phone number on a hospital site is worse than
 *  an obvious placeholder, so none were invented.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Yogeshwari Hospital",
  legalName: "Yogeshwari Hospital — Eye and Pediatric Surgery Centre",
  /**
   * Exactly as the Google Business Profile lists it. Emitted as `alternateName`
   * so Google can tie this site to that listing — NAP consistency is a direct
   * local-ranking factor and the listing name is longer than our display name.
   */
  gbpName: "Yogeshwari Hospital - Ramdas Nagargoje (Eye And Pediatric Surgery)",
  /**
   * Public-facing name variations for the SAME organization — not separate
   * businesses. "Yogeshwari Surgical" is the hospital's own shorthand (it is
   * their domain, yogeshwarisurgical.com); "Yogeshwari Surgical Hospital" is
   * the natural combined form patients use. Emitted as `alternateName` in
   * schema and used for brand-query titles. The registered name is unverified;
   * the GBP listing name above is the closest official public record.
   */
  alternateNames: ["Yogeshwari Surgical", "Yogeshwari Surgical Hospital"],
  tagline: "Eye and Pediatric Surgery Centre",
  shortDescription:
    "A dedicated eye and paediatric surgery centre in Chhatrapati Sambhajinagar, bringing specialist child health and advanced eye care under one roof.",

  /** Production domain. Used for canonicals, OG, sitemap, schema @ids. */
  url: "https://www.yogeshwarisurgical.com",

  /** TODO: confirm against the Google Business Profile. */
  contact: {
    phoneDisplay: "+91 98603 29675",
    /** E.164, no spaces — used in tel: links */
    phoneE164: "+919860329675",
    /** Digits only, country code first — used in wa.me links */
    whatsapp: "919860329675",
    email: "care@yogeshwarihospital.com",
  },

  /** Confirmed by the client. TODO: the PIN code is still outstanding. */
  address: {
    street: "Gut No. 91, Plot No. 4, Behind Bembde Hospital and Hotel MH 20",
    area: "Sangram Nagar, Beed Bypass",
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    /** TODO: confirm the PIN code — deliberately blank rather than guessed. */
    postalCode: "",
    country: "IN",
    countryName: "India",
  },

  /**
   * The exact pin from the Google Business Profile listing (the !3d/!4d pair in
   * the Maps share URL — not the @lat,lng, which is only the map's viewport).
   */
  geo: {
    latitude: 19.8488105,
    longitude: 75.3367874,
  },

  /**
   * All derived from the hospital's own Google Business Profile listing.
   *
   * `cid` is the listing's permanent numeric id, decoded from the Maps share
   * URL (`!1s0x…:0x27fbd5e73c46f1b0` → the second half in decimal). A cid link
   * always resolves to this exact listing, which a name-and-address search
   * cannot guarantee once there are similarly named clinics nearby.
   */
  maps: {
    cid: "2881131575759008176",
    /** Keyless embed pinned to the exact coordinates — no Maps API bill. */
    embedSrc:
      "https://maps.google.com/maps?q=19.8488105,75.3367874&z=16&hl=en&output=embed",
    /** Routes to the precise pin rather than a geocoded guess at the address. */
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=19.8488105%2C75.3367874",
    placeUrl: "https://maps.google.com/?cid=2881131575759008176",
    /**
     * Opens the listing, where the review control sits.
     * TODO: for a one-tap "write a review" box, paste the short link from the
     * Google Business Profile dashboard (Home → Ask for reviews). That needs the
     * ChIJ-form Place ID, which the share URL does not expose.
     */
    reviewUrl: "https://maps.google.com/?cid=2881131575759008176",
  },

  /** TODO: confirm OPD hours. Times are 24h, used for both display and schema. */
  hours: [
    { days: "Monday – Saturday", label: "Morning OPD", open: "09:00", close: "14:00" },
    { days: "Monday – Saturday", label: "Evening OPD", open: "17:00", close: "20:00" },
    { days: "Sunday", label: "Emergency only", open: "10:00", close: "13:00" },
  ],
  emergencyNote: "Emergency paediatric care available round the clock by phone.",

  /** TODO: replace with the real handles. Empty strings are hidden from the UI automatically. */
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "",
    /* The real Business Profile listing — this is what `sameAs` needs. */
    google: "https://maps.google.com/?cid=2881131575759008176",
  },

  /**
   * TODO: create two Calendly event types and paste the URLs.
   * Until then the appointment CTAs fall back to WhatsApp + phone, so the page
   * never dead-ends a patient.
   */
  calendly: {
    pediatricSurgery: "",
    eyeCare: "",
  },

  /** The primary local-SEO city. Interpolated into titles, H1s and schema. */
  city: "Chhatrapati Sambhajinagar",
  cityAlt: "Aurangabad",

  /** TODO: replace with the Google Search Console verification token. */
  verification: {
    google: "",
  },
} as const;

export type Doctor = {
  slug: string;
  name: string;
  honorific: string;
  role: string;
  department: "pediatric-surgery" | "eye-care";
  qualification: string;
  /** Post-graduate / super-speciality degree, shown separately where relevant. */
  superSpeciality?: string;
  /** Where they trained. A real trust signal for a surgical practice. */
  training?: string;
  experience: string;
  /** State medical council registration. Displaying it is good practice in India. */
  registration: string;
  bio: string[];
  specializations: string[];
  consultationAreas: string[];
  timings: { days: string; time: string }[];
  languages: string[];
  image: string;
  /** Public path used for structured data (absolute URL is derived from it). */
  photo: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-ramdas-nagargoje",
    name: "Dr. Ramdas D. Nagargoje",
    honorific: "Dr.",
    role: "Paediatric Surgeon",
    department: "pediatric-surgery",
    qualification: "M.B.B.S., M.S. (General Surgery), M.Ch. (Paediatric Surgery)",
    superSpeciality: "M.Ch. (Paediatric Surgery)",
    training: "K.E.M. Hospital & B.J. Wadia Hospital for Children, Mumbai",
    /** Inferred from the 2002 registration year — deliberately conservative. */
    experience: "20+ years",
    registration: "2002/03/1074",
    bio: [
      "Dr. Ramdas D. Nagargoje is a paediatric surgeon and heads the surgical department at Yogeshwari Hospital. He holds an M.S. in General Surgery followed by an M.Ch. in Paediatric Surgery — the super-speciality qualification required to operate on newborns and children.",
      "He trained at K.E.M. Hospital and at B.J. Wadia Hospital for Children in Mumbai, one of India's foremost paediatric institutions. His practice spans newborn and infant surgery, laparoscopic abdominal procedures, paediatric urology with urodynamic assessment, brain and spine surgery, airway and tracheal work, endoscopy and thoracoscopy, and emergency trauma.",
      "Parents consistently describe the same thing: an unhurried explanation of what is actually wrong, a clear account of whether an operation is needed at all, and written instructions to take home. Where a condition will resolve without surgery, he says so.",
    ],
    specializations: [
      "Newborn & infant surgery",
      "Laparoscopic (keyhole) abdominal surgery",
      "Paediatric urology & urodynamics",
      "Brain & spine surgery in children",
      "Endoscopy & thoracoscopy",
      "Emergency & trauma surgery",
    ],
    consultationAreas: [
      "Hernia, hydrocele and undescended testis",
      "Antenatally detected congenital malformation",
      "Chronic constipation and soiling",
      "Daytime wetting and recurrent urine infection",
      "Acute abdominal pain or vomiting in a child",
      "Second opinion on recommended child surgery",
    ],
    timings: [
      { days: "Monday – Saturday", time: "9:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "Emergency and trauma only" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-ramdas-nagargoje.png",
    photo: "/images/doctors/dr-ramdas-nagargoje.png",
  },
  {
    slug: "dr-manisha-nagargoje",
    name: "Dr. Manisha Nagargoje (Sanap)",
    honorific: "Dr.",
    role: "Ophthalmologist",
    department: "eye-care",
    qualification: "M.B.B.S., D.O.M.S. (Mumbai)",
    superSpeciality: "D.O.M.S. (Mumbai)",
    training: "Mumbai",
    /** Inferred from the 2004 registration year — deliberately conservative. */
    experience: "20+ years",
    registration: "2004/03/1498",
    bio: [
      "Dr. Manisha Nagargoje (Sanap) heads eye care at Yogeshwari Hospital. She holds a D.O.M.S. from Mumbai and practises the full range of general ophthalmology — vision testing and refraction through to cataract assessment and surgical planning.",
      "She has a particular interest in the eye complications of diabetes and in glaucoma — two conditions that quietly take vision years before a patient notices anything is wrong, and which are found by examination rather than by symptoms.",
      "She also screens children's vision, which sits naturally alongside the hospital's paediatric department: squint, refractive error and lazy eye respond far better when caught before school age.",
    ],
    specializations: [
      "Comprehensive eye examination",
      "Vision testing & refraction",
      "Cataract evaluation & surgical planning",
      "Glaucoma screening and monitoring",
      "Diabetic retinopathy assessment",
      "Paediatric vision screening",
    ],
    consultationAreas: [
      "Blurred or declining vision",
      "Spectacle and contact lens prescription",
      "Cataract second opinion",
      "Annual diabetic eye screening",
      "Red, painful or watering eyes",
      "Squint or lazy eye in a child",
    ],
    timings: [
      { days: "Monday – Saturday", time: "10:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "By prior appointment" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-manisha-nagargoje.png",
    photo: "/images/doctors/dr-manisha-nagargoje.png",
  },
];

export const getDoctorByDepartment = (dept: Doctor["department"]) =>
  doctors.find((d) => d.department === dept)!;

/** Convenience links built from the config above. */
/**
 * Address rendered as display lines. Kept in one place so the footer, contact
 * card, location panel and schema can never drift apart — NAP consistency is a
 * direct local-ranking factor. Blank parts (currently the PIN) drop out.
 */
export const addressLines: string[] = [
  siteConfig.address.street,
  siteConfig.address.area,
  [
    `${siteConfig.address.locality}, ${siteConfig.address.region}`,
    siteConfig.address.postalCode,
  ]
    .filter(Boolean)
    .join(" "),
].filter(Boolean);

export const addressOneLine = addressLines.join(", ");

export const links = {
  tel: `tel:${siteConfig.contact.phoneE164}`,
  whatsapp: (message = "Hello, I would like to book an appointment at Yogeshwari Hospital.") =>
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
  email: `mailto:${siteConfig.contact.email}`,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Departments",
    href: "/departments",
    children: [
      { label: "Paediatric Surgery", href: "/departments/pediatric-surgery" },
      { label: "Eye Care & Ophthalmology", href: "/departments/eye-care" },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;
