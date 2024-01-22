import React from "react";
import Tag from "./Tag";
import "./Tag.css";

import { TagOption } from "./TagOption";

type Props = {
  activatedTags: TagOption[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
};

const ActiveTags = (props: Props) => {
  return (
    <span>
      {props.activatedTags.map((option, i) => (
        <Tag
          key={i}
          tag={option}
          isActive={true}
          activatedTags={props.activatedTags}
          setActivatedTags={props.setActivatedTags}
        />
      ))}
    </span>
  );
};

export default ActiveTags;
