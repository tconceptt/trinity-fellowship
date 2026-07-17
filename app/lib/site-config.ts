/**
 * Site-wide configuration used for SEO metadata, sitemap, and robots.
 *
 * NOTE: No production domain was found anywhere in the repo (no vercel.json
 * domain config, no README mention). `NEXT_PUBLIC_SITE_URL` should be set in
 * the deployment environment; the fallback below is a placeholder and should
 * be replaced with the real production domain before/when it is registered.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinityfellowshipaddis.org",
  name: "Trinity Fellowship Addis Ababa",
  shortName: "Trinity Fellowship",
  description:
    "Trinity Fellowship is a gospel-centered church in Sarbet, Addis Ababa, Ethiopia, and part of Sovereign Grace Churches. Join us Sundays for prayer at 9:00 AM and worship at 10:00 AM.",
  instagram: "https://instagram.com/trinityfellowshipaddisababa",
  ogImage: "/images/hero-image.jpg",
};
