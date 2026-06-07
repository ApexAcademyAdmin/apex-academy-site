import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { sendEmail, adminEmail, passwordChangedEmail } from "@/lib/email";

// Sends the "password updated" confirmation. Session-gated: only ever emails
// the signed-in user, so it can't be used to send mail to arbitrary addresses.
export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = new URL(request.url).origin;
  const msg = passwordChangedEmail({ manageUrl: `${origin}/account/settings` });
  await sendEmail({ to: user.email, subject: msg.subject, html: msg.html, text: msg.text, replyTo: adminEmail(), template: "password_changed" });

  return NextResponse.json({ success: true });
}
