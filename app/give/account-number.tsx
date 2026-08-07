"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

/**
 * The account number, rendered as one large tap target so the whole row copies
 * — not just a small icon beside it. Digits are shown unbroken and unspaced:
 * what is on screen is exactly what lands on the clipboard, which matters when
 * someone reads them into a teller's form instead of pasting.
 */
export function AccountNumber({ value }: { value: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, []);

  const copy = useCallback(async () => {
    let ok = false;

    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      /*
       * The async Clipboard API needs a secure origin and is still missing on
       * some older mobile browsers common here. Fall back to the legacy path
       * rather than leaving the button silently dead.
       */
      try {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.top = "0";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        document.body.removeChild(field);
      } catch {
        ok = false;
      }
    }

    setState(ok ? "copied" : "error");
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setState("idle"), 2600);
  }, [value]);

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy account number ${value.split("").join(" ")}`}
        className="group flex w-full items-center justify-between gap-4 rounded-lg border border-[color:var(--line)] px-4 py-3.5 text-left transition-colors duration-200 hover:border-[color:var(--accent)] sm:px-5"
      >
        <span className="font-serif text-[clamp(1.35rem,4.5vw,1.875rem)] tabular-nums tracking-[0.06em] text-[color:var(--brand)]">
          {value}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 group-hover:text-[color:var(--accent)]">
          {state === "copied" ? (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {/* The label stays at every width — an icon alone reads as decoration. */}
          <span>
            {state === "copied" ? "Copied" : state === "error" ? "Select to copy" : "Copy"}
          </span>
        </span>
      </button>

      {/* Announced to screen readers; the icon swap carries it visually. */}
      <p role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Account number copied to clipboard"
          : state === "error"
            ? "Could not copy automatically. Please select the number and copy it manually."
            : ""}
      </p>
    </div>
  );
}
