"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const links: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "Our Story", href: "/#about" },
      { label: "Our Pastors", href: "/pastors" },
    ],
  },
  { label: "Schedule", href: "/#schedule" },
  { label: "Children", href: "/#children" },
  { label: "Beliefs", href: "/#beliefs" },
  { label: "Visit", href: "/#visit" },
  { label: "Members", href: "/members" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <div className="flex w-5 flex-col gap-[5px]">
          <motion.span
            className="block h-[1.5px] w-full bg-[color:var(--brand)] transition-colors duration-300"
            animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-[1.5px] w-full bg-[color:var(--brand)] transition-colors duration-300"
            animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[1.5px] w-full bg-[color:var(--brand)] transition-colors duration-300"
            animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedItem(
                              expandedItem === link.label ? null : link.label
                            )
                          }
                          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-semibold text-[color:var(--brand)] transition-colors hover:bg-[color:var(--surface-strong)]"
                        >
                          {link.label}
                          <motion.svg
                            className="h-4 w-4 text-[color:var(--brand-soft)]"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{
                              rotate:
                                expandedItem === link.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <path d="M3 4.5l3 3 3-3" />
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {expandedItem === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 border-l border-[color:var(--line)] py-1 pl-4">
                                {link.children.map((child) => (
                                  <a
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--brand)]"
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-4 py-3 text-lg font-semibold text-[color:var(--brand)] transition-colors hover:bg-[color:var(--surface-strong)]"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
