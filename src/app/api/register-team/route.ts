import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { AGE_GROUPS } from "@/lib/constants";
import { sendEmail, adminEmail, coachConfirmationEmail, adminNotificationEmail } from "@/lib/email";

// ── Best-effort in-memory rate limit (per IP) ────────────────
// Note: serverless instances are ephemeral, so this throttles bursts within a
// warm instance rather than enforcing a hard global limit. Pair with the
// honeypot below; move to a shared store (e.g. Upstash) for strict limits.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "Too many attempts. Please try again in a minute." }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot: real users never fill this hidden field.
    if (clean(body.company)) {
      return NextResponse.json({ success: true }); // silently accept-and-drop
    }

    // ── Validate ──
    const teamName = clean(body.teamName, 120);
    const ageGroup = clean(body.ageGroup, 8);
    const coachName = clean(body.coachName, 120);
    const coachEmail = clean(body.coachEmail, 160).toLowerCase();
    const coachPhone = clean(body.coachPhone, 40);
    const notes = clean(body.notes, 1000);

    if (!teamName) return NextResponse.json({ error: "Please enter your town/team name." }, { status: 400 });
    if (!AGE_GROUPS.includes(ageGroup as (typeof AGE_GROUPS)[number]))
      return NextResponse.json({ error: "Please select a valid age group." }, { status: 400 });
    if (!coachName) return NextResponse.json({ error: "Please enter the head coach's name." }, { status: 400 });
    if (!isEmail(coachEmail)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (coachPhone.replace(/\D/g, "").length !== 10)
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });

    const admin = createAdminClient();

    // ── Resolve the coach account ──
    // If the visitor is signed in, attach to that account. Otherwise create /
    // invite an account for the coach email so they can log in later.
    const supabase = await createServerSupabase();
    const { data: { user: sessionUser } } = await supabase.auth.getUser();

    let coachUserId: string | null = sessionUser?.id ?? null;

    if (sessionUser) {
      // One pending/active team per signed-in account.
      const { data: existing } = await admin.from("teams").select("id").eq("user_id", sessionUser.id).maybeSingle();
      if (existing) {
        return NextResponse.json({ error: "Your account already has a registered team." }, { status: 400 });
      }
    } else {
      // Invite by email (sends a set-password link via Supabase auth email).
      const redirectTo = `${req.nextUrl.origin}/auth/callback`;
      const { data: invite, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(coachEmail, { redirectTo });
      if (invite?.user) {
        coachUserId = invite.user.id;
      } else if (inviteErr) {
        // Already-registered email (or invite disabled): proceed without linking;
        // an admin can link the account on review. Don't leak account existence.
        coachUserId = null;
      }
    }

    // ── Create the pending team profile ──
    const { data: team, error: teamError } = await admin
      .from("teams")
      .insert({
        user_id: coachUserId,
        status: "pending_review",
        team_name: teamName,
        org_name: teamName,
        age_group: ageGroup,
        contact_name: coachName,
        contact_email: coachEmail,
        contact_phone: coachPhone,
        notes: notes || null,
      })
      .select("id")
      .single();

    if (teamError) {
      return NextResponse.json({ error: teamError.message }, { status: 500 });
    }

    // ── Notifications (non-blocking on failure) ──
    const reg = { teamName, ageGroup, coachName, coachEmail, coachPhone, notes };
    const reviewUrl = `${req.nextUrl.origin}/admin/teams`;

    const coachMsg = coachConfirmationEmail(reg);
    const adminMsg = adminNotificationEmail(reg, reviewUrl);
    await Promise.allSettled([
      sendEmail({ to: coachEmail, subject: coachMsg.subject, html: coachMsg.html, replyTo: adminEmail() }),
      sendEmail({ to: adminEmail(), subject: adminMsg.subject, html: adminMsg.html, replyTo: coachEmail }),
    ]);

    return NextResponse.json({ success: true, teamId: team.id });
  } catch {
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
