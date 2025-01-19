"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import logo from "@/public/images/image.png";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedAvatars from "@/components/animated-avatars";
import CommunityTabs from "@/components/community-tabs";

export default function CommunityLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useQuery(api.users.viewer);
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];
  console.log("Community ID: ", communityId);
  const router = useRouter();
  const community = useQuery(api.community.findOne, {
    id: communityId as Id<"community">,
  });

  console.log("Community data: ", community);

  return (
    <section className="p-4">
      {/* <AnimatedAvatars /> */}
      <div className="mx-auto max-w-6xl">
        {community == undefined ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                {/* <Image
                  src={community.logoUrl as string}
                  alt="community logo"
                  width={30}
                  height={30}
                  className="h-9 w-9 rounded-full object-cover"
                /> */}
                <img
                  src={community.logoUrl as string}
                  alt="community logo"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <h1 className="ml-3 text-lg font-bold tracking-tight text-gray-900">
                  {community.name}
                </h1>
              </div>
              <Link href={"/dashboard"}>
                <Button
                  size={"sm"}
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </>
        )}
        <CommunityTabs />
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}
