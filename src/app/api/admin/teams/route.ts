import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function isAdmin(supabase: Awaited<ReturnType<typeof createServerSupabase>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase.from("admin_profiles").select("role").eq("user_id", user.id).single();
  return !!data;
}

// GET — fetch all teams (admin only, uses service role to bypass RLS)
export async function GET() {
  const supabase = await createServerSupabase();
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: teams, error } = await admin
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ teams });
}

// PATCH — update a team (admin only)
export async function PATCH(req: NextRequest) {
  const supabase = await createServerSupabase();
  if (!(await isAdmin(supabase))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { teamId, updates } = await req.json();
  if (!teamId) return NextResponse.json({ error: "Missing teamId" }, { status: 400 });

  // Only allow admin-editable fields
  const allowed: Record<string, unknown> = {};
  if (updates.status !== undefined) allowed.status = updates.status;
  if (updates.age_group !== undefined) allowed.age_group = updates.age_group || null;
  if (updates.division !== undefined) allowed.division = updates.division || null;

  const admin = createAdminClient();
  const { error } = await admin.from("teams").update(allowed).eq("id", teamId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
