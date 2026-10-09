"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { FiPlus } from "react-icons/fi";
import type { Faq } from "@/config/content";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion.
 *
 * Real buttons with aria-expanded/aria-controls, so it is fully keyboard
 * operable and announced correctly.
 *
 * Every answer stays mounted in the DOM (collapsed panels use height 0 +
 * overflow hidden + visibility hidden + aria-hidden), so crawlers and no-JS
 * users see the full text and the FAQPage JSON-LD always matches visible
 * page content. Collapsed panels are hidden from assistive tech via
 * aria-hidden + visibility, so screen readers hear only the open answer.
 */
export function Accordion({
  items,
  className,
  tone = "light",
}: {
  items: Faq[];
  className?: string;
  tone?: "light" | "ink";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduced = useReducedMotion();
  const dark = tone === "ink";

  return (
    <div className={cn("divide-y", dark ? "divide-white/10" : "divide-ink-200/70", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300",
                  dark ? "text-white hover:text-rose-200" : "text-fg hover:text-brand-700",
                )}
              >
                <span className="text-[1.02rem] font-semibold tracking-tight md:text-[1.12rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ease-[var(--ease-out-expo)]",
                    isOpen && "rotate-135",
                    dark
                      ? "border-white/20 bg-white/5 group-hover:border-rose-300/60"
                      : "border-edge bg-surface-2 group-hover:border-brand-300",
                  )}
                >
                  <FiPlus
                    className={cn("size-4", dark ? "text-rose-200" : "text-brand-600")}
                  />
                </span>
              </button>
            </h3>

            <motion.div
              key="panel"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              initial={false}
              animate={
                isOpen
                  ? { height: "auto", opacity: 1, visibility: "visible" }
                  : { height: 0, opacity: 0, visibility: "hidden" }
              }
              transition={{
                /* visibility flips only after the height animation finishes
                   (framer-motion defers it), so closing stays smooth and the
                   panel is never focusable/announced while hidden. */
                height: reduced
                  ? { duration: 0 }
                  : { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.28 },
              }}
              className="overflow-hidden"
            >
              <p
                className={cn(
                  "max-w-2xl pb-7 pr-10 text-[0.97rem] leading-relaxed",
                  dark ? "text-white/65" : "text-fg-muted",
                )}
              >
                {item.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
