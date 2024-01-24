import React from "react";
import DOMPurify from "dompurify";
import MultipleTags from "../EditorItems/MultipleTags";
import { Card } from "flowbite-react";
import { TagOption } from "../EditorItems/TagOption";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { DocType } from "./ToggleView";
import { Link } from "react-router-dom";
import JournalEntry from "../../../../../shared/JournalEntry";

import "./SingleEntry.css";

const permisssionToColor = new Map<string, string>([
  ["Public", "bg-green-500"],
  ["Private", "bg-blue-700"],
  ["Draft", "bg-red-700"],
]);

type Props = {
  entry: JournalEntry;
  readOnly: boolean;
};

export const SingleEntry = (props: Props) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(props.entry.content);
  const tags = props.entry.tags.map((name) => new TagOption(name));
  const date = new Date(props.entry.dateMentioned).toLocaleDateString();
  const permissionColor = permisssionToColor.get(props.entry.permissions);

  return (
    <Card className="card-container group">
      <h5 className="card-title">{props.entry.title}</h5>
      <h3 className="card-author"> By: {props.entry.author.name} </h3>
      <section className="content-container">
        <ul className="date-text">Date: {date}</ul>
        <div className="content-format" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </section>
      <nav className="c-between">
        <section className="c-start">
          <span className={`permission-container ${permissionColor}`}>
            <p className="p-2 text-center">{props.entry.permissions}</p>
          </span>
          <div className="u-start ml-4">
            <MultipleTags tags={tags} setTags={() => {}} isActive={false} />
          </div>
        </section>
        {props.readOnly ? null : (
          <Link to={`/entry/${props.entry._id}`}>
            <div className="read-button">
              <span className="text-sm mr-2">
                {props.entry.permissions === DocType.Draft ? "Edit" : "Read"}
              </span>
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </Link>
        )}
      </nav>
    </Card>
  );
};
