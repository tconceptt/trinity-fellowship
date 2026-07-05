export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const navLinks: NavItem[] = [
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
];
