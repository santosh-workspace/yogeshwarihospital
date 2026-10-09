import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAlertCircle,
  FiAlertTriangle,
  FiAward,
  FiClock,
  FiCrosshair,
  FiDroplet,
  FiEye,
  FiHeart,
  FiHome,
  FiLayers,
  FiRefreshCw,
  FiShield,
  FiSun,
  FiTarget,
  FiUserCheck,
  FiUsers,
  FiWind,
  FiZap,
} from "react-icons/fi";
import { img } from "./images";
import { siteConfig } from "./site";

export type Department = {
  slug: "pediatric-surgery" | "eye-care";
  href: string;
  name: string;
  shortName: string;
  kicker: string;
  headline: string;
  intro: string;
  description: string[];
  accent: "brand" | "rose";
  icon: IconType;
  image: (typeof img)[keyof typeof img];
  heroImage: (typeof img)[keyof typeof img];
  services: {
    name: string;
    description: string;
    icon: IconType;
    /** Only set where the photo genuinely depicts the service. */
    image?: (typeof img)[keyof typeof img];
  }[];
  metaTitle: string;
  metaDescription: string;
};

export const departments: Department[] = [
  {
    slug: "pediatric-surgery",
    href: "/departments/pediatric-surgery",
    name: "Paediatric Surgery",
    shortName: "Paediatric Surgery",
    kicker: "Newborn & child surgical care",
    headline: "Surgery scaled to a child",
    intro:
      "A dedicated paediatric surgeon for newborns, infants and children — from keyhole abdominal surgery to paediatric urology, brain and spine procedures, and emergency trauma.",
    description: [
      "Children are not small adults. Their airway, fluid balance, blood volume, drug dosing and pain response all differ, and a newborn weighing two kilograms leaves almost no margin for error. That is why paediatric surgery is a separate super-speciality with its own training pathway, and why Yogeshwari Hospital runs it as a dedicated department.",
      "Dr. Ramdas D. Nagargoje holds an M.Ch. in Paediatric Surgery and trained at K.E.M. Hospital and B.J. Wadia Hospital for Children, Mumbai — the latter among India's foremost paediatric centres. The department covers newborn and infant surgery, laparoscopic abdominal procedures, paediatric urology including urodynamic assessment, brain and spine surgery, airway and tracheal work, endoscopy and thoracoscopy, and emergency trauma.",
      "Wherever it is a genuine option, the approach is the least invasive one that solves the problem: keyhole rather than open, day-care rather than admission, and watchful waiting rather than an operation when the condition will settle on its own. You will be told plainly which of those applies to your child.",
    ],
    accent: "rose",
    icon: FiHeart,
    image: img.motherChildren,
    heroImage: img.pediatricExam,
    services: [
      {
        name: "Newborn & Infant Surgery",
        description:
          "Surgery on newborns and young children, including congenital malformations that need correcting in the first days or weeks of life.",
        icon: FiHeart,
        image: img.newborn,
      },
      {
        name: "Laparoscopic Abdominal Surgery",
        description:
          "Keyhole abdominal procedures through a few millimetre-sized ports — less pain, a smaller scar and a faster return to normal activity than open surgery.",
        icon: FiCrosshair,
        image: img.svcSurgery,
      },
      {
        name: "Paediatric Urology",
        description:
          "Surgery of the kidney, ureter, bladder and genitalia in children, covering conditions such as hydronephrosis, reflux, hypospadias and undescended testis.",
        icon: FiDroplet,
        image: img.svcPaedClinicRoom,
      },
      {
        name: "Urodynamics Study & Treatment",
        description:
          "Objective measurement of how a child's bladder fills and empties, used to plan treatment for daytime wetting, recurrent infection and neurogenic bladder.",
        icon: FiActivity,
        image: img.svcClinicianGloves,
      },
      {
        name: "Constipation Clinic",
        description:
          "A dedicated clinic for chronic childhood constipation and soiling — assessment for an underlying cause first, then a structured bowel programme rather than repeat laxatives.",
        icon: FiRefreshCw,
        image: img.svcNurseChild,
      },
      {
        name: "Prenatal Consultation & Guidance",
        description:
          "Counselling for parents when a scan detects a congenital malformation before birth: what it means, what surgery may involve, and how delivery should be planned.",
        icon: FiUsers,
        image: img.svcParentBaby,
      },
      {
        name: "Brain & Spine Surgery",
        description:
          "Paediatric neurosurgical procedures, including hydrocephalus and spinal dysraphism such as spina bifida and tethered cord.",
        icon: FiTarget,
        image: img.svcBrainScan,
      },
      {
        name: "Airway & Tracheal Treatment",
        description:
          "Management of tracheal and airway problems in children, including stridor, narrowing and inhaled foreign bodies.",
        icon: FiWind,
        image: img.pediatricExam,
      },
      {
        name: "Endoscopy & Thoracoscopy",
        description:
          "Diagnostic and therapeutic scope procedures of the gastrointestinal tract and the chest, avoiding a large incision wherever possible.",
        icon: FiLayers,
        image: img.svcEndoscopy,
      },
      {
        name: "Emergency Paediatric Surgery",
        description:
          "Urgent operative care for acute abdomen, obstruction, incarcerated hernia, torsion and other conditions where delay costs outcome.",
        icon: FiAlertTriangle,
        image: img.operatingTheatre,
      },
      {
        name: "Accident & Trauma Care",
        description:
          "Assessment and surgical management of childhood injury — falls, burns, road accidents and abdominal or chest trauma.",
        icon: FiZap,
        image: img.svcTrauma,
      },
      {
        name: "Scientific Ear Piercing",
        description:
          "Ear piercing performed under sterile conditions with correct placement and clear aftercare, avoiding the infection and keloid risk of unhygienic piercing.",
        icon: FiAward,
        image: img.childHappy,
      },
    ],
    metaTitle: `Paediatric Surgeon in ${siteConfig.city} | Child Surgery`,
    metaDescription: `Paediatric surgery in ${siteConfig.city} — newborn and infant surgery, laparoscopic procedures, paediatric urology, urodynamics, constipation clinic and emergency child surgery with Dr. Ramdas D. Nagargoje, M.Ch. (Paediatric Surgery).`,
  },
  {
    slug: "eye-care",
    href: "/departments/eye-care",
    name: "Eye Care & Ophthalmology",
    shortName: "Eye Care",
    kicker: "Vision, screening and eye care",
    headline: "Sight is worth protecting early",
    intro:
      "Most sight loss is preventable — if it is found in time. Comprehensive examination, vision testing, and screening for cataract, glaucoma and diabetic eye disease.",
    description: [
      "The eye department covers the whole path from a routine vision check to surgical assessment: refraction and spectacle prescription, cataract evaluation, glaucoma screening, diabetic retinal examination, and treatment of dry eye and ocular surface disease.",
      "Two conditions in particular take sight quietly. Glaucoma damages the optic nerve years before central vision changes, and diabetic retinopathy progresses without pain or blurring until it is advanced. Both are found by examination, not by symptoms — which is why an annual check matters even when your eyes feel fine.",
      "Dr. Manisha Nagargoje (Sanap) also screens children's vision, which pairs naturally with the paediatric department: squint, refractive error and lazy eye all respond far better when they are picked up before school age than after.",
    ],
    accent: "brand",
    icon: FiEye,
    image: img.eyewear,
    heroImage: img.eyeExam,
    services: [
      {
        name: "Comprehensive Eye Examination",
        description:
          "A full assessment of vision, refraction, eye pressure, and the front and back of the eye in a single sitting.",
        icon: FiEye,
        image: img.eyeExam,
      },
      {
        name: "Vision Testing",
        description:
          "Accurate refraction for spectacle and contact lens prescription, including testing for children and for near-work strain.",
        icon: FiSun,
        image: img.eyewear,
      },
      {
        name: "Cataract Consultation",
        description:
          "Grading of the cataract, discussion of lens options, and an honest opinion on whether surgery will meaningfully help yet.",
        icon: FiLayers,
        image: img.eyeClinic,
      },
      {
        name: "Glaucoma Screening",
        description:
          "Eye pressure measurement and optic nerve assessment — the only way to catch a condition that has no early symptoms.",
        icon: FiShield,
        image: img.svcGlaucoma,
      },
      {
        name: "Diabetic Eye Examination",
        description:
          "Dilated retinal examination for anyone living with diabetes, repeated annually, to find retinopathy while it is still treatable.",
        icon: FiActivity,
        image: img.svcDiabeticEye,
      },
      {
        name: "Dry Eye Treatment",
        description:
          "Assessment of tear film and ocular surface, with a treatment plan for burning, grittiness and screen-related strain.",
        icon: FiDroplet,
        image: img.svcDryEye,
      },
      {
        name: "Eye Infection Treatment",
        description:
          "Prompt care for conjunctivitis, styes, lid inflammation and corneal infection, with clear guidance on preventing spread.",
        icon: FiAlertCircle,
        image: img.svcEyeInfection,
      },
      {
        name: "Paediatric Vision Screening",
        description:
          "Checks for squint, refractive error and lazy eye in children, where early detection changes the long-term outcome.",
        icon: FiUserCheck,
        image: img.svcChildVision,
      },
    ],
    metaTitle: `Eye Specialist in ${siteConfig.city} | Ophthalmologist`,
    metaDescription: `Eye care in ${siteConfig.city} — comprehensive eye examination, vision testing, cataract consultation, glaucoma and diabetic eye screening with Dr. Manisha Nagargoje (Sanap), D.O.M.S.`,
  },
];

