"use client";

import "react-tabs/style/react-tabs.css";

import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { usePathname } from "next/navigation";

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabIndex = ["top", "best", "new"].indexOf(pathname.slice(1));

  return (
    <div>
      <Tabs selectedIndex={tabIndex}>
        <TabList className="flex mb-4 border-b">
          <Tab className="px-4 py-2 cursor-pointer">
            <Link href="/top" className="text-gray-700 hover:text-orange-500">
              Top
            </Link>
          </Tab>
          <Tab className="px-4 py-2 cursor-pointer">
            <Link href="/best" className="text-gray-700 hover:text-orange-500">
              Best
            </Link>
          </Tab>
          <Tab className="px-4 py-2 cursor-pointer">
            <Link href="/new" className="text-gray-700 hover:text-orange-500">
              New
            </Link>
          </Tab>
        </TabList>

        <TabPanel>{children}</TabPanel>
        <TabPanel>{children}</TabPanel>
        <TabPanel>{children}</TabPanel>
      </Tabs>
    </div>
  );
}
