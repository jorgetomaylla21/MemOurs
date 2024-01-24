import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import "./MessageOverlay.css";

export type Message = {
  header: string;
  details: string;
};

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message;
  isWarning: boolean;
};

export const MessageOverlay = (props: Props) => {
  const cancelButtonRef = useRef(null);
  const iconColor = props.isWarning
    ? "bg-red-600 hover:bg-red-500"
    : "bg-green-600 hover:bg-green-500";

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="dialogue-panel">
                <div className="message-container">
                  <div className="sm:flex sm:items-start">
                    {/* warning or saved icon */}
                    {props.isWarning ? (
                      <div className="icon-container bg-red-100">
                        <ExclamationTriangleIcon
                          className="icon-size text-red-600"
                          aria-hidden="true"
                        />{" "}
                      </div>
                    ) : (
                      <div className="icon-container bg-green-100">
                        <DocumentCheckIcon
                          className="icon-size text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="message-header-container">
                      <Dialog.Title as="h3" className="message-header">
                        {props.message.header}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="message-details">{props.message.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottom-nav-container">
                  <button
                    type="button"
                    className={`ok-button ${iconColor}`}
                    onClick={() => props.setOpen(false)}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
