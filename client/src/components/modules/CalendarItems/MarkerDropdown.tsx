import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import JournalEntry from "../../../../../shared/JournalEntry";
import { Link } from "react-router-dom";

type Props = {
  date: string;
  entries: JournalEntry[];
};
export const MarkerDropdown = (props: Props) => {
  return (
    <div className="h-full w-full">
      <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="">
            <p
              className="w-64 text-black shadow-lg bg-slate-100 hover:bg-slate-300 rounded-md p-1 items-center flex justify-center"
              aria-hidden="true"
            >
              {`Memories from ${props.date}`}
            </p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-ellipsis overflow-hidden">
            <div className="px-1 py-1">
              {props.entries.map((entry: JournalEntry) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={`/entry/${entry._id}`}
                        className={`${
                          active ? "bg-slate-600 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {entry.title}
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
