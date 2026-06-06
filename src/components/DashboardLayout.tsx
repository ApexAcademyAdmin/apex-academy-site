"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { setPreviewRole, type DashboardRole } from "@/lib/dashboard";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

type Props = {
  children: ReactNode;
  user: { email: string; display_name?: string };
  role: string;
  realRole?: string;
  teamStatus?: string;
};

const roleBadgeColors: Record<string, string> = {
  admin: "bg-green-500/20 text-green-400 border-green-500/30",
  coach: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  player: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  applicant: "bg-white/10 text-white/50 border-white/10",
};

/* ---- icons (inline SVG, no deps) ---- */
const icons = {
  dashboard: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  ),
  settings: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  team: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  roster: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  rules: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  profile: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  admin: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  signout: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  site: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </svg>
  ),
  menu: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

function getNavItems(role: string): NavItem[] {
  const items: NavItem[] = [
    { label: "Dashboard", href: "/account", icon: icons.dashboard },
  ];

  if (role === "coach") {
    items.push(
      { label: "My Team", href: "/account/team", icon: icons.team },
      { label: "Roster", href: "/account/roster", icon: icons.roster },
      { label: "League Rules", href: "/league/rules", icon: icons.rules },
    );
  }

  if (role === "player") {
    items.push(
      { label: "My Profile", href: "/account/profile", icon: icons.profile },
      { label: "My Team", href: "/account/team-view", icon: icons.team },
    );
  }

  if (role === "admin") {
    items.push(
      { label: "Team Management", href: "/admin/teams", icon: icons.team },
      { label: "League Admin", href: "/admin", icon: icons.admin },
    );
  }

  items.push({ label: "Settings", href: "/account/settings", icon: icons.settings });

  return items;
}

export function DashboardLayout({ children, user, role, realRole, teamStatus }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navItems = getNavItems(role);
  const badgeColor = roleBadgeColors[role] || roleBadgeColors.applicant;

  const isAdmin = realRole === "admin";
  const previewing = isAdmin && role !== "admin";

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function changePreview(value: string) {
    setPreviewRole(value === "admin" ? null : (value as DashboardRole));
    // Reload onto the dashboard home so every page re-reads the new role.
    window.location.href = "/account";
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <a href="/" className="text-white font-bold text-sm uppercase tracking-[0.15em] no-underline">
          Apex Academy
        </a>
      </div>

      {/* User info */}
      <div className="px-5 pb-5 border-b border-white/[0.04]">
        <div className="text-[13px] text-white/80 font-medium truncate">
          {user.display_name || user.email}
        </div>
        <div className="mt-1.5">
          <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
            {role}
          </span>
        </div>
      </div>

      {/* Admin "View as" switcher */}
      {isAdmin && (
        <div className="px-5 py-4 border-b border-white/[0.04]">
          <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-2">View as</label>
          <select
            value={role}
            onChange={(e) => changePreview(e.target.value)}
            className="w-full bg-[#0d1117] border border-white/[0.06] rounded-lg px-3 py-2 text-[12px] text-white/80 focus:outline-none focus:border-[#17FC13]/30 cursor-pointer"
          >
            <option value="admin">Admin (you)</option>
            <option value="coach">Coach</option>
            <option value="player">Player</option>
            <option value="applicant">Applicant</option>
          </select>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium no-underline transition-colors ${
                active
                  ? "text-[#17FC13] bg-[#17FC13]/5"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.02]"
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 pb-6 border-t border-white/[0.04] pt-3 mt-2">
        <a
          href="/"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/40 hover:text-[#17FC13] hover:bg-white/[0.02] no-underline transition-colors"
        >
          {icons.site}
          Back to Site
        </a>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/30 hover:text-white/50 bg-transparent border-none cursor-pointer transition-colors"
        >
          {icons.signout}
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center justify-between px-4">
        <span className="text-white font-bold text-sm uppercase tracking-[0.15em]">Apex Academy</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/50 bg-transparent border-none cursor-pointer p-1"
        >
          {sidebarOpen ? icons.close : icons.menu}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#0a0a0a] border-r border-white/[0.04] transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {previewing && (
          <div className="bg-[#17FC13]/[0.06] border-b border-[#17FC13]/20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#17FC13]/70">
                Previewing as {role}
              </span>
              <button
                onClick={() => changePreview("admin")}
                className="text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white bg-transparent border-none cursor-pointer transition-colors"
              >
                Exit preview →
              </button>
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
