import React from "react";
import Tag from "./Tag";
import { TagObj } from "./Tag";
import "./Tag.css";

type Props = {
  activatedTags: TagObj[];
  setActivatedTags: React.Dispatch<React.SetStateAction<TagObj[]>>;
};

const ActiveTags = (props: Props) => {
  return (
    <span>
      {props.activatedTags.map((option, i) => (
        <Tag
          key={i}
          name={option.name}
          color={option.color}
          isActive={true}
          activatedTags={props.activatedTags}
          setActivatedTags={props.setActivatedTags}
        />
      ))}
    </span>
  );
};

export default ActiveTags;
