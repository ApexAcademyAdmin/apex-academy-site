import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabase();

    // Registration attaches a team to the SIGNED-IN account — no new account.
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "You must be signed in to register a team." }, { status: 401 });
    }

    // One team per account.
    const { data: existing } = await supabase
      .from("teams")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json({ error: "You already have a team registered." }, { status: 400 });
    }

    const body = await req.json();
    const coaches = Array.isArray(body.coaches) ? body.coaches : [];
    const head = coaches[0] || {};

    const { error: teamError } = await supabase.from("teams").insert({
      user_id: user.id,
      status: "pending",
      team_name: body.teamName || "Unnamed Team",
      org_name: body.orgName || "",
      org_email: user.email,
      org_website: body.orgWebsite || "",
      // The head coach is the team's primary contact; login email is the contact email.
      contact_name: head.name || "",
      contact_email: user.email,
      contact_phone: head.phone || "",
      city: body.city || "",
      state: body.state || "MA",
      age_group: body.ageDivision || null,
      division: body.leagueLevel === "Premier Division" ? "Premier" : body.leagueLevel === "Prospect Division" ? "Prospect" : null,
      home_field: body.homeField || "",
      home_field_address: body.homeFieldAddress || "",
      primary_color: body.primaryColor || "#000000",
      secondary_color: body.secondaryColor || "#ffffff",
      roster: [], // roster is added later from the dashboard
      coaches,
      preferred_days: body.preferredDays || [],
      travel_limit: body.travelLimit || "",
      special_requests: body.specialRequests || "",
    });

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
