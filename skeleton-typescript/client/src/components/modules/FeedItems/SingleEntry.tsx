import React from "react";

import DOMPurify from "dompurify";
import MultipleTags from "../EditorItems/MultipleTags";
import { Card } from "flowbite-react";
import { TagOption } from "../EditorItems/TagOption";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const example = {
  author: {
    _id: "1234",
    name: "Saul Vega Sauceda",
  },
  title: "Noteworthy technology acquisitions 2021",
  content:
    "<p> Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological \
    order. I'm a misfit of course, what do you think I am huh?\
    This is why Messi is the goat. Neymar stinky hella. I hate his ass \
    </p>",
  dateMentioned: "1/2/22",
  taggedPeople: [],
  createdAt: "1/12/23",
  tags: ["Life", "Entertainment", "Academics", "Romance", "Career", "Fun"],
  permissions: "Public",
};

export const SingleEntry = () => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(example.content);
  const tags = example.tags.map((name) => new TagOption(name));
  return (
    <Card className="max-w-2xl max-h-md shadow-lg border-2 p-2 border-gray-200 hover:bg-gray-100 group">
      <h5 className="text-2xl py-2 font-bold tracking-tight text-gray-900 border-b-2 border-slate-300">
        {example.title}
      </h5>
      <section className="border-b-2 border-slate-100 h-full">
        <ul className="text-gray-500 text-sm py-2">Date: {example.dateMentioned}</ul>
        <div
          className="font-normal text-pretty text-gray-700 line-clamp-10"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </section>
      <nav className="flex justify-between items-center">
        <section className="flex justify-start items-center">
          <span className="bg-green-500 m-2 text-sm rounded-md text-white text-center group-hover:text-gray-200">
            <p className="p-2 text-center">{example.permissions}</p>
          </span>
          <div className="flex justify-start items-center ml-4">
            <MultipleTags tags={tags} setTags={() => {}} isActive={false} />
          </div>
        </section>
        <button className="group-hover:text-gray-700 group-hover:bg-slate-200 p-2 rounded-md invisible group-hover:visible inline-flex">
          <span className="text-sm">Read</span>
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </Card>
  );
};
