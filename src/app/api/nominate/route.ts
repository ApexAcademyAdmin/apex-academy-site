import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    const required = ["coachName", "coachEmail", "coachRole", "organization", "playerName", "playerAge", "playerGradYear", "playerPosition", "playerSchool", "playerCity", "reason"];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Log nomination (will be replaced with email service on deploy)
    console.log("=== NEW PROSPECT NOMINATION ===");
    console.log(`Coach: ${data.coachName} (${data.coachEmail})`);
    console.log(`Role: ${data.coachRole} — ${data.organization}`);
    console.log(`Player: ${data.playerName} | ${data.playerAge} | ${data.playerGradYear}`);
    console.log(`Position: ${data.playerPosition}${data.playerSecondary ? ` / ${data.playerSecondary}` : ""}`);
    console.log(`School: ${data.playerSchool}, ${data.playerCity}, ${data.playerState}`);
    console.log(`Reason: ${data.reason}`);
    console.log("===============================");

    // TODO: Add Resend or SMTP email delivery on deploy
    // await sendEmail({ to: "admin@apexacademy.gg", subject: `Prospect Nomination — ${data.playerName}`, ... })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to process nomination" }, { status: 500 });
  }
}
