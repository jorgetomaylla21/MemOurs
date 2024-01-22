import React from "react";

import DOMPurify from "dompurify";
import { Card } from "flowbite-react";

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
  tags: ["Life", "Entertainment"],
  permissions: "Public",
};

export const SingleEntry = () => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(example.content);
  return (
    <Card href="#" className="max-w-lg shadow-lg border-2 p-2 border-gray-200 group">
      <h5 className="text-2xl py-2 font-bold tracking-tight text-gray-900 dark:text-white border-b-2 border-slate-300">
        {example.title}
      </h5>
      <section className="border-b-2 border-slate-100 py-2 h-full">
        <div
          className="font-normal text-pretty text-gray-700 dark:text-gray-400 line-clamp-10"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </section>
      <nav className="flex justify-start">
        <div className="bg-green-500 m-2 text-sm p-2 w-auto rounded-md text-white text-center group-hover:text-gray-200">
          {example.permissions}
        </div>
        <div className="bg-green-500 m-2 text-sm p-2 w-auto rounded-md text-white text-center group-hover:text-gray-200">
          {example.permissions}
        </div>
      </nav>
    </Card>
  );
};
