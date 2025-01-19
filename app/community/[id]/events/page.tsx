"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import logo from "@/public/images/image.png";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import AnimatedAvatars from "@/components/animated-avatars";
import CommunityTabs from "@/components/community-tabs";

export default function CommunityEventsPage() {
  const user = useQuery(api.users.viewer);
  const { signIn } = useAuthActions();
  return <p>Community events page</p>;
}
