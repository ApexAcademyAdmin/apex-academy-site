import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type DashboardRole = "admin" | "coach" | "applicant";

export type DashboardContext = {
  user: User;
  /** The role the dashboard renders as (may be an admin preview override). */
  role: DashboardRole;
  /** The user's true role, before any admin "View as" preview. */
  realRole: DashboardRole;
  displayName: string;
  firstName: string;
  teamStatus?: string;
};

const PREVIEW_KEY = "apex_preview_role";

/** Admin-only "View as" override, persisted for the browser session. */
export function getPreviewRole(): DashboardRole | null {
  if (typeof window === "undefined") return null;
  const v = window.sessionStorage.getItem(PREVIEW_KEY);
  return v === "coach" || v === "applicant" ? v : null;
}

export function setPreviewRole(role: DashboardRole | null) {
  if (typeof window === "undefined") return;
  if (!role || role === "admin") window.sessionStorage.removeItem(PREVIEW_KEY);
  else window.sessionStorage.setItem(PREVIEW_KEY, role);
}

/**
 * Loads the signed-in user and derives their dashboard role.
 *
 * Role precedence: admin (admin_profiles) > coach (owns a team) > applicant.
 * Display name comes from user_profiles when present, otherwise the email
 * local-part. Returns null when no user is signed in.
 */
export async function loadDashboardContext(): Promise<DashboardContext | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Run the independent lookups together.
  const [adminRes, teamRes, profileRes] = await Promise.all([
    supabase.from("admin_profiles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("teams").select("status").eq("user_id", user.id).maybeSingle(),
    supabase.from("user_profiles").select("display_name").eq("user_id", user.id).maybeSingle(),
  ]);

  let realRole: DashboardRole = "applicant";
  let teamStatus: string | undefined;

  if (adminRes.data) {
    realRole = "admin";
  } else if (teamRes.data) {
    realRole = "coach";
    teamStatus = teamRes.data.status;
  }

  // Admins can preview other roles via the "View as" switcher.
  const preview = getPreviewRole();
  const role = realRole === "admin" && preview ? preview : realRole;

  const displayName =
    profileRes.data?.display_name?.trim() ||
    user.email?.split("@")[0] ||
    "Member";

  const firstName = displayName.split(/\s+/)[0] || "Member";

  return { user, role, realRole, displayName, firstName, teamStatus };
}
