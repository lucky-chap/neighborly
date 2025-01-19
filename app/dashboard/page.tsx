"use client";

import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery, useQuery } from "convex/react";
import {
  ArrowUpRight,
  Files,
  FileText,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { CreateCommunityDialog } from "@/components/create-dialog";
import EventsTable from "@/components/events-table";
import FeedbackTable from "@/components/feedback-table";
import MembersTable from "@/components/members-table";

export default function Dashboard() {
  const user = useQuery(api.users.viewer);
  const community = useQuery(api.community.find, {
    userId: user?._id as Id<"users">,
  });

  const member = useQuery(api.member.check, {
    email: user?.email as string,
  });

  console.log("User's community", community);

  console.log("Is user a member of any community", member);

  // const { results, status, loadMore } = usePaginatedQuery(
  //   api.member.list,
  //   {
  //     communityId: community[0]?._id as Id<"community">,
  //   },
  //   { initialNumItems: 10 }
  // );
  // console.log("Members in community", results);

  return (
    <>
      {community == undefined ? (
        <div className="grid min-h-[60vh] w-full place-content-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {member === null && community.length === 0 && (
            <div className="grid min-h-[60vh] w-full place-content-center">
              <EmptyState
                title="No Community Created"
                description="You can create a new community to manage"
                icons={[FileText, LinkIcon, Files]}
                className="w-full"
                // action={{
                //   label: "Create new community",
                //   onClick: () => console.log("Create community clicked"),
                // }}
                trigger={<CreateCommunityDialog />}
              />
            </div>
          )}

          {community.length === 0 && member !== null && (
            <div className="grid min-h-[60vh] w-full place-content-center">
              <EmptyState
                title="View community"
                description="View the community you are a member of"
                icons={[FileText, LinkIcon, Files]}
                className="w-full"
                // action={{
                //   label: "Create new community",
                //   onClick: () => console.log("Create community clicked"),
                // }}
                trigger={
                  <Link
                    href={`/community/${member?.communityId}`}
                    className="mt-2 w-full"
                  >
                    <Button variant={"outline"} className="mt-2 w-full">
                      View Community
                      <ArrowUpRight className="ml-2 h-7 w-7" />
                    </Button>
                  </Link>
                }
              />
            </div>
          )}

          {community.length > 0 && (
            <div className="mx-auto my-20 max-w-6xl">
              <div className="mb-20 px-9">
                <Link href={`/community/${community[0]._id}`}>
                  <Button>
                    View Community
                    <ArrowUpRight className="ml-2 h-7 w-7" />
                  </Button>
                </Link>
              </div>
              <div className="mb-20">
                <MembersTable
                  // members={results}
                  isDashboard={true}
                  communityId={community[0]._id}
                />
              </div>
              <div className="mb-20">
                <FeedbackTable
                  isDashboard={true}
                  communityId={community[0]._id}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
