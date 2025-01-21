"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery, useQuery } from "convex/react";

import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import InviteDialog from "./invite-dialog";

type Member = {
  _id: Id<"member">;
  _creationTime: number;
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  image?: string | undefined;
  role?: string | undefined;
  occupation?: string | undefined;
  communityId: Id<"community">;
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "http://localhost:3000";
export default function MembersTable({
  communityId,
  // communityName,
  isDashboard,
  // members,
}: {
  communityId: Id<"community">;
  // communityName: string;
  isDashboard?: boolean;
  // members: Member[];
}) {
  const user = useQuery(api.users.viewer);
  const { results, status, loadMore } = usePaginatedQuery(
    api.member.list,
    {
      communityId,
    },
    { initialNumItems: 50 },
  );
  // console.log("Members in community", results);

  const community = useQuery(api.community.findOne, {
    id: communityId,
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isDashboard && isDashboard == true && (
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">
              Members
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage members of your community
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <InviteDialog
              communityName={community?.name as string}
              invitedByEmail={user?.email as string}
              invitedByUsername={user?.name as string}
              inviteLink={`${APP_URL}/invite/${communityId}`}
            />
          </div>
        </div>
      )}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-2">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Occupation
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map((member) => (
                    <tr key={member.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {member.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {member.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {capitalizeFirstLetter(member.occupation as string)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {capitalizeFirstLetter(member.role as string)}
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Button
                          variant={"ghost"}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {member.name}</span>
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              {results !== undefined && results.length == 0 && (
                <div className="flex w-full items-center justify-center p-4">
                  <p>No results yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end">
        <Button
          disabled={
            results == undefined ||
            results.length == 0 ||
            status === "Exhausted"
          }
          variant={"outline"}
          className="mr-2 block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Previous
        </Button>
        <Button
          disabled={
            results == undefined ||
            results.length == 0 ||
            status === "Exhausted"
          }
          variant={"outline"}
          className="block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
