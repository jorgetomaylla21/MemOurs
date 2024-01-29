import React, { useState, useEffect } from "react";
import { Tabs } from "flowbite-react";
import { HiDocument, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import { EntryList } from "./EntryList";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";

const DashboardTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    styles: {
      underline: "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:outline-none",
      styles: {
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-sky-900 rounded-t-lg border-b-2 border-sky-900 active dark:text-sky-800 dark:border-sky-800",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
          },
        },
      },
      icon: "mr-2 h-5 w-5",
    },
  },
  tabitemcontainer: {
    base: "",
    styles: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: "",
    },
  },
  tabpanel: "py-3",
};

type Props = {
  userId?: string;
};
export enum DocType {
  Draft = "Draft",
  Public = "Public",
  Private = "Private",
}
export const ToggleView = (props: Props) => {
  return (
    <div className="p-2 w-full relative">
      <Tabs aria-label="Tabs with underline" theme={DashboardTheme} style="underline">
        <Tabs.Item active title={DocType.Public} icon={HiOutlineUsers}>
          <EntryList userId={props.userId} docType={DocType.Public} />
        </Tabs.Item>
        <Tabs.Item title="Private" icon={HiOutlineUser}>
          <EntryList userId={props.userId} docType={DocType.Private} />
        </Tabs.Item>
        <Tabs.Item title="Drafts" icon={HiDocument}>
          <EntryList userId={props.userId} docType={DocType.Draft} />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
