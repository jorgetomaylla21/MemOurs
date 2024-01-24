import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import EmptyField from "./EmptyField";
import Tag from "./Tag";
import "./DropdownMenus.css";
import "./MultiSelect.css";

import { TagOption } from "./TagOption";
import MultipleTags from "./MultipleTags";

type Props = {
  allTagOptions: TagOption[];
  activatedTags: TagOption[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
};

const MultiSelect = (props: Props) => {
  const addOption = (option) => {
    props.setActivatedTags([...props.activatedTags, option]);
  };

  const optionIsSelected = (option: TagOption): boolean => {
    return props.activatedTags.reduce(
      (initialBool: boolean, selectedOption: TagOption) =>
        initialBool || selectedOption.name === option.name,
      false
    );
  };

  const anyTags = () => {
    return props.activatedTags.length !== 0;
  };

  return (
    <div className="w-full">
      <Listbox value={props.activatedTags} onChange={addOption}>
        <div className="relative w-full">
          <Listbox.Button className="w-full">
            <div className="multi-select-container">
              {anyTags() ? (
                <span className="display-multi-items">
                  <MultipleTags
                    tags={props.activatedTags}
                    setTags={props.setActivatedTags}
                    isActive={true}
                  />
                </span>
              ) : (
                <span className="flex justify-start text-start">
                  <EmptyField />
                </span>
              )}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="dropdown-list-container z-40">
              {props.allTagOptions.map((option, optionIdx) => (
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
                            <Tag
                              tag={option}
                              activatedTags={[]}
                              setActivatedTags={() => {}}
                              isActive={false}
                            />
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
