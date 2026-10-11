# Image slots

The two **doctor portraits are the client's own photographs** — do not replace them.

Everything else here is a **royalty-free placeholder** (Unsplash / Pexels licence — free
for commercial use, no attribution required). The Google Business Profile could not be
read programmatically, so none of the scene photos show the actual hospital.

> Note on portrait crops: the doctor photos are head-to-torso at 4:5. The small circular
> avatars in the header chips and department cards use `object-top` — without it a
> centred square crop frames the coat instead of the face.

## How to swap in a real photo

1. Crop the real photo to roughly the ratio in the table below.
2. Save it as JPEG, quality ~80, at the listed width.
3. Overwrite the file **keeping the exact same filename**.

That's it. `src/config/images.ts` imports these statically, so Next.js re-derives the
dimensions and the blur placeholder at the next build. No code changes needed.

If you change the alt text (you should, once these are real photos), edit
`src/config/images.ts` — every alt string lives there.

## Slots

| File | Ratio | Width | Where it appears | Priority to replace |
| --- | --- | --- | --- | --- |
| `hero-hospital.jpg` | 3:2 | 1920 | Homepage hero — the LCP image. Also serves the `hospital-exterior` slot (about, contact, location section), which was a byte-identical duplicate file — overwrite this one file to replace both | **Highest** |
| `doctors/dr-ramdas-nagargoje.png` | 4:5 | 480 | Doctor cards, doctors page, paediatric surgery page | ✅ real photo |
| `doctors/dr-manisha-nagargoje.png` | 4:5 | 546 | Doctor cards, doctors page, eye care page | ✅ real photo |
| `consultation-room.jpg` | 3:2 | 1400 | Departments, about | High |
| `ward.jpg` | 3:2 | 1400 | About — facility strip | Medium |
| `patient-room.jpg` | 3:2 | 1400 | About — facility strip | Medium |
| `corridor.jpg` | 3:2 | 1400 | About — parallax band | Medium |
| `operating-theatre.jpg` | 3:2 | 1400 | Services — surgical consultations | Medium |
| `equipment.jpg` | 3:2 | 1400 | Services — diagnostics | Medium |
| `eye-exam.jpg` | 3:2 | 1400 | Eye care department hero, service card | High |
| `svc-surgery.jpg` | 16:10 | 1200 | Service card — laparoscopic surgery | Medium |
| `svc-theatre-prep.jpg` | 16:10 | 1200 | Service card — pre-operative evaluation | Medium |
| `svc-brain-scan.jpg` | 16:10 | 1200 | Service card — brain & spine surgery | Medium |
| `svc-parent-baby.jpg` | 16:10 | 1200 | Service card — prenatal consultation | Medium |
| `svc-paed-clinic-room.jpg` | 16:10 | 1200 | Service card — paediatric urology | Low |
| `svc-clinician-gloves.jpg` | 16:10 | 1200 | Service card — urodynamics | Low |
| `svc-nurse-child.jpg` | 16:10 | 1200 | Service card — constipation clinic | Low |
| `svc-endoscopy.jpg` | 16:10 | 1200 | Service card — endoscopy & thoracoscopy | Low |
| `svc-trauma.jpg` | 16:10 | 1200 | Service card — accident & trauma | Low |
| `svc-acute-abdomen.jpg` | 16:10 | 1200 | Service card — acute abdomen | Low |
| `svc-glaucoma.jpg` | 16:10 | 1200 | Service card — glaucoma screening | Low |
| `svc-diabetic-eye.jpg` | 16:10 | 1200 | Service card — diabetic eye examination | Low |
| `svc-dry-eye.jpg` | 16:10 | 1200 | Service card — dry eye treatment | Low |
| `svc-eye-infection.jpg` | 16:10 | 1200 | Service card — eye infection treatment | Low |
| `svc-child-vision.jpg` | 16:10 | 1200 | Service card — paediatric vision screening | Low |
| `eye-clinic.jpg` | 4:5 | 1400 | Eye care department — portrait band | Medium |
| `eyewear.jpg` | 3:2 | 1400 | Eye care — vision testing card | Low |
| `child-happy.jpg` | 4:5 | 1400 | Paediatrics department hero | High |
| `mother-children.jpg` | 3:2 | 1400 | Paediatrics — consultation card | Medium |
| `newborn.jpg` | 3:2 | 1400 | Paediatrics — newborn care card | Medium |

## Also worth adding

- `og-image.jpg` (1200×630) — the social share card. Currently generated at runtime by
  `src/app/opengraph-image.tsx`; a real photo of the hospital front would be stronger.
- A real logo. The current mark is an inline SVG monogram in
  `src/components/brand/Logo.tsx` — vector, so it scales cleanly, but a real logo file
  should replace it if one exists.
