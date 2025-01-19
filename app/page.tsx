"use client";

import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import AnimatedAvatars from "@/components/animated-avatars";

export default function HomePage() {
  const user = useQuery(api.users.viewer);
  const { signIn } = useAuthActions();
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <AnimatedAvatars />
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Unite and Thrive: Building Stronger Neghborhoods Together
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-600">
            Our platform is designed to bring{" "}
            <span className="font-semibold text-zinc-900">local</span>{" "}
            communities and neighborhoods together. By fostering connections and
            encouraging participation, we help you make informed decisions and
            foster a sense of unity and growth, building a stronger, more united
            community.
          </p>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600 mx-auto max-w-4xl">
            Our platform empowers communities to come together, share feedback,
            and engage in meaningful activities. By harnessing collective
            insights, we help you make informed decisions and foster a sense of
            unity and growth. Join us to create a better tomorrow, one feedback
            at a time.
          </p> */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user === null || user === undefined ? (
              <Button
                disabled={user === undefined}
                onClick={() =>
                  void signIn("github", { redirectTo: "/dashboard" })
                }
                className="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ring-offset-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
              >
                {/* <GitHubLogoIcon className="mr-2 h-4 w-4" /> */}
                {user === undefined && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login with Github
              </Button>
            ) : (
              <Link href={"/dashboard"}>
                <Button className="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm ring-offset-white transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:ring-offset-zinc-950 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
