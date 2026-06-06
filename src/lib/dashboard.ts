import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export type DashboardRole = "admin" | "coach" | "player" | "applicant";

export type DashboardContext = {
  user: User;
  role: DashboardRole;
  displayName: string;
  teamStatus?: string;
};

/**
 * Loads the signed-in user and derives their dashboard role.
 *
 * Role precedence: admin (admin_profiles) > coach (owns a team) >
 * player (has a player_profile) > applicant. Display name comes from
 * user_profiles when present, otherwise the email local-part.
 *
 * Returns null when no user is signed in.
 */
export async function loadDashboardContext(): Promise<DashboardContext | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Run the independent lookups together.
  const [adminRes, teamRes, playerRes, profileRes] = await Promise.all([
    supabase.from("admin_profiles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("teams").select("status").eq("user_id", user.id).maybeSingle(),
    supabase.from("player_profiles").select("id").eq("user_id", user.id).maybeSingle(),
    supabase.from("user_profiles").select("display_name").eq("user_id", user.id).maybeSingle(),
  ]);

  let role: DashboardRole = "applicant";
  let teamStatus: string | undefined;

  if (adminRes.data) {
    role = "admin";
  } else if (teamRes.data) {
    role = "coach";
    teamStatus = teamRes.data.status;
  } else if (playerRes.data) {
    role = "player";
  }

  const displayName =
    profileRes.data?.display_name?.trim() ||
    user.email?.split("@")[0] ||
    "Member";

  return { user, role, displayName, teamStatus };
}
