"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";
import { formatPhone, phoneDigits } from "@/app/lib/contact-utils";
import { BackToHub } from "./members-states";

export type Member = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
};

/**
 * The directory itself: search, alphabetical groups, the letter rail, and
 * the rows. Data arrives from the page so the view stays testable and
 * previewable without a session.
 */
export function DirectoryView({
  members,
  userEmail,
  onSignOut,
}: {
  members: Member[];
  userEmail: string;
  onSignOut: () => void;
}) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // "/" jumps to search from anywhere on the page; Escape clears it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const query = search.trim();
  const queryDigits = /\d/.test(query) ? phoneDigits(query) : "";

  const filtered = useMemo(() => {
    if (!query) return members;
    const q = query.toLowerCase();
    return members.filter((m) => {
      if (m.full_name?.toLowerCase().includes(q)) return true;
      if (m.email && m.email.toLowerCase().includes(q)) return true;
      if (queryDigits && m.phone && phoneDigits(m.phone).includes(queryDigits))
        return true;
      return false;
    });
  }, [members, query, queryDigits]);

  // Grouped by the first letter of the given name — that is how members
  // know one another, and how they will look each other up.
  const grouped = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    for (const m of filtered) {
      const letter = m.full_name.trim()[0]?.toUpperCase() || "#";
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(m);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const letters = useMemo(() => grouped.map(([l]) => l), [grouped]);

  // Track which group is under the header so the rail can show where you are.
  useEffect(() => {
    if (letters.length === 0) return;
    let raf = 0;
    function measure() {
      raf = 0;
      const sections =
        listRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!sections) return;
      let current: string | null = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= 80)
          current = s.dataset.letter ?? null;
        else break;
      }
      setActiveLetter(current ?? letters[0]);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [letters]);

  const jumpTo = useCallback((letter: string) => {
    document
      .getElementById(`letter-${letter}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const showRail = !query && letters.length > 1;

  return (
    <section
      /* On phones the fixed rail sits inside the page gutter, so the right
         edge steps out to clear it while the rail is showing. */
      className={`mx-auto max-w-5xl pl-5 pt-10 pb-24 sm:px-8 sm:pt-12 ${showRail ? "pr-11" : "pr-5"}`}
    >
      <div className="flex items-center justify-between gap-4">
        <BackToHub />
        <button
          onClick={onSignOut}
          className="text-sm font-semibold text-[color:var(--muted)] transition-colors duration-200 hover:text-[color:var(--accent)]"
        >
          Sign Out
        </button>
      </div>

      <div className="lg:flex lg:items-start lg:gap-10">
        <div className="min-w-0 flex-1">
          {/* ── search ────────────────────────── */}
          <div className="mt-7">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted)]" />
              <input
                ref={searchRef}
                type="search"
                inputMode="search"
                autoComplete="off"
                enterKeyHint="search"
                aria-label="Search members by name, email, or phone"
                placeholder="Search by name, email, or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && search) {
                    e.preventDefault();
                    setSearch("");
                  }
                }}
                className="directory-search w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] py-3 pl-11 pr-12 text-[15px] text-[color:var(--foreground)] outline-none transition-colors duration-200 placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)]"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[color:var(--muted)] transition-colors duration-200 hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--foreground)]"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              ) : (
                <kbd
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 hidden h-6 min-w-6 -translate-y-1/2 items-center justify-center rounded border border-[color:var(--line)] px-1.5 font-sans text-[11px] text-[color:var(--muted)] sm:flex"
                >
                  /
                </kbd>
              )}
            </div>

            <p
              role="status"
              aria-live="polite"
              className="mt-2.5 min-h-5 text-xs tabular-nums text-[color:var(--muted)]"
            >
              {query
                ? filtered.length === 0
                  ? `No matches among ${members.length} members`
                  : `${filtered.length} of ${members.length} members`
                : `${members.length} members, A to Z by first name`}
            </p>
          </div>

          {/* ── directory ─────────────────────── */}
          {filtered.length === 0 ? (
            <EmptySearch
              query={query}
              onClear={() => {
                setSearch("");
                searchRef.current?.focus();
              }}
            />
          ) : (
            <div ref={listRef} className="mt-6 space-y-10">
              {grouped.map(([letter, groupMembers]) => (
                <section
                  key={letter}
                  id={`letter-${letter}`}
                  data-letter={letter}
                  aria-label={`Names beginning with ${letter}`}
                  className="scroll-mt-20"
                >
                  {/* Sticky group header; opaque so rows do not show
                        through as they scroll under it. */}
                  <div
                    /* Clears the fixed site header (~61px on phones). */
                    className="sticky top-16 z-10 flex items-baseline gap-4 bg-[color:var(--background)] py-2"
                  >
                    <span className="font-serif text-2xl leading-none text-[color:var(--accent)]">
                      {letter}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1 bg-[color:var(--line)]"
                    />
                    <span className="text-xs tabular-nums text-[color:var(--muted)]">
                      {groupMembers.length}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                    {groupMembers.map((member) => (
                      <MemberRow
                        key={member.id}
                        member={member}
                        query={query}
                        isYou={
                          !!member.email &&
                          member.email.toLowerCase() === userEmail.toLowerCase()
                        }
                        expanded={expandedId === member.id}
                        onToggle={() =>
                          setExpandedId((cur) =>
                            cur === member.id ? null : member.id,
                          )
                        }
                      />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* ── letter rail ───────────────────── */}
        {showRail && (
          <LetterRail letters={letters} active={activeLetter} onJump={jumpTo} />
        )}
      </div>
    </section>
  );
}

/* ── row ─────────────────────────────────────── */

function MemberRow({
  member,
  query,
  isYou,
  expanded,
  onToggle,
}: {
  member: Member;
  query: string;
  isYou: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [bg, fg] = getAccent(member.full_name);
  const phone = member.phone ? formatPhone(member.phone) : null;
  const panelId = `member-${member.id}-details`;

  return (
    <li className="min-w-0 border-b border-[color:var(--line)]">
      <div className="flex items-center gap-3.5 py-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="group flex min-w-0 flex-1 items-center gap-3.5 rounded-md text-left"
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm ${bg} ${fg}`}
          >
            {getInitials(member.full_name)}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[15px] font-semibold text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[color:var(--accent)]">
                <Highlight text={member.full_name} query={query} />
              </span>
              {isYou && (
                <span className="shrink-0 rounded-full bg-[color:var(--surface-strong)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent)]">
                  You
                </span>
              )}
            </span>
            <span className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-[color:var(--muted)]">
              {phone ? (
                <span className="shrink-0 tabular-nums">
                  <Highlight text={phone} query={query} digits />
                </span>
              ) : (
                <span className="shrink-0 italic">No phone listed</span>
              )}
              {member.email && (
                <>
                  <span aria-hidden className="hidden sm:inline">
                    ·
                  </span>
                  <span className="hidden truncate sm:inline">
                    <Highlight text={member.email} query={query} />
                  </span>
                </>
              )}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
          <ContactAction
            href={member.phone ? `tel:${member.phone}` : null}
            label={
              member.phone
                ? `Call ${member.full_name}`
                : "No phone number listed"
            }
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
          </ContactAction>
          <ContactAction
            href={member.email ? `mailto:${member.email}` : null}
            label={
              member.email
                ? `Email ${member.full_name}`
                : "No email address listed"
            }
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </ContactAction>
        </div>
      </div>

      {/* Expanding grid track: 0fr→1fr animates height without measuring. */}
      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <dl className="mb-3.5 ml-[54px] rounded-lg bg-[color:var(--surface)] px-4 py-1 text-sm">
            <DetailLine
              label="Phone"
              value={phone}
              raw={member.phone}
              missing="Not listed"
            />
            <DetailLine
              label="Email"
              value={member.email}
              raw={member.email}
              missing="Not listed"
            />
          </dl>
        </div>
      </div>
    </li>
  );
}