export const getDepartment = (slug: Department["slug"]) =>
  departments.find((d) => d.slug === slug)!;

/* ── Emergency & day-care (third services category) ───────────────────────── */

export const emergencyServices = [
  {
    name: "Accident & Emergency",
    description:
      "Immediate assessment of childhood injury and acute surgical conditions, with a decision on whether the child needs theatre, admission or observation.",
    icon: FiAlertTriangle,
    image: img.corridor,
  },
  {
    name: "Acute Abdomen",
    description:
      "Urgent evaluation of severe abdominal pain, vomiting and obstruction — appendicitis, intussusception, incarcerated hernia and torsion.",
    icon: FiAlertCircle,
    image: img.svcAcuteAbdomen,
  },
  {
    name: "Day-care Surgery",
    description:
      "Selected procedures completed with same-day discharge, so a child recovers at home rather than on a ward.",
    icon: FiHome,
    image: img.ward,
  },
  {
    name: "Pre-operative Evaluation",
    description:
      "Fitness assessment, necessary investigations and a written plan covering fasting, medication and what to bring on the day.",
    icon: FiUserCheck,
    image: img.svcTheatrePrep,
  },
  {
    name: "Post-operative Review",
    description:
      "Structured follow-up after surgery to confirm healing is on track and to catch complications early.",
    icon: FiHeart,
    image: img.patientRoom,
  },
  {
    name: "Surgical Second Opinion",
    description:
      "An independent review of an operation recommended elsewhere, with the reasoning explained in plain language — including when the answer is to wait.",
    icon: FiLayers,
    image: img.consultationRoom,
  },
];

