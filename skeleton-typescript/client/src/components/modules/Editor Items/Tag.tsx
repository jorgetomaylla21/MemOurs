import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import "./Tag.css";

import { TagOption } from "./TagOption";

type Props = {
  tag: TagOption;
  activatedTags: TagOption[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
  isActive: boolean;
};

const Tag = (props: Props) => {
  const removeTag = () => {
    props.setActivatedTags(
      props.activatedTags.filter((tag: TagOption) => tag.name !== props.tag.name)
    );
    console.log(props.activatedTags);
  };
  return (
    <span className={`tag-container ${props.tag.color}`}>
      {props.tag.name}
      {props.isActive ? (
        <button className="x-mark-container z-45" onClick={removeTag}>
          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
};

export default Tag;
