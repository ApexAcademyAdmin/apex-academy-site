import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const admin = createAdminClient();

    // 1. Create auth user with contact email
    const email = body.contactEmail;
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) {
      if (authError.message?.includes("already been registered")) {
        return NextResponse.json({ error: "An account with this email already exists. Please sign in." }, { status: 400 });
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user.id;

    // 2. Create team record with status=pending
    const { error: teamError } = await admin.from("teams").insert({
      user_id: userId,
      status: "pending",
      team_name: body.teamName || "Unnamed Team",
      org_name: body.orgName || "",
      org_email: body.orgEmail || "",
      org_website: body.orgWebsite || "",
      contact_name: body.contactName || "",
      contact_email: email,
      contact_phone: body.contactPhone || "",
      city: body.city || "",
      state: body.state || "MA",
      age_group: body.ageDivision || null,
      division: body.leagueLevel === "Premier Division" ? "Premier" : body.leagueLevel === "Prospect Division" ? "Prospect" : null,
      home_field: body.homeField || "",
      home_field_address: body.homeFieldAddress || "",
      primary_color: body.primaryColor || "#000000",
      secondary_color: body.secondaryColor || "#ffffff",
      roster: body.players || [],
      coaches: body.coaches || [],
      preferred_days: body.preferredDays || [],
      travel_limit: body.travelLimit || "",
      special_requests: body.specialRequests || "",
    });

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
