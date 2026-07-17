"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * The site used to be a single long page with hash-link sections
 * (#about, #schedule, #children, #beliefs, #college, #visit). Those
 * sections now live on their own routes. Hash fragments never reach the
 * server, so any inbound links/bookmarks using the old hashes are handled
 * client-side here by redirecting to the new route.
 */
const HASH_ROUTES: Record<string, string> = {
  "#about": "/about",
  "#schedule": "/visit",
  "#children": "/children",
  "#beliefs": "/beliefs",
  "#college": "/college",
  "#visit": "/visit",
};

export function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const target = hash && HASH_ROUTES[hash];
    if (target) {
      router.replace(target);
    }
  }, [router]);

  return null;
}
