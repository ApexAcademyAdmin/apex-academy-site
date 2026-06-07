import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, adminEmail, approvalEmail, needsInfoEmail, rejectionEmail } from "@/lib/email";

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

  const { teamId, updates, message } = await req.json();
  if (!teamId) return NextResponse.json({ error: "Missing teamId" }, { status: 400 });

  // Only allow admin-editable fields.
  const allowed: Record<string, unknown> = {};
  if (updates?.status !== undefined) allowed.status = updates.status;
  if (updates?.age_group !== undefined) allowed.age_group = updates.age_group || null;
  if (updates?.division !== undefined) allowed.division = updates.division || null;
  if (updates?.team_name !== undefined) allowed.team_name = updates.team_name;
  if (updates?.contact_name !== undefined) allowed.contact_name = updates.contact_name;
  if (updates?.contact_email !== undefined) allowed.contact_email = updates.contact_email;
  if (updates?.contact_phone !== undefined) allowed.contact_phone = updates.contact_phone;
  if (updates?.admin_notes !== undefined) allowed.admin_notes = updates.admin_notes || null;

  // Stamp lifecycle timestamps on status transitions.
  if (allowed.status === "approved") allowed.approved_at = new Date().toISOString();
  if (allowed.status === "published") allowed.published_at = new Date().toISOString();

  const admin = createAdminClient();

  // Fetch current team for email context when status changes.
  const { data: team } = await admin
    .from("teams")
    .select("team_name, age_group, division, contact_name, contact_email, contact_phone, notes")
    .eq("id", teamId)
    .maybeSingle();

  const { error } = await admin.from("teams").update(allowed).eq("id", teamId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fire status-change emails (non-blocking).
  if (team?.contact_email && typeof allowed.status === "string") {
    const reg = {
      teamName: team.team_name || "",
      ageGroup: team.age_group || "",
      conference: team.division || "",
      coachName: team.contact_name || "",
      coachEmail: team.contact_email,
      coachPhone: team.contact_phone || "",
      notes: team.notes || "",
    };
    const origin = req.nextUrl.origin;
    const note = message || updates?.admin_notes || "";
    let msg: { subject: string; html: string; text: string } | null = null;
    let template = "";

    if (allowed.status === "approved") {
      msg = approvalEmail(reg, { dashboardUrl: `${origin}/account` });
      template = "team_approved";
    } else if (allowed.status === "needs_info") {
      msg = needsInfoEmail(reg, { message: note, updateUrl: `${origin}/account/team` });
      template = "team_needs_info";
    } else if (allowed.status === "rejected") {
      msg = rejectionEmail(reg, { message: note, contactUrl: `mailto:${adminEmail()}` });
      template = "team_rejected";
    }

    if (msg) {
      await sendEmail({ to: reg.coachEmail, subject: msg.subject, html: msg.html, text: msg.text, replyTo: adminEmail(), template });
    }
  }

  return NextResponse.json({ success: true });
}
