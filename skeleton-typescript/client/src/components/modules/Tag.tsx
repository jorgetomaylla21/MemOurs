import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import "./Tag.css";

type Option = {
  name: string;
};

// type Props = {
//   selected: Array<Option>;
//   setSelected: React.Dispatch<React.SetStateAction<Option>>;
//   allOptions: Array<Option>;
// };
const allOptions = [
  { name: "Fun" },
  { name: "Life" },
  { name: "Entertainment" },
  { name: "Romance" },
  { name: "Career" },
  { name: "Academics" },
];

const classFromColor = new Map([
  ["amber", "bg-amber-50 text-amber-700 ring-amber-700/10"],
  ["green", "bg-green-50 text-green-700 ring-green-700/10"],
  ["orange", "bg-orange-50 text-orange-700 ring-orange-700/10"],
  ["red", "bg-red-50 text-red-700 ring-red-700/10"],
  ["blue", "bg-blue-50 text-blue-700 ring-blue-700/10"],
  ["purple", "bg-purple-50 text-purple-700 ring-purple-700/10"],
]);

type Props = {
  name: string;
  color: string;
  isActive: boolean;
};

const Tag = (props: Props) => {
  return (
    <span className={`tag-container ${classFromColor.get(props.color)}`}>
      {props.name}
      {props.isActive ? (
        <button className="x-mark-container">
          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </span>
  );
};

export default Tag;
