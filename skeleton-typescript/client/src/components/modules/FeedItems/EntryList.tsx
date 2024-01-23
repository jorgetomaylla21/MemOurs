import React from "react";
import DOMPurify from "dompurify";
import { TagOption } from "../EditorItems/TagOption";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import "./SingleEntry.css";
import JournalEntry from "../../../../../shared/JournalEntry";
import JournalEntryModel from "../../../../../server/models/JournalEntry";
import { SingleEntry } from "./SingleEntry";

const example: JournalEntry[] = [
  new JournalEntryModel({
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
    dateMentioned: new Date("1/2/22"),
    taggedPeople: [],
    createdAt: new Date("1/12/23"),
    tags: ["Life", "Entertainment", "Academics", "Romance", "Career", "Fun"],
    permissions: "Public",
  }),
  new JournalEntryModel({
    author: {
      _id: "1234",
      name: "Benjamin Soria",
    },
    title: "Boom badabing",
    content:
      "<p> Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological \
    order. I'm a misfit of course, what do you think I am huh?\
    This is why Messi is the goat. Neymar stinky hella. I hate his ass \
    awesome saucness i love my life woohooo</p>",
    dateMentioned: new Date("1/3/22"),
    taggedPeople: [],
    createdAt: new Date("1/11/23"),
    tags: ["Romance", "Career", "Fun"],
    permissions: "Public",
  }),
  new JournalEntryModel({
    author: {
      _id: "1234",
      name: "Jorginho Peru Paddington",
    },
    title: "Noteworthy technology acquisitions 2021",
    content:
      "<p> Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological \
    order. I'm a misfit of course, what do you think I am huh?\
    This is why Messi is the goat. Neymar stinky hella. I hate his ass \
    I agree with saul i hate this. come kiss me now you hot stuff </p>",
    dateMentioned: "1/1/22",
    taggedPeople: [],
    createdAt: "1/13/23",
    tags: ["Life", "Entertainment", "Academics", "Romance", "Career", "Fun"],
    permissions: "Public",
  }),
  new JournalEntryModel({
    author: {
      _id: "1234",
      name: "Gibby Wibby",
    },
    title: "Shibby Dibby",
    content:
      "<p> Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological \
    order. I'm a misfit of course, what do you think I am huh?\
    This is why Messi is the goat. Neymar stinky hella. I hate his ass \
    I agree with saul i hate this. come kiss me now you hot stuff \
    Ooompa loomp sheebadeeboo </p>",
    dateMentioned: "1/1/22",
    taggedPeople: [],
    createdAt: "1/13/23",
    tags: ["Life", "Entertainment", "Academics", "Romance", "Career", "Fun"],
    permissions: "Public",
  }),
];

export const EntryList = () => {
  // Sanitize the HTML content
  //   const sanitizedHtml = DOMPurify.sanitize(example.content);
  //   const tags = example.tags.map((name) => new TagOption(name));
  return (
    <div className="c-center bg-gray-100 dark:bg-slate-400">
      <section className="pt-2">
        {example
          // sort by date of event
          .sort(
            (a: JournalEntry, b: JournalEntry) =>
              a.dateMentioned.getDate() - b.dateMentioned.getDate()
          )
          .map((entry: JournalEntry) => (
            <ul className="pb-2">
              <SingleEntry entry={entry} />
            </ul>
          ))}
      </section>
    </div>
  );
};
