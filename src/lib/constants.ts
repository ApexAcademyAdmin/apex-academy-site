export type NavLink = {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { title: "About", href: "/about" },
  {
    title: "Teams",
    href: "/teams",
    children: [
      { title: "10U - Youth", href: "/teams/10u" },
      { title: "12U - Youth", href: "/teams/12u" },
      { title: "14U - Youth", href: "/teams/14u" },
      { title: "Prospects", href: "/teams/prospects" },
      { title: "Premier", href: "/teams/premier" },
    ],
  },
  {
    title: "League",
    href: "/league",
    children: [
      { title: "League Home", href: "/league" },
      { title: "Standings", href: "/league/standings" },
      { title: "Schedule", href: "/league/schedule" },
      { title: "Results", href: "/league/results" },
      { title: "League Rules", href: "/league/rules" },
      { title: "Field Locations", href: "/league/fields" },
      { title: "Submit Result", href: "/league/submit-result" },
      { title: "Prospect Games", href: "/league/showcase" },
      { title: "Awards & Banquet", href: "/league/banquet" },
      { title: "Register Team", href: "/league/register" },
    ],
  },
  {
    title: "Events",
    href: "/events",
    children: [
      { title: "Rising Prospects Combine", href: "/events/rising-prospects" },
    ],
  },
  { title: "Partners", href: "/partners" },
  { title: "Shop", href: "/shop" },
];

export const CONTACT = {
  email: "apexsportsgg@gmail.com",
  location: "Boston, Massachusetts",
  instagram: "https://www.instagram.com/apexacademyofficial",
  instagramHandle: "@ApexAcademy",
} as const;