/* ── Why choose us ────────────────────────────────────────────────────────── */

export const differentiators = [
  {
    title: "A super-specialist, not a generalist",
    body: "Paediatric surgery is a separate qualification beyond general surgery. Dr. Ramdas holds an M.Ch. in it and trained at B.J. Wadia Hospital for Children, Mumbai — so a newborn is operated on by someone who does this specifically, not occasionally.",
    icon: FiAward,
  },
  {
    title: "Two specialities, one family practice",
    body: "A paediatric surgeon and an ophthalmologist under one roof — so a child's surgical review and a grandparent's cataract opinion can happen in the same building on the same day.",
    icon: FiUsers,
  },
  {
    title: "The least invasive option that works",
    body: "Keyhole rather than open, day-care rather than admission, and watchful waiting rather than an operation when the condition will settle by itself. You are told plainly which one applies.",
    icon: FiCrosshair,
  },
  {
    title: "Unhurried consultations",
    body: "Time to describe the problem properly, ask what you actually want to ask, and leave with written instructions rather than a half-remembered explanation.",
    icon: FiClock,
  },
];

/**
 * Homepage counters. Every figure is derived from verified site data — no
 * inferred experience years, patient counts, or surgery totals:
 * - 2 departments (`departments` below), 12 + 8 departmental services
 *   (counted from the service lists in this file), 6-day OPD (siteConfig.hours).
 * Per-doctor experience wording lives only beside the doctors' own displayed
 * credentials and is flagged for owner confirmation — it is not a counter.
 */
export const stats = [
  { value: 2, suffix: "", label: "Specialist departments, one roof" },
  { value: 12, suffix: "", label: "Paediatric surgical services" },
  { value: 8, suffix: "", label: "Eye-care services" },
  { value: 6, suffix: "", label: "Days a week OPD" },
];

