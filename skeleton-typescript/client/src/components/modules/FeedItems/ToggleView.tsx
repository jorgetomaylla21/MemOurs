import React from "react";
import { Tabs } from "flowbite-react";
import { HiDocument, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export const ToggleView = () => {
  return (
    <Tabs aria-label="Tabs with underline" style="underline">
      <Tabs.Item
        active
        title="Public"
        icon={HiOutlineUsers}
        className="focus:outline-none border-0"
      >
        This is <span className="font-medium text-gray-800">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
        swaps classes to control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Private" icon={HiOutlineUser}>
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Dashboard tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the next. The tab
        JavaScript swaps classes to control the content visibility and styling.
      </Tabs.Item>
      <Tabs.Item title="Drafts" icon={HiDocument}>
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Settings tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the next. The tab
        JavaScript swaps classes to control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
  );
};
