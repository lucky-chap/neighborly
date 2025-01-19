import { NextRequest, NextResponse } from "next/server";
import InviteUserEmail from "@/emails/invite";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await resend.emails.send({
    // change the "from" to custom domain
    from: "Neighborly <noreply@quirk.lol>",
    to: body.recipientEmail,
    subject: `You're invited to join ${body.communityName} on Neighborly`,
    react: InviteUserEmail({
      communityName: body.communityName,
      invitedByEmail: body.invitedByEmail,
      invitedByUsername: body.invitedByUsername,
      inviteLink: body.inviteLink,
    }),
  });

  return NextResponse.json({ res }, { status: 200 });
}
