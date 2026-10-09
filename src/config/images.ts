/**
 * IMAGE MANIFEST
 *
 * Every image is a *static import*, which lets Next.js infer intrinsic
 * dimensions (no CLS) and generate a blur placeholder at build time.
 *
 * TO SWAP IN A REAL HOSPITAL PHOTO: overwrite the file in /public/images
 * keeping the same filename and a similar aspect ratio. Nothing else changes.
 * See /public/images/README.md for the required ratio of each slot.
 *
 * Current photos are royalty-free placeholders (Unsplash / Pexels licence).
 */

import heroHospital from "../../public/images/hero-hospital.png";
import hospitalExterior from "../../public/images/hospital-exterior.png";
import ward from "../../public/images/ward.jpg";
import patientRoom from "../../public/images/patient-room.jpg";
import consultationRoom from "../../public/images/consultation-room.jpg";
import operatingTheatre from "../../public/images/operating-theatre.jpg";
import corridor from "../../public/images/corridor.jpg";
import equipment from "../../public/images/equipment.jpg";
import childHappy from "../../public/images/child-happy.jpg";
import pediatricExam from "../../public/images/pediatric-exam.jpg";
import motherChildren from "../../public/images/mother-children.jpg";
import newborn from "../../public/images/newborn.jpg";
import eyeExam from "../../public/images/eye-exam.jpg";
import eyewear from "../../public/images/eyewear.jpg";
import eyeClinic from "../../public/images/eye-clinic.jpg";
import svcSurgery from "../../public/images/svc-surgery.jpg";
import svcTheatrePrep from "../../public/images/svc-theatre-prep.jpg";
import svcBrainScan from "../../public/images/svc-brain-scan.jpg";
import svcParentBaby from "../../public/images/svc-parent-baby.jpg";
import svcPaedClinicRoom from "../../public/images/svc-paed-clinic-room.jpg";
import svcClinicianGloves from "../../public/images/svc-clinician-gloves.jpg";
import svcNurseChild from "../../public/images/svc-nurse-child.jpg";
import svcEndoscopy from "../../public/images/svc-endoscopy.jpg";
import svcTrauma from "../../public/images/svc-trauma.jpg";
import svcAcuteAbdomen from "../../public/images/svc-acute-abdomen.jpg";
import svcGlaucoma from "../../public/images/svc-glaucoma.jpg";
import svcDiabeticEye from "../../public/images/svc-diabetic-eye.jpg";
import svcDryEye from "../../public/images/svc-dry-eye.jpg";
import svcEyeInfection from "../../public/images/svc-eye-infection.jpg";
import svcChildVision from "../../public/images/svc-child-vision.jpg";
import drRamdas from "../../public/images/doctors/dr-ramdas-nagargoje.png";
import drManisha from "../../public/images/doctors/dr-manisha-nagargoje.png";

export const img = {
  heroHospital: {
    src: heroHospital,
    alt: "Modern hospital building exterior — representative photograph",
  },
  hospitalExterior: {
    src: hospitalExterior,
    alt: "Hospital building exterior — representative photograph",
  },
  ward: {
    src: ward,
    alt: "Clean, well-lit inpatient ward with individual beds",
  },
  patientRoom: {
    src: patientRoom,
    alt: "Private patient room with an attendant seating area",
  },
  consultationRoom: {
    src: consultationRoom,
    alt: "Consultation room equipped for examination",
  },
  operatingTheatre: {
    src: operatingTheatre,
    alt: "Surgical team operating in a sterile theatre",
  },
  corridor: {
    src: corridor,
    alt: "Clinical staff walking through the hospital corridor",
  },
  equipment: {
    src: equipment,
    alt: "Diagnostic equipment used for laboratory investigation",
  },
  pediatricExam: {
    src: pediatricExam,
    alt: "A paediatric surgeon examining a young child during a consultation",
  },
  childHappy: {
    src: childHappy,
    alt: "A smiling young child after a health check-up",
  },
  motherChildren: {
    src: motherChildren,
    alt: "A mother with her two young children",
  },
  newborn: {
    src: newborn,
    alt: "A sleeping newborn baby wrapped in a soft blanket",
  },
  eyeExam: {
    src: eyeExam,
    alt: "Patient undergoing a computerised eye examination",
  },
  eyewear: {
    src: eyewear,
    alt: "A prescription spectacle frame after vision testing",
  },
  eyeClinic: {
    src: eyeClinic,
    alt: "Ophthalmologist beside a slit lamp in the eye clinic",
  },
  /* ── Service-card photographs ──────────────────────────────────────────
     Only added where the image genuinely depicts the service. Services with
     no honest stock equivalent (urodynamics, thoracoscopy, tracheal work,
     ear piercing…) stay icon-only rather than carry a misleading photo. */
  svcSurgery: {
    src: svcSurgery,
    alt: "Surgeon operating through a small incision in a sterile field",
  },
  svcTheatrePrep: {
    src: svcTheatrePrep,
    alt: "Anaesthetic monitoring and preparation in an operating theatre",
  },
  svcBrainScan: {
    src: svcBrainScan,
    alt: "Cross-sectional brain MRI displayed on a reporting monitor",
  },
  svcParentBaby: {
    src: svcParentBaby,
    alt: "A parent holding their baby after a consultation",
  },

  svcPaedClinicRoom: {
    src: svcPaedClinicRoom,
    alt: "A child in the bright consulting room of a children's clinic",
  },
  svcClinicianGloves: {
    src: svcClinicianGloves,
    alt: "Clinician in scrubs and examination gloves before a procedure",
  },
  svcNurseChild: {
    src: svcNurseChild,
    alt: "A nurse reassuring a young child during an examination",
  },
  svcEndoscopy: {
    src: svcEndoscopy,
    alt: "Surgeon working with fine instruments through a small access port",
  },
  svcTrauma: {
    src: svcTrauma,
    alt: "Surgical team concentrating during an urgent operation",
  },
  svcAcuteAbdomen: {
    src: svcAcuteAbdomen,
    alt: "Gowned surgeon prepared for an emergency abdominal procedure",
  },
  svcGlaucoma: {
    src: svcGlaucoma,
    alt: "Optometrist measuring a patient at a computerised eye machine",
  },
  svcDiabeticEye: {
    src: svcDiabeticEye,
    alt: "Patient positioned at an eye-imaging machine for a retinal check",
  },
  svcDryEye: {
    src: svcDryEye,
    alt: "Ophthalmologist holding a trial frame in the eye clinic",
  },
  svcEyeInfection: {
    src: svcEyeInfection,
    alt: "Ophthalmologist beside the slit lamp in the examination room",
  },
  svcChildVision: {
    src: svcChildVision,
    alt: "A child wearing a trial frame during a vision screening",
  },

  /* Both portraits are the client's own photographs, cropped to 4:5. */
  drRamdas: {
    src: drRamdas,
    alt: "Dr. Ramdas D. Nagargoje, Paediatric Surgeon, at Yogeshwari Hospital",
  },
  drManisha: {
    src: drManisha,
    alt: "Dr. Manisha Nagargoje (Sanap), Ophthalmologist, at Yogeshwari Hospital",
  },
} as const;

export type ImageKey = keyof typeof img;