function ContactAction({
  href,
  label,
  children,
}: {
  href: string | null;
  label: string;
  children: ReactNode;
}) {
  const base =
    "flex h-10 w-10 items-center justify-center rounded-md transition-colors duration-200";
  if (!href) {
    return (
      <span
        aria-label={label}
        title={label}
        className={`${base} text-[color:var(--line)]`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={`${base} text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--accent)]`}
    >
      {children}
    </a>
  );
}

function DetailLine({
  label,
  value,
  raw,
  missing,
}: {
  label: string;
  value: string | null;
  raw: string | null;
  missing: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    if (!raw) return;
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the
      // value is still selectable on screen.
    }
  }

  return (
    <div className="flex items-center gap-3 border-b border-[color:var(--line)] py-2.5 last:border-b-0">
      <dt className="w-12 shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 truncate tabular-nums text-[color:var(--foreground)]">
        {value ?? (
          <span className="italic text-[color:var(--muted)]">{missing}</span>
        )}
      </dd>
      {raw && (
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${
            copied
              ? "text-[color:var(--accent)]"
              : "text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--accent)]"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

/* ── letter rail ─────────────────────────────── */

function LetterRail({
  letters,
  active,
  onJump,
}: {
  letters: string[];
  active: string | null;
  onJump: (letter: string) => void;
}) {
  const railRef = useRef<HTMLElement>(null);

  // Drag a finger along the rail to scrub through the alphabet.
  function scrub(e: React.PointerEvent) {
    if (e.pointerType === "mouse") return;
    const el = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement | null;
    const letter =
      el?.closest<HTMLElement>("[data-rail-letter]")?.dataset.railLetter;
    if (letter && letter !== active) {
      document
        .getElementById(`letter-${letter}`)
        ?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <nav
      ref={railRef}
      aria-label="Jump to letter"
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse")
          railRef.current?.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons > 0) scrub(e);
      }}
      className={`fixed right-1 top-1/2 z-20 flex -translate-y-1/2 touch-none flex-col items-center rounded-full bg-[color:var(--background)]/85 py-1.5 backdrop-blur-sm lg:sticky lg:right-auto lg:top-24 lg:mt-7 lg:translate-y-0 lg:bg-transparent lg:py-0 lg:backdrop-blur-none`}
    >
      {letters.map((letter) => {
        const isActive = letter === active;
        return (
          <button
            key={letter}
            type="button"
            data-rail-letter={letter}
            onClick={() => onJump(letter)}
            aria-current={isActive ? "location" : undefined}
            className={`flex h-[18px] w-6 items-center justify-center rounded-full font-serif text-[11px] leading-none transition-colors duration-200 lg:h-7 lg:w-7 lg:text-sm ${
              isActive
                ? "bg-[color:var(--accent)] text-[color:var(--cream)]"
                : "text-[color:var(--muted)] hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--accent)]"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
}

/* ── states ──────────────────────────────────── */

function EmptySearch({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-10 max-w-[48ch] border-t border-[color:var(--line)] pt-8">
      <p className="font-serif text-xl text-[color:var(--brand)]">
        No one matches &ldquo;{query}&rdquo;.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
        Try a shorter spelling or just a first name. Phone numbers work too,
        with or without the +251.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 text-sm font-semibold text-[color:var(--brand)] transition-colors duration-200 hover:text-[color:var(--accent)]"
      >
        Clear search
      </button>
    </div>
  );
}

/**
 * Shapes the rows that are about to arrive, so the page does not jump
 * when they do. Pulses only where motion is allowed.
 */
export function DirectorySkeleton() {
  return (
    <div aria-hidden className="motion-safe:animate-pulse">
      <div className="mt-7 h-12 rounded-lg bg-[color:var(--surface-strong)]" />
      <div className="mt-3 h-3 w-40 rounded bg-[color:var(--surface-strong)]" />
      <div className="mt-8 flex items-baseline gap-4 py-2">
        <div className="h-6 w-5 rounded bg-[color:var(--surface-strong)]" />
        <span className="h-px flex-1 bg-[color:var(--line)]" />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-3.5 border-b border-[color:var(--line)] py-3"
          >
            <span className="h-10 w-10 shrink-0 rounded-full bg-[color:var(--surface-strong)]" />
            <span className="flex-1">
              <span className="block h-3.5 w-2/5 rounded bg-[color:var(--surface-strong)]" />
              <span className="mt-2 block h-2.5 w-3/5 rounded bg-[color:var(--surface-strong)]" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── text highlight ──────────────────────────── */

function Highlight({
  text,
  query,
  digits = false,
}: {
  text: string;
  query: string;
  digits?: boolean;
}) {
  if (!query) return <>{text}</>;

  if (digits) {
    // Match on digits, then map the run back onto the formatted string.
    const q = phoneDigits(query);
    if (!q) return <>{text}</>;
    const raw = phoneDigits(text);
    const start = raw.indexOf(q);
    if (start < 0) return <>{text}</>;
    const end = start + q.length;
    // Walk the formatted string counting digits to find the span.
    let seen = 0;
    let from = -1;
    let to = -1;
    for (let i = 0; i < text.length; i++) {
      if (!/\d/.test(text[i])) continue;
      if (seen === start) from = i;
      if (seen === end - 1) {
        to = i + 1;
        break;
      }
      seen++;
    }
    if (from < 0 || to < 0) return <>{text}</>;
    return (
      <>
        {text.slice(0, from)}
        <mark>{text.slice(from, to)}</mark>
        {text.slice(to)}
      </>
    );
  }

  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ── icons ───────────────────────────────────── */

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      {...iconProps}
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      {...iconProps}
      strokeWidth={2}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} {...iconProps}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