/* ── Testimonials ─────────────────────────────────────────────────────────────
   Genuine Google reviews. Each quote is a trimmed excerpt of the real
   review — shortened for the card, and typos tidied — but every sentence
   here is the reviewer's own; nothing is invented or reworded into a claim
   they didn't make. Author names are as they appear publicly on Google.
   The full, verbatim text is public on the hospital's Google listing.
   ────────────────────────────────────────────────────────────────────────── */

export type Testimonial = {
  quote: string;
  /** BCP-47 tag for the quote's language, when it isn't English — lets
   *  screen readers switch pronunciation instead of reading it as English. */
  lang?: "mr" | "hi";
  author: string;
  context: string;
  rating: number;
  department: "pediatric-surgery" | "eye-care" | "general";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Dr. Ramdas Nagargoje successfully performed three surgeries for my son, who was diagnosed with Hirschsprung's disease. He was compassionate, professional, and explained every step clearly. My son is now on the path to a healthy recovery — we are truly blessed to have found such a caring doctor.",
    author: "Santosh",
    context: "Hirschsprung's disease surgery",
    rating: 5,
    department: "pediatric-surgery",
  },
  {
    quote:
      "Very clean and neat hospital, and you can blindly trust the expert surgeons. They give a plant to every patient on the day of discharge — a lovely touch. The doctor explains everything properly, so the patient feels at ease.",
    author: "Asha Mapari",
    context: "Patient experience",
    rating: 5,
    department: "general",
  },
  {
    quote:
      "Sincere gratitude for the excellent treatment my baby boy received for his hernia. Your expertise and care made a significant difference. Thank you for everything you have done. 🙏",
    author: "Manoj Kenekar",
    context: "Hernia surgery",
    rating: 5,
    department: "pediatric-surgery",
  },
  {
    quote:
      "Dedicated staff, advanced facilities and a holistic approach to care — it stands out as a beacon of quality. I highly recommend it for children's surgical and eye-related conditions. Dr. Ramdas Nagargoje sir and madam's dedication adds to its reputation.",
    author: "santosh kalushe",
    context: "Hospital recommendation",
    rating: 5,
    department: "general",
  },
  {
    quote:
      "Yogeshwari Hospital is a fully equipped hospital with paediatric and ophthalmic treatment and facilities available under one roof. Congratulations Dr. Ramdas and Dr. Manisha Nagargoje on the grand inauguration!",
    author: "NEETA SHIRSAT",
    context: "Hospital opening",
    rating: 5,
    department: "general",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────────────── */

export type Faq = { question: string; answer: string };

export const faqsGeneral: Faq[] = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-in patients are seen during OPD hours, but booking ahead means a fixed slot and a much shorter wait. You can book online, send a WhatsApp message, or call the hospital directly. Emergencies are seen without an appointment.",
  },
  {
    question: "What are the OPD timings?",
    answer: `Morning OPD runs from 9:00 AM to 2:00 PM and evening OPD from 5:00 PM to 8:00 PM, Monday to Saturday. Sunday is reserved for emergencies and pre-booked appointments. ${siteConfig.emergencyNote}`,
  },
  {
    question: "Where is the hospital located?",
    answer: `Yogeshwari Hospital is in ${siteConfig.address.locality}, ${siteConfig.address.region}. The Contact page has an embedded map and a one-tap Get Directions link that opens Google Maps with the route already set.`,
  },
  {
    question: "Which languages do the doctors speak?",
    answer:
      "Consultations are available in Marathi, Hindi and English. Please tell reception if you would prefer a particular language and it will be arranged.",
  },
  {
    question: "Can both departments be seen in one visit?",
    answer:
      "Yes. Paediatric surgery and eye care operate from the same building, so a family can arrange consultations with both specialists on the same day. Mention it when booking and reception will sequence the slots.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Bring any previous prescriptions, scans, test reports and discharge summaries. For a surgical opinion, bring the actual imaging films or CD rather than only the report. If you wear spectacles, bring your current pair and the most recent prescription.",
  },
];

