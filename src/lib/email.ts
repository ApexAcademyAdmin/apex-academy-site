import { CONTACT } from "@/lib/constants";

/**
 * Minimal transactional email helper.
 *
 * Uses Resend's HTTP API when RESEND_API_KEY is set; otherwise it no-ops
 * (logging a warning) so registration never fails just because email isn't
 * configured yet. Set these env vars to enable delivery:
 *   RESEND_API_KEY   — Resend API key
 *   EMAIL_FROM       — verified from address, e.g. "Apex Academy <league@apexacademy.gg>"
 *   ADMIN_EMAIL      — where admin notifications go (defaults to CONTACT.email)
 */

type SendArgs = { to: string; subject: string; html: string; replyTo?: string };

export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Apex Academy <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${subject}" to ${to}`);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      console.error(`[email] send failed (${res.status}) for "${subject}":`, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] send threw for "${subject}":`, err);
    return false;
  }
}

export const adminEmail = () => process.env.ADMIN_EMAIL || CONTACT.email;

// ── Shared shell ─────────────────────────────────────────────
function shell(heading: string, body: string): string {
  return `
  <div style="background:#0a0a0a;padding:32px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#0d1117;border:1px solid #1d2530;border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #161c24;">
        <span style="color:#17FC13;font-size:13px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;">Apex Academy League</span>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 14px;color:#ffffff;font-size:20px;font-weight:800;">${heading}</h1>
        <div style="color:#aab3bd;font-size:14px;line-height:1.6;">${body}</div>
      </div>
      <div style="padding:18px 28px;border-top:1px solid #161c24;color:#5b636c;font-size:11px;">
        ${CONTACT.location} · <a href="mailto:${CONTACT.email}" style="color:#17FC13;text-decoration:none;">${CONTACT.email}</a>
      </div>
    </div>
  </div>`;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 0;color:#6b727a;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">${label}</td><td style="padding:4px 0;color:#e6e9ec;font-size:14px;text-align:right;">${value || "—"}</td></tr>`;
}

type Reg = { teamName: string; ageGroup: string; coachName: string; coachEmail: string; coachPhone: string; notes?: string };

// ── Templates ────────────────────────────────────────────────

export function coachConfirmationEmail(r: Reg) {
  return {
    subject: "Team Registration Received",
    html: shell(
      "Team Registration Received",
      `<p style="margin:0 0 16px;">Thanks for registering your team, ${r.coachName.split(" ")[0] || "Coach"}. We've received your submission and our league team will review it shortly.</p>
       <table style="width:100%;border-collapse:collapse;margin:8px 0 18px;">
         ${row("Team / Town", r.teamName)}
         ${row("Age Group", r.ageGroup)}
         ${row("Head Coach", r.coachName)}
       </table>
       <p style="margin:0;color:#8a929b;font-size:13px;">Roster, payment, and full team details can be completed later from your dashboard once your team is approved. No action is needed right now.</p>`,
    ),
  };
}

export function adminNotificationEmail(r: Reg, reviewUrl: string) {
  return {
    subject: `New Team Registration — ${r.teamName} (${r.ageGroup})`,
    html: shell(
      "New Team Registration",
      `<table style="width:100%;border-collapse:collapse;margin:0 0 18px;">
         ${row("Team / Town", r.teamName)}
         ${row("Age Group", r.ageGroup)}
         ${row("Head Coach", r.coachName)}
         ${row("Email", r.coachEmail)}
         ${row("Phone", r.coachPhone)}
         ${row("Notes", r.notes || "")}
       </table>
       <a href="${reviewUrl}" style="display:inline-block;background:#17FC13;color:#04210a;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;padding:11px 20px;border-radius:10px;text-decoration:none;">Review Submission</a>`,
    ),
  };
}

export function approvalEmail(r: Reg, dashboardUrl: string) {
  return {
    subject: "Your Team Has Been Approved",
    html: shell(
      "You're In",
      `<p style="margin:0 0 16px;">Great news — <strong style="color:#fff;">${r.teamName}</strong> (${r.ageGroup}) has been approved for the Apex Academy League.</p>
       <p style="margin:0 0 18px;color:#8a929b;font-size:13px;">You can now log in and complete your full team profile — logo, colors, home field, roster, and more.</p>
       <a href="${dashboardUrl}" style="display:inline-block;background:#17FC13;color:#04210a;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;padding:11px 20px;border-radius:10px;text-decoration:none;">Complete Team Profile</a>`,
    ),
  };
}

export function needsInfoEmail(r: Reg, message: string) {
  return {
    subject: "We Need a Bit More Information",
    html: shell(
      "A Quick Follow-Up",
      `<p style="margin:0 0 16px;">Thanks for registering <strong style="color:#fff;">${r.teamName}</strong> (${r.ageGroup}). Before we can finish reviewing, we need a little more information:</p>
       <div style="background:#11161d;border-left:3px solid #f59e0b;padding:12px 16px;border-radius:8px;color:#e6e9ec;font-size:14px;margin:0 0 18px;">${message || "Please reply to this email with additional details about your team."}</div>
       <p style="margin:0;color:#8a929b;font-size:13px;">Just reply to this email and we'll take it from there.</p>`,
    ),
  };
}

export function rejectionEmail(r: Reg, message: string) {
  return {
    subject: "Update on Your Team Registration",
    html: shell(
      "Registration Update",
      `<p style="margin:0 0 16px;">Thank you for your interest in the Apex Academy League. After review, we're unable to accept <strong style="color:#fff;">${r.teamName}</strong> (${r.ageGroup}) at this time.</p>
       ${message ? `<div style="background:#11161d;border-left:3px solid #ef4444;padding:12px 16px;border-radius:8px;color:#e6e9ec;font-size:14px;margin:0 0 18px;">${message}</div>` : ""}
       <p style="margin:0;color:#8a929b;font-size:13px;">If you have questions, just reply to this email.</p>`,
    ),
  };
}
