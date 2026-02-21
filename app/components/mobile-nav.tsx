"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { navLinks } from "@/app/lib/nav-links";
import { useAuth } from "@/app/lib/auth-context";
import { getInitials, getAccent } from "@/app/lib/avatar-utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading, signOut, memberName, memberFirstName } = useAuth();

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  const displayName = memberName || user?.user_metadata?.full_name || user?.email || "";
  const initials = displayName ? getInitials(displayName) : "?";
  const accent = displayName ? getAccent(displayName) : ["bg-[#1f3b53]/10", "text-[#1f3b53]"] as const;

  // Total animated items count: nav links + divider + auth items
  const authItemBaseIndex = navLinks.length;

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
                {navLinks.map((link, i) => (
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

                {/* Auth section divider */}
                {!loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: authItemBaseIndex * 0.06, duration: 0.3 }}
                    className="mx-4 my-2 border-t border-[color:var(--line)]"
                  />
                )}

                {/* Auth section */}
                {!loading && !user && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (authItemBaseIndex + 1) * 0.06, duration: 0.3 }}
                  >
                    <a
                      href="/members/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-semibold text-[color:var(--brand)] transition-colors hover:bg-[color:var(--surface-strong)]"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                      </svg>
                      Sign In
                    </a>
                  </motion.div>
                )}

                {!loading && user && (
                  <>
                    {/* User info */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (authItemBaseIndex + 1) * 0.06, duration: 0.3 }}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-xs font-bold ${accent[0]} ${accent[1]}`}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        {memberName && (
                          <p className="truncate text-sm font-semibold text-[color:var(--foreground)]">
                            {memberName}
                          </p>
                        )}
                        <p className="truncate text-xs text-[color:var(--muted)]">
                          {user.email}
                        </p>
                      </div>
                    </motion.div>

                    {/* Members Area */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (authItemBaseIndex + 2) * 0.06, duration: 0.3 }}
                    >
                      <a
                        href="/members/hub"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-semibold text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--brand)]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                        Members Area
                      </a>
                    </motion.div>

                    {/* Members Directory */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (authItemBaseIndex + 3) * 0.06, duration: 0.3 }}
                    >
                      <a
                        href="/members"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-semibold text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--brand)]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Members Directory
                      </a>
                    </motion.div>

                    {/* Prayer Requests */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (authItemBaseIndex + 4) * 0.06, duration: 0.3 }}
                    >
                      <a
                        href="/members/prayer-requests"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-semibold text-[color:var(--muted)] transition-colors hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--brand)]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Prayer Requests
                      </a>
                    </motion.div>

                    {/* Sign Out */}
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (authItemBaseIndex + 5) * 0.06, duration: 0.3 }}
                    >
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-semibold text-[color:var(--muted)] transition-colors hover:bg-red-500/6 hover:text-red-600"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
