import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface InviteUserEmailProps {
  invitedByUsername?: string;
  invitedByEmail?: string;
  communityName?: string;
  inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const InviteUserEmail = ({
  invitedByUsername,
  invitedByEmail,
  communityName,
  inviteLink,
}: InviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Neighborly`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{communityName}</strong> on{" "}
              <strong>Neighborly</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello there,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{communityName}</strong>{" "}
              community on <strong>Neighborly</strong>.
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              You need to log in before you can join the community. If you don't
              have an account, you can create one for free.
              <strong>Click the link below after logging in</strong>
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-blue-500 px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join community
              </Button>
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] font-bold leading-[24px] text-[#666666]">
              Pleae do not share this link or email with others. It's private
              and unique to you.
            </Text>
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this invitation, you can ignore this
              email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InviteUserEmail.PreviewProps = {
  username: "hunchodotdev",
  invitedByUsername: "Quavo",
  invitedByEmail: "huncho@example.com",
  communityName: "Enigma",
  inviteLink: "https://vercel.com/teams/invite/foo",
} as InviteUserEmailProps;

export default InviteUserEmail;
