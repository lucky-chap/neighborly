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
import MembersTable from "@/components/members-table";

export default function AboutCommunityPage() {
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];
  const currentPath = pathname.split("/")[3];
  const user = useQuery(api.users.viewer);
  const community = useQuery(api.community.find, {
    userId: user?._id as Id<"users">,
  });
  const member = useQuery(api.member.findOne, {
    email: user?.email as string,
    communityId: communityId as Id<"community">,
  });
  const currentCommunity = useQuery(api.community.findOne, {
    id: communityId as Id<"community">,
  });

  return (
    <div className="mb-20">
      {member == undefined && member !== null && (
        <div className="grid min-h-[60vh] place-content-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {member == null &&
      member !== undefined &&
      user?._id !== currentCommunity?.leader ? (
        <div className="grid min-h-[60vh] place-content-center">
          <p>Only members of this community can view this page</p>
        </div>
      ) : (
        <MembersTable
          communityId={communityId as Id<"community">}
          // communityName={"member"}
        />
      )}
    </div>
  );
}
