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
  instagram: "https://www.instagram.com/apexacademybb",
  instagramHandle: "@apexacademybb",
  twitter: "https://x.com/apexacademybb",
  twitterHandle: "@apexacademybb",
} as const;

// League age groups offered for town-team registration. Centralized so the
// list can be adjusted in one place, and later moved to an admin-editable
// setting. (Separate from the Apex travel program.)
export const AGE_GROUPS = [
  "10U", "12U", "14U", "16U", "18U",
] as const;

// Each age group runs two conferences (competitive tier) — think Varsity vs JV.
// Stored in the teams.division column.
export const CONFERENCES = [
  { value: "Premier", desc: "Competitive conference" },
  { value: "Prospect", desc: "Development conference" },
] as const;

// Team registration review lifecycle.
export type TeamStatus = "pending_review" | "needs_info" | "approved" | "rejected" | "published";

export const TEAM_STATUS_META: Record<TeamStatus, { label: string; tone: "amber" | "blue" | "green" | "red" | "orange" }> = {
  pending_review: { label: "Pending Review", tone: "amber" },
  needs_info:     { label: "Needs Info",     tone: "orange" },
  approved:       { label: "Approved",       tone: "blue" },
  rejected:       { label: "Rejected",       tone: "red" },
  published:      { label: "Published",      tone: "green" },
};
