import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { sendEmail, adminEmail, welcomeEmail } from "@/lib/email";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/account";

  if (code) {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Send the branded welcome when a freshly created account is confirmed.
      // Gated on account age so password-reset / magic-link callbacks (which
      // hit this same route on older accounts) don't re-trigger it.
      try {
        const user = data?.user;
        if (user?.email && user.created_at) {
          const ageMs = Date.now() - new Date(user.created_at).getTime();
          if (ageMs < 60 * 60 * 1000) {
            const msg = welcomeEmail({ dashboardUrl: `${origin}/account` });
            await sendEmail({ to: user.email, subject: msg.subject, html: msg.html, text: msg.text, replyTo: adminEmail(), template: "account_welcome" });
          }
        }
      } catch {
        // Welcome email is best-effort — never block sign-in on it.
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If something went wrong, redirect to signin with an error hint
  return NextResponse.redirect(`${origin}/signin`);
}
