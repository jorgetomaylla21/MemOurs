import React from "react";
import DOMPurify from "dompurify";
import MultipleTags from "../EditorItems/MultipleTags";
import { TagOption } from "../EditorItems/TagOption";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import JournalEntry from "../../../../../shared/JournalEntry";
import { DocType } from "./ToggleView";
import { Link } from "react-router-dom";

export const NewEntryCard = () => {
  return (
    <div
      className="max-w-2xl shadow-lg 
    border-2 border-gray-200 hover:bg-gray-100
     rounded-lg bg-white p-4 flex justify-between group items-center"
    >
      <span className="text-2xl py-1 font-bold tracking-tight text-sky-800">New Entry</span>
      <Link
        to={"/new-entry"}
        className="h-15 w-15 transition ease-in-out delay-200 hover:scale-125 duration-200 hover:cursor-none"
      >
        <PlusCircleIcon className="text-sky-800 hover:text-sky-600 h-10 w-10" />
      </Link>
    </div>
  );
};
