"use client";

import React from "react";
import Link from "next/link";
import { Bell, HelpCircle, Home, House, Settings, Shield } from "lucide-react";

import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { ProfileMenu } from "@/components/profile-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white bg-white/30 p-2 backdrop-blur-md">
        <Link href={"/dashboard"} className="flex items-center">
          <House className="mr-1 h-5 w-5" />
          <h1 className="text-sm font-medium">Neighborly</h1>
        </Link>
        <ul>
          <li>
            <ProfileMenu />
          </li>
        </ul>
      </header>
      {children}
    </section>
  );
}
