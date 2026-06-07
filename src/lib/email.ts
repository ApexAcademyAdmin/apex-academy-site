import { CONTACT } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Apex Academy League — premium transactional email system.
 *
 * A dependency-free component library that renders email-client-safe,
 * inline-styled HTML (the same table/inline output React Email compiles to)
 * in the league's brand — MLB-grade structure: brand header, hero with status
 * indicator, status cards, information/data-grid cards, timeline, action panel,
 * support panel, premium footer. Sends via Resend; no-ops + logs when
 * RESEND_API_KEY isn't set so flows never fail on email.
 */

// ── Brand tokens ────────────────────────────────────────────
const C = {
  green: "#17FC13",
  black: "#000000",
  bg: "#0F1115",        // charcoal — outer/email surface
  surface: "#161B22",   // dark surface — cards
  surfaceSoft: "#1B2027",
  border: "#252C36",
  borderSoft: "#1E242C",
  white: "#FFFFFF",
  text: "#EAEDF1",
  muted: "#B0B7C3",     // neutral gray — body copy
  faint: "#6B7480",
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://apex-academy-site.vercel.app").replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/logos/decal-lg.png`;
const LEAGUE = "Apex Academy League";

type Tone = "success" | "warning" | "info" | "error";
// Program palette only: green for positive/brand states, white for
// caution/negative states. Meaning is carried by the glyph, headline, and copy.
const toneColor: Record<Tone, string> = { success: C.green, info: C.green, warning: C.white, error: C.white };
const toneGlyph: Record<Tone, string> = { success: "&#10003;", warning: "!", info: "i", error: "&#10005;" };

const esc = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Public-facing registration number derived from the team id. */
export const regNumber = (id: string) => `APX-${(id || "").replace(/-/g, "").slice(0, 6).toUpperCase()}`;

// ── EmailHeader ──────────────────────────────────────────────
function header(): string {
  return `
  <tr><td style="height:3px;line-height:3px;font-size:0;background:linear-gradient(90deg, ${C.green} 0%, ${C.green}55 45%, transparent 100%);">&nbsp;</td></tr>
  <tr><td class="px" style="padding:26px 36px 22px;background:${C.black};border-bottom:1px solid ${C.border};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <img src="${LOGO_URL}" width="138" alt="${LEAGUE}" style="display:block;height:auto;border:0;outline:none;max-width:138px;" />
      </td>
      <td style="vertical-align:middle;text-align:right;">
        <span style="font-size:10px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:${C.faint};">Town Baseball League</span>
      </td>
    </tr></table>
  </td></tr>`;
}

// ── HeroSection (with stadium-light glow + status indicator) ──
function hero(tone: Tone, eyebrow: string, title: string, subtitle: string): string {
  const col = toneColor[tone];
  return `
  <tr><td class="px" style="padding:40px 36px 10px;background-color:${C.bg};background-image:radial-gradient(120% 90% at 50% -25%, ${col}1f 0%, ${col}00 55%);">
    <div style="width:54px;height:54px;border-radius:50%;background:${col}1a;border:1px solid ${col}55;text-align:center;line-height:54px;font-size:23px;font-weight:800;color:${col};margin-bottom:22px;">${toneGlyph[tone]}</div>
    <div style="font-size:11px;font-weight:800;letter-spacing:0.26em;text-transform:uppercase;color:${col};margin-bottom:12px;">${esc(eyebrow)}</div>
    <h1 style="margin:0 0 14px;font-size:30px;line-height:1.1;font-weight:800;letter-spacing:0.01em;text-transform:uppercase;color:${C.white};">${esc(title)}</h1>
    <p style="margin:0;font-size:15px;line-height:1.62;color:${C.muted};">${subtitle}</p>
  </td></tr>`;
}

function spacer(h = 24): string {
  return `<tr><td style="height:${h}px;line-height:${h}px;font-size:0;background:${C.bg};">&nbsp;</td></tr>`;
}

/** Elevated approval/award badge band. */
function badge(text: string): string {
  return `
  <tr><td class="px" style="padding:6px 36px 0;background:${C.bg};">
    <span style="display:inline-block;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${C.green};background:${C.green}14;border:1px solid ${C.green}44;border-radius:999px;padding:7px 16px;">${esc(text)}</span>
  </td></tr>`;
}

function adminBadge(): string {
  return `
  <tr><td class="px" style="padding:24px 36px 0;background:${C.bg};">
    <span style="display:inline-block;font-size:10px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;color:${C.white};background:${C.white}12;border:1px solid ${C.white}33;border-radius:999px;padding:5px 13px;">Admin · Action Required</span>
  </td></tr>`;
}

// ── StatusCard ───────────────────────────────────────────────
function statusCard(tone: Tone, title: string, text: string): string {
  const col = toneColor[tone];
  return `
  <tr><td class="px" style="padding:0 36px;background:${C.bg};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};border:1px solid ${C.border};border-left:3px solid ${col};border-radius:14px;">
      <tr><td style="padding:18px 22px;">
        <div style="font-size:13px;font-weight:800;color:${col};margin-bottom:5px;letter-spacing:0.01em;">${esc(title)}</div>
        <div style="font-size:13px;line-height:1.6;color:${C.muted};">${text}</div>
      </td></tr>
    </table>
  </td></tr>`;
}

// ── InformationCard + DataGrid ───────────────────────────────
function infoCard(title: string, rows: { label: string; value: string }[]): string {
  const body = rows
    .filter((r) => r.value)
    .map(
      (r, i) => `
      <tr>
        <td style="padding:12px 0;${i ? `border-top:1px solid ${C.borderSoft};` : ""}font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${C.faint};vertical-align:top;width:42%;">${esc(r.label)}</td>
        <td style="padding:12px 0;${i ? `border-top:1px solid ${C.borderSoft};` : ""}font-size:14px;color:${C.text};text-align:right;vertical-align:top;font-weight:500;">${esc(r.value)}</td>
      </tr>`,
    )
    .join("");
  return `
  <tr><td class="px" style="padding:0 36px;background:${C.bg};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};border:1px solid ${C.border};border-radius:14px;">
      <tr><td style="padding:16px 22px 12px;border-bottom:1px solid ${C.borderSoft};">
        <div style="font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${C.green};">${esc(title)}</div>
      </td></tr>
      <tr><td style="padding:4px 22px 14px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
      </td></tr>
    </table>
  </td></tr>`;
}

// ── TimelineCard ─────────────────────────────────────────────
function timeline(title: string, steps: string[]): string {
  const items = steps
    .map(
      (s, i) => `
      <tr>
        <td style="width:28px;vertical-align:top;padding:0 0 ${i === steps.length - 1 ? 0 : 15}px;">
          <div style="width:24px;height:24px;border-radius:50%;background:${C.green}14;border:1px solid ${C.green}44;color:${C.green};font-size:11px;font-weight:800;text-align:center;line-height:24px;">${i + 1}</div>
        </td>
        <td style="vertical-align:top;padding:2px 0 ${i === steps.length - 1 ? 0 : 15}px 13px;font-size:14px;line-height:1.5;color:${C.text};">${esc(s)}</td>
      </tr>`,
    )
    .join("");
  return `
  <tr><td class="px" style="padding:0 36px;background:${C.bg};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};border:1px solid ${C.border};border-radius:14px;">
      <tr><td style="padding:18px 22px 16px;">
        <div style="font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${C.green};margin-bottom:16px;">${esc(title)}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
      </td></tr>
    </table>
  </td></tr>`;
}

// ── ActionPanel (CTA) ────────────────────────────────────────
function button(href: string, label: string, variant: "primary" | "secondary" = "primary"): string {
  const primary = variant === "primary";
  const bg = primary ? C.green : "transparent";
  const color = primary ? C.black : C.white;
  const border = primary ? C.green : C.border;
  return `
  <tr><td class="px" style="padding:30px 36px 8px;background:${C.bg};">
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0;"><tr>
      <td style="border-radius:12px;background:${bg};border:1px solid ${border};">
        <a href="${href}" style="display:inline-block;padding:15px 32px;font-size:14px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${color};text-decoration:none;border-radius:12px;">${esc(label)}</a>
      </td>
    </tr></table>
  </td></tr>`;
}

// ── SupportPanel ─────────────────────────────────────────────
function supportCard(): string {
  return `
  <tr><td class="px" style="padding:26px 36px 4px;background:${C.bg};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surfaceSoft};border:1px solid ${C.border};border-radius:14px;">
      <tr><td style="padding:16px 22px;">
        <div style="font-size:13px;font-weight:800;color:${C.text};margin-bottom:3px;">Need help?</div>
        <div style="font-size:13px;color:${C.muted};">Reply to this email or reach us at <a href="mailto:${CONTACT.email}" style="color:${C.green};text-decoration:none;">${CONTACT.email}</a>.</div>
      </td></tr>
    </table>
  </td></tr>`;
}

// ── PremiumFooter ────────────────────────────────────────────
function footer(): string {
  return `
  <tr><td class="px" style="background:${C.black};border-top:1px solid ${C.border};padding:28px 36px 32px;">
    <div style="border-top:2px solid ${C.green};width:44px;margin-bottom:20px;"></div>
    <div style="font-size:13px;font-weight:800;letter-spacing:0.05em;color:${C.white};margin-bottom:8px;">${LEAGUE}</div>
    <div style="font-size:12px;line-height:1.8;color:${C.faint};">
      <a href="${SITE_URL}" style="color:${C.muted};text-decoration:none;">Website</a>
      &nbsp;·&nbsp;<a href="mailto:${CONTACT.email}" style="color:${C.muted};text-decoration:none;">Support</a>
      &nbsp;·&nbsp;<a href="${CONTACT.instagram}" style="color:${C.muted};text-decoration:none;">Instagram</a>
      &nbsp;·&nbsp;<a href="${CONTACT.twitter}" style="color:${C.muted};text-decoration:none;">X</a>
    </div>
    <div style="font-size:11px;line-height:1.8;color:${C.faint};margin-top:8px;">
      <a href="${SITE_URL}/privacy" style="color:${C.faint};text-decoration:none;">Privacy</a>
      &nbsp;·&nbsp;<a href="${SITE_URL}/terms" style="color:${C.faint};text-decoration:none;">Terms</a>
    </div>
    <div style="font-size:11px;color:${C.faint};margin-top:14px;line-height:1.6;">
      You're receiving this because you registered a team or created an account with the ${LEAGUE}.<br/>
      ${CONTACT.location} · &copy; ${new Date().getFullYear()} Apex Academy. All rights reserved.
    </div>
  </td></tr>`;
}

function preheader(text: string): string {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${esc(text)}</div>`;
}

// ── EmailShell ───────────────────────────────────────────────
function layout(preview: string, sections: string): string {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="color-scheme" content="dark light"/>
<meta name="supported-color-schemes" content="dark light"/>
<style>
  body{margin:0;padding:0;background:${C.black};-webkit-text-size-adjust:100%;}
  a{text-decoration:none;}
  @media only screen and (max-width:620px){
    .container{width:100% !important;}
    .px{padding-left:22px !important;padding-right:22px !important;}
    h1{font-size:25px !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.black};">
  ${preheader(preview)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.black};">
    <tr><td align="center" style="padding:26px 12px;">
      <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" style="width:640px;max-width:640px;background:${C.bg};border:1px solid ${C.border};border-radius:18px;overflow:hidden;">
        ${sections}
      </table>
      <div style="font-size:11px;color:${C.faint};margin-top:16px;">${LEAGUE}</div>
    </td></tr>
  </table>
</body></html>`;
}

// ── Types ────────────────────────────────────────────────────
export type Reg = {
  teamName: string;
  ageGroup: string;
  conference?: string;
  coachName: string;
  coachEmail: string;
  coachPhone: string;
  notes?: string;
};

const firstName = (full: string) => full.trim().split(/\s+/)[0] || "Coach";

// ── Templates ────────────────────────────────────────────────

export function coachConfirmationEmail(r: Reg, opt: { regNumber: string; submittedDate: string; viewUrl: string }) {
  const html = layout(
    `We received your registration for ${r.teamName}.`,
    header() +
      hero("success", "Registration Received", "Registration Received", `Thanks, ${esc(firstName(r.coachName))}. Your team is in the queue — here's everything we have on file.`) +
      spacer(26) +
      statusCard("success", "Submitted — Pending Review", "Our league team will review your registration and follow up with next steps. No action is needed right now.") +
      spacer(16) +
      infoCard("Registration Summary", [
        { label: "Registration ID", value: opt.regNumber },
        { label: "Team / Town", value: r.teamName },
        { label: "Age Group", value: r.ageGroup },
        { label: "Conference", value: r.conference || "" },
        { label: "Submitted", value: opt.submittedDate },
        { label: "Status", value: "Pending Review" },
      ]) +
      spacer(16) +
      infoCard("Coach Information", [
        { label: "Head Coach", value: r.coachName },
        { label: "Email", value: r.coachEmail },
        { label: "Phone", value: r.coachPhone },
      ]) +
      spacer(8) +
      timeline("What Happens Next", [
        "Our league staff reviews your submission.",
        "You'll get an email once your team is approved.",
        "Then you complete your team profile and add your roster.",
      ]) +
      button(opt.viewUrl, "View Registration") +
      supportCard() +
      spacer(22) +
      footer(),
  );
  const text = `REGISTRATION RECEIVED

Thanks, ${firstName(r.coachName)}. Your team is in and pending review.

Registration ID: ${opt.regNumber}
Team / Town: ${r.teamName}
Age Group: ${r.ageGroup}${r.conference ? `\nConference: ${r.conference}` : ""}
Submitted: ${opt.submittedDate}
Status: Pending Review

Head Coach: ${r.coachName}
Email: ${r.coachEmail}
Phone: ${r.coachPhone}

What happens next: our staff reviews your submission, you'll get an email once approved, then you complete your profile and add your roster.

View registration: ${opt.viewUrl}
Need help? ${CONTACT.email}`;
  return { subject: "Team Registration Received", html, text };
}

export function adminNotificationEmail(r: Reg, opt: { reviewUrl: string; regNumber: string }) {
  const html = layout(
    `${r.teamName} (${r.ageGroup}) just registered.`,
    header() +
      adminBadge() +
      hero("info", "New Registration", "New Team Registration", "A coach just submitted a town team for review.") +
      spacer(22) +
      infoCard("Registration", [
        { label: "Registration ID", value: opt.regNumber },
        { label: "Team / Town", value: r.teamName },
        { label: "Age Group", value: r.ageGroup },
        { label: "Conference", value: r.conference || "" },
      ]) +
      spacer(16) +
      infoCard("Coach", [
        { label: "Name", value: r.coachName },
        { label: "Email", value: r.coachEmail },
        { label: "Phone", value: r.coachPhone },
        { label: "Notes", value: r.notes || "—" },
      ]) +
      button(opt.reviewUrl, "Review Registration") +
      spacer(22) +
      footer(),
  );
  const text = `NEW TEAM REGISTRATION (ADMIN)

Registration ID: ${opt.regNumber}
Team / Town: ${r.teamName}
Age Group: ${r.ageGroup}${r.conference ? `\nConference: ${r.conference}` : ""}

Coach: ${r.coachName}
Email: ${r.coachEmail}
Phone: ${r.coachPhone}
Notes: ${r.notes || "—"}

Review: ${opt.reviewUrl}`;
  return { subject: `New Team Registration — ${r.teamName} (${r.ageGroup})`, html, text };
}

export function approvalEmail(r: Reg, opt: { dashboardUrl: string }) {
  const html = layout(
    `${r.teamName} has been approved for the league.`,
    header() +
      hero("success", "Approved", "Team Approved", `Congratulations, ${esc(firstName(r.coachName))} — <strong style="color:${C.white};">${esc(r.teamName)}</strong> is officially in the ${LEAGUE}.`) +
      badge("&#10003; Approved") +
      spacer(24) +
      statusCard("success", "You're In", "You can now access your dashboard and complete your full team profile — logo, colors, home field, coaching staff, and roster.") +
      spacer(16) +
      infoCard("Team", [
        { label: "Team / Town", value: r.teamName },
        { label: "Age Group", value: r.ageGroup },
        { label: "Conference", value: r.conference || "" },
        { label: "Status", value: "Approved" },
      ]) +
      spacer(8) +
      timeline("Your Roadmap", [
        "Complete your team profile (logo, colors, home field).",
        "Add your roster — players, dates of birth, and parent contacts.",
        "Review league rules and the season schedule when released.",
      ]) +
      button(opt.dashboardUrl, "Complete Team Profile") +
      supportCard() +
      spacer(22) +
      footer(),
  );
  const text = `TEAM APPROVED

Congratulations, ${firstName(r.coachName)} — ${r.teamName} is officially in the ${LEAGUE}.

Team: ${r.teamName}
Age Group: ${r.ageGroup}${r.conference ? `\nConference: ${r.conference}` : ""}
Status: Approved

Your roadmap: complete your team profile, add your roster, and review the rules/schedule.

Complete your profile: ${opt.dashboardUrl}
Need help? ${CONTACT.email}`;
  return { subject: "Your Team Has Been Approved", html, text };
}

export function needsInfoEmail(r: Reg, opt: { message: string; updateUrl: string }) {
  const html = layout(
    `We need a bit more info to finish reviewing ${r.teamName}.`,
    header() +
      hero("warning", "Action Needed", "Additional Information Needed", `Thanks for registering <strong style="color:${C.white};">${esc(r.teamName)}</strong> (${esc(r.ageGroup)}). We need a little more before we can finish our review.`) +
      spacer(26) +
      statusCard("warning", "What We Need", opt.message ? esc(opt.message) : "Please review your registration details and reply with any additional information about your team.") +
      spacer(8) +
      button(opt.updateUrl, "Update Registration") +
      supportCard() +
      spacer(22) +
      footer(),
  );
  const text = `ADDITIONAL INFORMATION NEEDED

Thanks for registering ${r.teamName} (${r.ageGroup}). Before we can finish our review, we need:

${opt.message || "Please review your registration details and reply with additional information about your team."}

Update your registration: ${opt.updateUrl}
Or just reply to this email. Need help? ${CONTACT.email}`;
  return { subject: "Additional Information Needed", html, text };
}

export function rejectionEmail(r: Reg, opt: { message: string; contactUrl: string }) {
  const html = layout(
    `An update on your registration for ${r.teamName}.`,
    header() +
      hero("error", "Status Update", "Registration Status Update", `Thank you for your interest in the ${LEAGUE}. After review, we're unable to accept <strong style="color:${C.white};">${esc(r.teamName)}</strong> (${esc(r.ageGroup)}) at this time.`) +
      spacer(26) +
      (opt.message ? statusCard("error", "Reviewer Notes", esc(opt.message)) + spacer(8) : "") +
      `<tr><td class="px" style="padding:0 36px;background:${C.bg};"><p style="margin:0;font-size:14px;line-height:1.62;color:${C.muted};">We'd be glad to answer any questions or discuss future seasons.</p></td></tr>` +
      button(opt.contactUrl, "Contact League", "secondary") +
      spacer(22) +
      footer(),
  );
  const text = `TEAM REGISTRATION STATUS UPDATE

Thank you for your interest in the ${LEAGUE}. After review, we're unable to accept ${r.teamName} (${r.ageGroup}) at this time.
${opt.message ? `\nReviewer notes: ${opt.message}\n` : ""}
Questions? Contact us at ${CONTACT.email}.`;
  return { subject: "Team Registration Status Update", html, text };
}

export function welcomeEmail(opt: { firstName?: string; dashboardUrl: string }) {
  const sub = opt.firstName ? `Welcome, ${esc(opt.firstName)}. ` : "";
  const html = layout(
    `Welcome to the ${LEAGUE}.`,
    header() +
      hero("success", "Account Created", "Welcome to the League", `${sub}Your account is verified and ready. Here's where to go next.`) +
      spacer(26) +
      statusCard("success", "Account Active", "Your email is verified and your account is ready to use. Everything lives in your dashboard.") +
      spacer(8) +
      timeline("Getting Started", [
        "Follow your team's schedule, scores, and standings.",
        "Explore league info and team pages.",
        "Gear up at the team shop.",
      ]) +
      button(opt.dashboardUrl, "Go to Dashboard") +
      supportCard() +
      spacer(22) +
      footer(),
  );
  const text = `WELCOME TO THE ${LEAGUE.toUpperCase()}

${opt.firstName ? `Welcome, ${opt.firstName}. ` : ""}Your email is verified and your account is ready.

From your dashboard you can follow your team's schedule, scores, and standings, explore team pages, and gear up at the team shop.

Dashboard: ${opt.dashboardUrl}
Need help? ${CONTACT.email}`;
  return { subject: `Welcome to the ${LEAGUE}`, html, text };
}

export function coachAccountReadyEmail(opt: { dashboardUrl: string }) {
  const html = layout(
    "Your coach account is ready.",
    header() +
      hero("success", "Coach Access", "Your Coach Account Is Ready", "You can now sign in and manage your team from your dashboard.") +
      spacer(26) +
      statusCard("success", "What You Can Do", "Complete your team profile, build your roster, and keep your team details up to date.") +
      button(opt.dashboardUrl, "Access Coach Dashboard") +
      supportCard() +
      spacer(22) +
      footer(),
  );
  const text = `YOUR COACH ACCOUNT IS READY

Sign in to manage your team, complete your profile, and build your roster.

Dashboard: ${opt.dashboardUrl}
Need help? ${CONTACT.email}`;
  return { subject: "Your Coach Account Is Ready", html, text };
}

// ── Sending ──────────────────────────────────────────────────

export const adminEmail = () => process.env.ADMIN_EMAIL || CONTACT.email;

type SendArgs = { to: string; subject: string; html: string; text?: string; replyTo?: string; template?: string };

async function logEmail(to: string, subject: string, template: string | undefined, status: string, providerId?: string, error?: string) {
  try {
    await createAdminClient()
      .from("email_logs")
      .insert({ to_email: to, subject, template: template || null, status, provider_id: providerId || null, error: error || null });
  } catch {
    // email_logs is optional — never let logging break a send
  }
}

export async function sendEmail({ to, subject, html, text, replyTo, template }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Apex Academy <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY not set — skipped "${subject}" to ${to}`);
    await logEmail(to, subject, template, "skipped");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html, ...(text ? { text } : {}), ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error(`[email] send failed (${res.status}) for "${subject}":`, errText);
      await logEmail(to, subject, template, "failed", undefined, `${res.status} ${errText}`.slice(0, 500));
      return false;
    }
    const data = await res.json().catch(() => ({}));
    await logEmail(to, subject, template, "sent", data?.id);
    return true;
  } catch (err) {
    console.error(`[email] send threw for "${subject}":`, err);
    await logEmail(to, subject, template, "failed", undefined, String(err).slice(0, 500));
    return false;
  }
}