export const faqsPediatricSurgery: Faq[] = [
  {
    question: "What is a paediatric surgeon, and why not a general surgeon?",
    answer:
      "Paediatric surgery is a super-speciality requiring an M.Ch. after general surgery training. Children differ from adults in airway, fluid balance, blood volume, drug dosing and pain response, and many of the conditions operated on — congenital malformations in particular — do not occur in adults at all. Dr. Ramdas holds that qualification and trained at B.J. Wadia Hospital for Children, Mumbai.",
  },
  {
    question: "How young can a child have surgery?",
    answer:
      "Newborns, including premature babies, where the condition requires it — some congenital problems must be corrected in the first days of life. The decision weighs the baby's weight, general condition and how urgent the problem is, and making that judgement safely is exactly what paediatric surgical training exists for.",
  },
  {
    question: "Does a surgical consultation mean my child needs an operation?",
    answer:
      "No. A consultation is an assessment. Many childhood conditions — some hernias, hydroceles and undescended testes — resolve on their own or can safely be watched. If that is the case you will be told so, along with what to look out for and when to come back.",
  },
  {
    question: "What is laparoscopic surgery, and is it safe for children?",
    answer:
      "Laparoscopic or keyhole surgery is performed through a few millimetre-sized ports using a camera, instead of one larger incision. In suitable cases it means less pain, a much smaller scar and a faster return to school. It is not right for every condition, and an open approach is sometimes the safer choice — that judgement is part of the consultation.",
  },
  {
    question: "A scan before birth showed an abnormality. Can we consult now?",
    answer:
      "Yes, and it is worth doing early. Prenatal consultation covers what the finding means, whether surgery is likely to be needed and when, and how and where delivery should be planned. Having the plan settled in advance is far better than arranging it after birth.",
  },
  {
    question: "What is a urodynamics study?",
    answer:
      "It measures how the bladder fills, stores and empties. It is used when a child has persistent daytime wetting, recurrent urinary infection or a suspected neurogenic bladder, and it turns guesswork into a specific diagnosis so treatment can be targeted.",
  },
  {
    question: "Our child has had constipation for years. Is a clinic really different?",
    answer:
      "Yes. Chronic constipation and soiling are often treated with repeated laxatives alone. The clinic first looks for an underlying cause — including surgical ones such as Hirschsprung disease or an anorectal anomaly — then sets a structured bowel programme with follow-up, rather than a one-off prescription.",
  },
  {
    question: "Why have ear piercing done at a hospital?",
    answer:
      "Piercing with unsterile equipment or in the wrong position risks infection, embedded studs and keloid scarring. Done under sterile conditions with correct placement and clear aftercare, those risks largely disappear.",
  },
];

export const faqsEyeCare: Faq[] = [
  {
    question: "How often should I have my eyes examined?",
    answer:
      "Every two years for healthy adults under 40, annually after 40, and annually without exception if you have diabetes, high blood pressure, or a family history of glaucoma.",
  },
  {
    question: "Why does diabetes require a separate eye examination?",
    answer:
      "Diabetic retinopathy damages the retina long before vision changes, and it cannot be detected without a dilated examination of the back of the eye. By the time sight is affected, treatment is harder and less effective.",
  },
  {
    question: "Will my eyes be dilated, and can I drive afterwards?",
    answer:
      "A comprehensive examination usually involves dilating drops. Vision stays blurred and light-sensitive for four to six hours afterwards, so please arrange for someone to drive you home and bring sunglasses.",
  },
  {
    question: "When is a cataract ready for surgery?",
    answer:
      "When it interferes with what you need to do — reading, driving, recognising faces — not at a particular grade or age. If it is not yet limiting you, being asked to come back in six months is the right advice.",
  },
  {
    question: "Are there early warning signs of glaucoma?",
    answer:
      "Usually none, which is precisely the danger. The common form damages peripheral vision so gradually that the brain compensates. It is found through eye-pressure measurement and optic nerve examination, which is why routine screening matters after 40.",
  },
  {
    question: "At what age should a child's eyes be checked?",
    answer:
      "By around three to four years, and sooner if you notice a squint, a head tilt, one eye drifting, or the child sitting very close to a screen. Squint and lazy eye respond much better to treatment before school age than after.",
  },
  {
    question: "My eyes burn after screen work. Is that treatable?",
    answer:
      "Yes. Screen-related dry eye is common and responds well to a combination of tear film treatment, an ergonomic review and a corrected spectacle prescription. It is worth having assessed rather than living with.",
  },
];

/* ── Trust badges shown in the hero ───────────────────────────────────────── */

export const trustBadges = [
  { label: "M.Ch. Surgeon", detail: "Paediatric surgery" },
  { label: "Eye Care", detail: "Screening & cataract" },
  { label: "Emergency", detail: "Accident & trauma" },
];
