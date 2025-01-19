"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InvitePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [occupation, setOccupation] = useState("");
  const { signIn } = useAuthActions();
  const pathname = usePathname();
  const community = useQuery(api.community.findOne, {
    id: pathname.split("/")[2] as Id<"community">,
  });
  const currentUser = useQuery(api.users.viewer);
  const sender = useQuery(api.users.getUser, {
    id: community?.leader as Id<"users">,
  });
  const member = useQuery(api.member.findOne, {
    email: currentUser?.email as string,
    communityId: community?._id as Id<"community">,
  });

  const addNewMemberToCommunity = useMutation(api.member.add);

  const handleAddNewMember = async () => {
    setLoading(true);
    try {
      const memberId = await addNewMemberToCommunity({
        communityId: community?._id as Id<"community">,
        name: currentUser?.name,
        email: currentUser?.email as string,
        phone: currentUser?.phone,
        image: currentUser?.image,
        role: "member",
        occupation: occupation,
      });
      if (memberId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "You have been added to the community.",
          description: "Redirecting to page",
        });
        router.push(`/community/${community?._id}`);
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your community was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Project creation failed.",
        });
      }
    }
  };

  console.log("Is user a member?: ", member);

  return (
    <div className="grid min-h-screen place-content-center">
      {community == undefined ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="mx-auto flex w-full max-w-sm flex-col items-center rounded-md border border-zinc-100 p-10 text-center shadow-sm shadow-zinc-300">
          <img
            src={community?.logoUrl}
            alt="community logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="my-3 text-zinc-700">
            <span className="font-bold">{sender?.name ?? "Someone"}</span> has
            invited you to join{" "}
            <span className="font-bold">{community?.name}</span> on Neighborly.
          </p>
          <Authenticated>
            {/* {currentUser?._id === community?.leader && (
              <Link href={`/dashboard`} className="w-full">
                <Button className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Dashboard
                </Button>
              </Link>
            )} */}

            {member === null ? (
              <div className="flex w-full flex-col">
                <div className="mb-2 flex flex-col items-start">
                  <Label className="mb-1">Occupation</Label>
                  <Input
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </div>
                <Button
                  disabled={
                    member === undefined || loading || occupation === ""
                  }
                  onClick={handleAddNewMember}
                  className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Adding you to the community..." : "Accept invite"}
                </Button>
              </div>
            ) : (
              <Link href={`/community/${community?._id}`} className="w-full">
                <Button
                  disabled={member === undefined}
                  className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Visit community
                </Button>
              </Link>
            )}
          </Authenticated>
          <Unauthenticated>
            <Button
              onClick={() =>
                void signIn("github", {
                  redirectTo: `/invite/${community._id}`,
                })
              }
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in to Accept
            </Button>
          </Unauthenticated>
        </div>
      )}
    </div>
  );
}
