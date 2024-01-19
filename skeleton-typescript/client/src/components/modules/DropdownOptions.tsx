import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "./DropdownOptions.css";

type Option = {
  name: string;
};

type Props = {
  selected: Option;
  setSelected: React.Dispatch<React.SetStateAction<Option>>;
  allOptions: Array<Option>;
};

const DropdownOptions = (props: Props) => {
  return (
    <div className="w-28 mx-2">
      <Listbox value={props.selected} onChange={props.setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="option-container options-button">
            <span className="block truncate">{props.selected.name}</span>
            <span className="chevron-container">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="options-list-container">
              {props.allOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `option-in-dropdown ${active ? "selected-theme" : "text-gray-900"}`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="check-container">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropdownOptions;
