import React from "react";
import Tag from "./Tag";
import "./Tag.css";

import { TagOption } from "./TagOption";

type Props = {
  tags: TagOption[];
  setTags: React.Dispatch<React.SetStateAction<TagOption[]>>;
  isActive: boolean;
};

const MultipleTags = (props: Props) => {
  return (
    <span>
      {props.tags.map((option, i) => (
        <Tag
          key={i}
          tag={option}
          isActive={props.isActive}
          activatedTags={props.tags}
          setActivatedTags={props.setTags}
        />
      ))}
    </span>
  );
};

export default MultipleTags;
