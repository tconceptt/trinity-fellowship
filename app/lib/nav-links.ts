export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Additional path prefixes that should mark this top-level item active. */
  match?: string[];
};

export const navLinks: NavItem[] = [
  {
    label: "About",
    href: "/about",
    match: ["/about", "/pastors", "/beliefs", "/membership"],
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Our Pastors", href: "/pastors" },
      { label: "Beliefs", href: "/beliefs" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    label: "Ministries",
    href: "/children",
    match: ["/children", "/college"],
    children: [
      { label: "Children", href: "/children" },
      { label: "Pastors College", href: "/college" },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    match: ["/visit"],
    children: [
      { label: "Plan Your Visit", href: "/visit" },
      { label: "What to Expect", href: "/visit/what-to-expect" },
    ],
  },
];
