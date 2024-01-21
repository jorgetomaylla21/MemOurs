import React from "react";
import Tag from "./Tag";

// type Props = {
//   selected: Array<Option>;
//   setSelected: React.Dispatch<React.SetStateAction<Option>>;
//   allOptions: Array<Option>;
// };
const allOptions = [
  { name: "Fun", color: "amber" },
  { name: "Life", color: "green" },
  { name: "Entertainment", color: "orange" },
  { name: "Romance", color: "red" },
  { name: "Career", color: "blue" },
  // { name: "Academics", color: "purple" },
];

const ActiveTags = () => {
  //   const [selected, setSelected] = useState([]);
  return (
    <span>
      {allOptions.map((option) => (
        <Tag name={option.name} color={option.color} />
      ))}
    </span>
  );
};

export default ActiveTags;
