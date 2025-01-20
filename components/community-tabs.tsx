"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function CommunityTabs() {
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];
  const currentPath = pathname.split("/")[3];
  const tabs = [
    // { name: "About", href: "", current: false },
    {
      name: "Members",
      href: "/",
      count: null,
      current: currentPath === undefined ? true : false,
    },
    {
      name: "Feedback",
      href: "/feedback",
      count: null,
      current: currentPath === "feedback" ? true : false,
    },
    // {
    //   name: "Events",
    //   href: "/events",
    //   count: null,
    //   current: currentPath === "events" ? true : false,
    // },
  ];
  console.log("Current path: ", currentPath);
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find((tab) => tab.current)?.name || ""}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={`/community/${communityId}${tab.href}`}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                  "flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                )}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.current
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-900",
                      "ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block",
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
