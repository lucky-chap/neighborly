import React from "react";

import { Button } from "@/components/ui/button";

const events = [
  {
    eventName: "Community Meetup",
    location: "Central Park",
    attendees: 50,
    startDate: "2023-10-01",
    endDate: "2023-10-02",
    time: "10:00 AM - 4:00 PM",
    description: "A meetup for community members to network and share ideas.",
  },
  {
    eventName: "Tech Workshop",
    location: "Tech Hub",
    attendees: 30,
    startDate: "2023-10-05",
    endDate: null,
    time: "9:00 AM - 12:00 PM",
    description: "A workshop on the latest tech trends and tools.",
  },
  {
    eventName: "Charity Run",
    location: "City Stadium",
    attendees: 100,
    startDate: "2023-10-10",
    endDate: null,
    time: "7:00 AM - 11:00 AM",
    description: "A charity run to raise funds for local schools.",
  },
  {
    eventName: "Art Exhibition",
    location: "Art Gallery",
    attendees: 75,
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    time: "10:00 AM - 6:00 PM",
    description: "An exhibition showcasing local artists.",
  },
  {
    eventName: "Music Festival",
    location: "Downtown",
    attendees: 200,
    startDate: "2023-10-25",
    endDate: "2023-10-27",
    time: "12:00 PM - 10:00 PM",
    description: "A festival featuring live music from various genres.",
  },
];

export default function EventsTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Events
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage events for your community
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add new event
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Event Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Attendees
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      End Date
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time
                    </th> */}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {event.eventName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.attendees}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.startDate}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.endDate ? event.endDate : "N/A"}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.time}
                      </td> */}
                      <td className="max-w-sm truncate text-ellipsis px-3 py-4 text-sm text-gray-500">
                        {event.description}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Button
                          variant={"ghost"}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                          <span className="sr-only">, {event.eventName}</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end">
        <Button
          variant={"outline"}
          className="mr-2 block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          className="block rounded-md px-3 py-2 text-center text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
