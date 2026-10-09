"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheck,
  FiClock,
  FiExternalLink,
  FiInfo,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { departments, type Department } from "@/config/content";
import { doctors, links, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  type BookingField,
  dateBounds,
  NOTES_MAX,
  sundayNotice as sundayNoticeFor,
  validateBooking,
} from "@/lib/bookingValidation";

/**
 * The appointment request form.
 *
 * Shared by the /appointment page and the booking dialog so the two can never
 * drift apart.
 *
 * ── How a submission is actually delivered ──────────────────────────────────
 * There is no backend and no database — this is a static site. Submitting
 * composes the answers into a structured WhatsApp message and hands off to
 * WhatsApp, which is where this practice already takes bookings. Nothing is
 * stored or transmitted anywhere else, which also keeps patient details out of
 * any third-party form service (they are health enquiries).
 *
 * ── Validation ──────────────────────────────────────────────────────────────
 * Every field is validated, and validation is derived from the current values
 * rather than stored in state, so an error can never go stale. Errors surface
 * once a field has been blurred, or on submit for anything untouched; failing
 * a submit focuses the first offending field. Each input carries `aria-invalid`
 * and points at its message via `aria-describedby`, and the messages are
 * `role="alert"`, so a screen reader hears the problem rather than just being
 * told the form did nothing.
 */

type Slot = "morning" | "evening" | "either";
const SLOTS: { id: Slot; label: string; detail: string }[] = [
  { id: "morning", label: "Morning", detail: "9:00 AM – 2:00 PM" },
  { id: "evening", label: "Evening", detail: "5:00 PM – 8:00 PM" },
  { id: "either", label: "Either", detail: "Whichever is sooner" },
];

const calendlyKey = (slug: Department["slug"]) =>
  slug === "eye-care" ? ("eyeCare" as const) : ("pediatricSurgery" as const);

