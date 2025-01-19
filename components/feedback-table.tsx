import React from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";

import { capitalizeFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function FeedbackTable({
  communityId,
  isDashboard,
}: {
  communityId: Id<"community">;
  isDashboard?: boolean;
}) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.feedback.list,

    {
      communityId: communityId,
    },
    { initialNumItems: 10 }
  );
  console.log("Feedback for a community", results);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isDashboard && isDashboard == true && (
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">
              Feedback
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage feedback from your community
            </p>
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
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Upvotes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map((feedback, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {feedback.from}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {feedback.type === "idea" && (
                          <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            {capitalizeFirstLetter(feedback.type)}
                          </span>
                        )}
                        {feedback.type === "compliment" && (
                          <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                            {capitalizeFirstLetter(feedback.type)}
                          </span>
                        )}
                        {feedback.type === "issue" && (
                          <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                            {capitalizeFirstLetter(feedback.type)}
                          </span>
                        )}
                        {feedback.type === "other" && (
                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/20">
                            {capitalizeFirstLetter(feedback.type)}
                          </span>
                        )}
                      </td>
                      <td className="max-w-sm truncate text-ellipsis px-3 py-4 text-sm text-gray-500">
                        {feedback.content}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {capitalizeFirstLetter(feedback.status)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {feedback.upvotes}
                      </td>
                      {isDashboard && isDashboard == true && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Button
                            variant={"ghost"}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                            <span className="sr-only">
                              , {feedback.content}
                            </span>
                          </Button>
                        </td>
                      )}
                      {!isDashboard && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Button
                            variant={"ghost"}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Upvote
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {results !== undefined && results.length == 0 && (
                <div className="flex w-full items-center justify-center p-4">
                  <p>No feedback yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end">
        <Button
          disabled={results == undefined || results.length == 0}
          variant={"outline"}
          className="mr-2 block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Previous
        </Button>
        <Button
          disabled={results == undefined || results.length == 0}
          variant={"outline"}
          className="block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
