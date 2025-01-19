"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");

  return (
    <div className="container mx-auto my-auto flex min-h-screen w-full">
      <div className="mx-auto my-auto flex max-w-[384px] flex-col gap-4 pb-8">
        {step === "signIn" ? (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">
              Sign in or create an account
            </h2>
            <SignInWithGitHub />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">
              Check your email
            </h2>
            <p>A sign-in link has been sent to your email address.</p>
            <Button
              className="self-start p-0"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function SignInWithGitHub() {
  const { signIn } = useAuthActions();
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={() => void signIn("github", { redirectTo: "/dashboard" })}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
    </Button>
  );
}