export function BookingForm({
  initialDepartment = null,
  compact = false,
  syncHash = false,
  onDone,
}: {
  initialDepartment?: Department["slug"] | null;
  /** Tighter spacing for the dialog. */
  compact?: boolean;
  /** Preselect from /appointment#<department>. Page use only. */
  syncHash?: boolean;
  onDone?: () => void;
}) {
  const [slug, setSlug] = useState<Department["slug"] | null>(initialDepartment);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<Slot>("either");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState<Partial<Record<BookingField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  /* Deep links like /appointment#eye-care preselect the department. The
     fragment is not available during SSR, so it has to be read on mount. */
  useEffect(() => {
    if (!syncHash) return;
    const h = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (h === "pediatric-surgery" || h === "eye-care") setSlug(h);
  }, [syncHash]);

  const dept = departments.find((d) => d.slug === slug) ?? null;
  const doctor = dept ? doctors.find((d) => d.department === dept.slug)! : null;
  const calendlyUrl = dept ? siteConfig.calendly[calendlyKey(dept.slug)] : "";
  const bounds = useMemo(() => dateBounds(), []);

  /** Errors are derived by the shared rules — never stored, never stale. */
  const errors = useMemo(
    () => validateBooking({ department: slug, name, phone, age, date, notes }),
    [slug, name, phone, age, date, notes],
  );

  const isValid = Object.keys(errors).length === 0;

  /** Sunday is emergency-only — a caution, not a blocker. */
  const sundayNotice = sundayNoticeFor(date);

  const show = (f: BookingField) => Boolean((touched[f] || submitted) && errors[f]);
  const blur = (f: BookingField) => () => setTouched((t) => ({ ...t, [f]: true }));

  const message = useMemo(() => {
    if (!dept || !doctor) return "";
    const chosen = SLOTS.find((s) => s.id === slot)!;
    return [
      `Appointment request — ${siteConfig.name}`,
      ``,
      `Department: ${dept.name}`,
      `Doctor: ${doctor.name}`,
      `Patient name: ${name.trim()}`,
      `Patient age: ${age.trim()}`,
      `Contact number: ${phone.trim()}`,
      date ? `Preferred date: ${date}` : `Preferred date: earliest available`,
      `Preferred time: ${chosen.label}${
        chosen.id === "either" ? "" : ` (${chosen.detail})`
      }`,
      notes.trim() ? `` : null,
      notes.trim() ? `Reason for visit: ${notes.trim()}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }, [dept, doctor, name, age, phone, date, slot, notes]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) {
      // Send focus to the first thing that needs fixing.
      const order: BookingField[] = ["department", "name", "phone", "age", "date", "notes"];
      const first = order.find((f) => errors[f]);
      const target =
        first === "department"
          ? document.getElementById("bk-department")
          : document.getElementById(`bk-${first}`);
      target?.focus();
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    window.open(links.whatsapp(message), "_blank", "noopener,noreferrer");
    setSent(true);
    onDone?.();
  }

  const gap = compact ? "space-y-5" : "space-y-7";
  const fieldBase =
    "w-full rounded-xl border bg-surface-2 px-4 py-3 text-[0.95rem] text-fg shadow-[var(--shadow-soft)] outline-none transition-colors placeholder:text-fg-subtle";
  const fieldCls = (f: BookingField) =>
    cn(
      fieldBase,
      show(f)
        ? "border-rose-500 focus:border-rose-600"
        : "border-edge focus:border-brand-400",
    );
  const label =
    "mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-fg-subtle";

  /**
   * One error renderer, so every field reports the same way.
   *
   * A plain function rather than a component: defining a component inside
   * render gives it a new identity every pass, which remounts its subtree.
   */
  const errorFor = (f: BookingField) =>
    show(f) ? (
      <p
        id={`bk-${f}-error`}
        role="alert"
        className="mt-2 flex items-start gap-1.5 text-[0.8rem] text-rose-600"
      >
        <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" />
        {errors[f]}
      </p>
    ) : null;

  const a11y = (f: BookingField) => ({
    "aria-invalid": show(f) || undefined,
    "aria-describedby": show(f) ? `bk-${f}-error` : undefined,
    onBlur: blur(f),
  });

  if (sent) {
    return (
      <div className="rounded-[var(--radius-xl2)] border border-edge bg-surface-2 p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#25D366] text-2xl text-white">
          <FiCheck aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-h3 font-bold tracking-tight text-fg">
          WhatsApp is open — press send
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">
          Your request has been written out for you in WhatsApp. It is not booked
          until you send it and reception confirms. If WhatsApp did not open, call
          the hospital instead.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={links.tel} variant="secondary" icon={<FiPhone />} magnetic={false}>
            {siteConfig.contact.phoneDisplay}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-full px-5 py-3 text-[0.9rem] font-semibold text-fg-muted transition-colors hover:text-fg"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={gap} noValidate>
      {/* ── Department ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className={label}>1 · Which department?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {departments.map((d, i) => {
            const doc = doctors.find((x) => x.department === d.slug)!;
            const active = slug === d.slug;
            const rose = d.accent === "rose";
            const Icon = d.icon;
            return (
              <button
                /* The first card carries the id so focus can land here. */
                id={i === 0 ? "bk-department" : undefined}
                key={d.slug}
                type="button"
                onClick={() => {
                  setSlug(d.slug);
                  setTouched((t) => ({ ...t, department: true }));
                }}
                aria-pressed={active}
                {...(show("department")
                  ? { "aria-invalid": true, "aria-describedby": "bk-department-error" }
                  : {})}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border-2 bg-surface-2 p-3 text-left transition-all duration-300",
                  active
                    ? rose
                      ? "border-rose-500 shadow-[var(--shadow-soft)]"
                      : "border-brand-600 shadow-[var(--shadow-soft)]"
                    : show("department")
                      ? "border-rose-300 hover:border-rose-400"
                      : "border-edge hover:border-edge-strong",
                )}
              >
                <Image
                  src={doc.image}
                  alt={`Portrait of ${doc.name}`}
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-xl object-cover object-top"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[0.88rem] font-bold tracking-tight text-fg">
                    <Icon
                      aria-hidden="true"
                      className={rose ? "text-rose-500" : "text-brand-600"}
                    />
                    {d.shortName}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.76rem] text-fg-subtle">
                    {doc.name}
                  </span>
                </span>
                {active && (
                  <FiCheck
                    aria-hidden="true"
                    className={cn("shrink-0", rose ? "text-rose-500" : "text-brand-600")}
                  />
                )}
              </button>
            );
          })}
        </div>
        {errorFor("department")}
      </fieldset>

      {/* ── Patient ────────────────────────────────────────────────── */}
      <fieldset>
        <legend className={label}>2 · Patient details</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="bk-name" className="sr-only">
              Patient&rsquo;s full name
            </label>
            <input
              id="bk-name"
              name="name"
              autoComplete="name"
              maxLength={90}
              placeholder="Patient's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldCls("name")}
              {...a11y("name")}
            />
            {errorFor("name")}
          </div>

          <div>
            <label htmlFor="bk-phone" className="sr-only">
              Contact number
            </label>
            <input
              id="bk-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={18}
              placeholder="Contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldCls("phone")}
              {...a11y("phone")}
            />
            {errorFor("phone")}
          </div>

          <div>
            <label htmlFor="bk-age" className="sr-only">
              Patient age
            </label>
            <input
              id="bk-age"
              name="age"
              inputMode="text"
              maxLength={12}
              placeholder="Age — e.g. 4, or 6 months"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={fieldCls("age")}
              {...a11y("age")}
            />
            {errorFor("age")}
          </div>
        </div>
      </fieldset>

      {/* ── When ───────────────────────────────────────────────────── */}
      {calendlyUrl ? (
        <div className="rounded-2xl border border-edge bg-surface-3 p-5">
          <p className="text-[0.9rem] font-semibold text-fg">Pick an exact slot</p>
          <p className="mt-1.5 text-[0.85rem] text-fg-muted">
            {dept?.name} has live online scheduling — choose a time that suits you.
          </p>
          <div className="mt-4">
            <ButtonLink
              href={calendlyUrl}
              variant={dept?.accent === "rose" ? "rose" : "primary"}
              icon={<FiExternalLink />}
              magnetic={false}
            >
              Choose a time slot
            </ButtonLink>
          </div>
        </div>
      ) : (
        <fieldset>
          <legend className={label}>
            3 · When suits you?{" "}
            <span className="font-normal normal-case tracking-normal text-fg-subtle">
              (leave the date blank for the earliest available)
            </span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-date" className="sr-only">
                Preferred date
              </label>
              <div className="relative">
                <FiCalendar
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle"
                />
                <input
                  id="bk-date"
                  name="date"
                  type="date"
                  min={bounds.min}
                  max={bounds.max}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={cn(fieldCls("date"), "pl-11")}
                  {...a11y("date")}
                />
              </div>
              {errorFor("date")}
            </div>

            <div
              role="radiogroup"
              aria-label="Preferred session"
              className="flex gap-2"
            >
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={slot === s.id}
                  onClick={() => setSlot(s.id)}
                  title={s.detail}
                  className={cn(
                    "flex-1 rounded-xl border-2 px-2 py-2.5 text-[0.82rem] font-semibold transition-colors",
                    slot === s.id
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-edge bg-surface-2 text-fg-muted hover:border-edge-strong",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {sundayNotice && (
            <p className="mt-2.5 flex items-start gap-1.5 rounded-xl bg-brand-50 px-3 py-2 text-[0.8rem] leading-relaxed text-brand-800">
              <FiInfo aria-hidden="true" className="mt-0.5 shrink-0" />
              {sundayNotice}
            </p>
          )}

          <p className="mt-2.5 flex items-center gap-1.5 text-[0.78rem] text-fg-subtle">
            <FiClock aria-hidden="true" className="shrink-0" />
            OPD: Mon–Sat 9:00 AM – 2:00 PM and 5:00 PM – 8:00 PM. Sunday emergencies only.
          </p>
        </fieldset>
      )}

      {/* ── Reason ─────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="bk-notes" className={label}>
          {calendlyUrl ? "3" : "4"} · Reason for the visit{" "}
          <span className="font-normal normal-case tracking-normal text-fg-subtle">
            (optional)
          </span>
        </label>
        <textarea
          id="bk-notes"
          name="notes"
          rows={compact ? 2 : 3}
          maxLength={NOTES_MAX + 40}
          placeholder="Briefly — symptoms, how long, any previous treatment or reports."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={cn(fieldCls("notes"), "resize-none")}
          {...a11y("notes")}
        />
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {errorFor("notes")}
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 text-[0.74rem] tabular-nums",
              notes.length > NOTES_MAX ? "font-semibold text-rose-600" : "text-fg-subtle",
            )}
          >
            {notes.length}/{NOTES_MAX}
          </span>
        </div>
      </div>

      {/* ── Submit ─────────────────────────────────────────────────── */}
      {submitted && !isValid && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-rose-50 px-4 py-3 text-[0.85rem] text-rose-700"
        >
          <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" />
          Please correct the highlighted{" "}
          {Object.keys(errors).length === 1 ? "field" : "fields"} and send again.
        </p>
      )}

      <div className="flex flex-col gap-3 border-t border-edge pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-[0.95rem] font-semibold text-white shadow-[0_18px_50px_-16px_rgb(37_211_102/0.55)] transition-all duration-300 hover:bg-[#1EBE5A]"
        >
          <FaWhatsapp aria-hidden="true" className="text-[1.15em]" />
          Send request on WhatsApp
        </button>
        <a
          href={links.tel}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-edge bg-surface-2 px-5 text-[0.9rem] font-semibold text-fg transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <FiPhone aria-hidden="true" />
          Call instead
        </a>
      </div>

      <p className="text-[0.76rem] leading-relaxed text-fg-subtle">
        Your details are sent only as a WhatsApp message to the hospital — nothing is
        stored on this website. An appointment is confirmed by reception, not by
        submitting this form. For an emergency, please call.
      </p>
    </form>
  );
}
