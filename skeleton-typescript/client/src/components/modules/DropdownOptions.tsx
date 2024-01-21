import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import "./DropdownMenus.css";
import "./Editor.css";

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
          <Listbox.Button className="dropdown-button-container config-button">
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
            <Listbox.Options className="dropdown-list-container">
              {props.allOptions.map((option: Option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `item-in-dropdown cursor-pointer pl-10 ${
                      active ? "selected-theme" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {() => {
                    const isSelected = option.name === props.selected.name;
                    return (
                      <>
                        <span
                          className={`block truncate ${isSelected ? "font-medium" : "font-normal"}`}
                        >
                          {option.name}
                        </span>
                        {isSelected ? (
                          <span className="check-container">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
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
