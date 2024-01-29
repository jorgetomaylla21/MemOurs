import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { post } from "../../../utilities";
import { MessageOverlay } from "../EditorItems/MessageOverlay";

type Props = {
  entryId: string;
  authorId: string;
  userId?: string;
};
export const EntrySettings = (props: Props) => {
  const [warning, setWarning] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);

  const warningMessage = {
    header: "Not your post",
    details: "Cannot delete somebody else's posts.",
  };

  const deleteMessage = {
    header: "Delete!",
    details: "Your journal was succefully deleted.",
  };

  const handleDelete = () => {
    if (props.userId !== props.authorId) {
      setWarning(true);
    } else {
      // save to database
      post("/api/delete-journal", {
        entryId: props.entryId,
      }).then(() => {
        setDeleteDisplay(true);
      });
      setDeleteDisplay(false);
    }
  };

  return (
    <div className="invisible group-hover:visible">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <EllipsisHorizontalIcon
              className="h-8 w-8 text-gray-700 hover:bg-slate-300 rounded-full p-1"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {warning ? (
        <MessageOverlay
          open={warning}
          setOpen={setWarning}
          message={warningMessage}
          isWarning={true}
        />
      ) : null}
      {/* Show saved overlay */}
      {deleteDisplay ? (
        <MessageOverlay
          open={deleteDisplay}
          setOpen={setDeleteDisplay}
          message={deleteMessage}
          isWarning={false}
        />
      ) : null}
    </div>
  );
};
