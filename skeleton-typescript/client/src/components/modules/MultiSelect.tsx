import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import "./DropdownMenus.css";
import "./MultiSelect.css";
import ActiveTags from "./ActiveTags";
import Tag from "./Tag";

const allOptions = [
  { name: "Fun", color: "amber" },
  { name: "Life", color: "green" },
  { name: "Entertainment", color: "orange" },
  { name: "Romance", color: "red" },
  { name: "Career", color: "blue" },
  { name: "Academics", color: "purple" },
];

type Tag = {
  name: string;
  color: string;
};

const MultiSelect = () => {
  const tags: Array<Tag> = [];
  const [selected, setSelected] = useState(tags);

  const addOption = (option) => {
    setSelected([...selected, option]);
  };

  const optionIsSelected = (option: Tag): boolean => {
    return selected.reduce(
      (initialBool: boolean, selectedOption: Tag) =>
        initialBool || selectedOption.name === option.name,
      false
    );
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={addOption}>
        <div className="relative w-full">
          <Listbox.Button className="w-full">
            <div className="multi-select-container">
              <span className="display-multi-items">
                <ActiveTags />
              </span>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="dropdown-list-container z-40">
              {allOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) => `${active ? "bg-slate-100" : ""}`}
                  value={option}
                >
                  {() => {
                    const isSelected = optionIsSelected(option);
                    return (
                      <>
                        {isSelected ? null : (
                          <div className="item-in-dropdown pl-4">
                            <Tag name={option.name} color={option.color} isActive={false} />
                          </div>
                        )}
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

export default MultiSelect;
