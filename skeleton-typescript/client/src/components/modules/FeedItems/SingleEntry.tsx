import React from "react";
import DOMPurify from "dompurify";
import MultipleTags from "../EditorItems/MultipleTags";
import { Card } from "flowbite-react";
import { TagOption } from "../EditorItems/TagOption";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import "./SingleEntry.css";
import JournalEntry from "../../../../../shared/JournalEntry";

// const example = {
//   author: {
//     _id: "1234",
//     name: "Saul Vega Sauceda",
//   },
//   title: "Noteworthy technology acquisitions 2021",
//   content:
//     "<p> Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological \
//     order. I'm a misfit of course, what do you think I am huh?\
//     This is why Messi is the goat. Neymar stinky hella. I hate his ass \
//     </p>",
//   dateMentioned: "1/2/22",
//   taggedPeople: [],
//   createdAt: "1/12/23",
//   tags: ["Life", "Entertainment", "Academics", "Romance", "Career", "Fun"],
//   permissions: "Public",
// };

type Props = {
  entry: JournalEntry;
};

export const SingleEntry = (props: Props) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(props.entry.content);
  const tags = props.entry.tags.map((name) => new TagOption(name));
  return (
    <Card className="card-container group">
      <h5 className="card-title">{props.entry.title}</h5>
      <h3 className="card-author"> By: {props.entry.author.name} </h3>
      <section className="content-container">
        <ul className="date-text">Date: {props.entry.dateMentioned.toLocaleDateString()}</ul>
        <div className="content-format" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </section>
      <nav className="c-between">
        <section className="c-start">
          <span className="permission-container">
            <p className="p-2 text-center">{props.entry.permissions}</p>
          </span>
          <div className="u-start ml-4">
            <MultipleTags tags={tags} setTags={() => {}} isActive={false} />
          </div>
        </section>
        <button className="read-button">
          <span className="text-sm mr-2">Read</span>
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </nav>
    </Card>
  );
};
