import React from "react";
import DOMPurify from "dompurify";
import MultipleTags from "../EditorItems/MultipleTags";
import { TagOption } from "../EditorItems/TagOption";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import JournalEntry from "../../../../../shared/JournalEntry";
import { DocType } from "./ToggleView";
import { Link } from "react-router-dom";
import { EntrySettings } from "./EntrySettings";

const permisssionToColor = new Map<string, string>([
  ["Public", "bg-green-500"],
  ["Private", "bg-blue-700"],
  ["Draft", "bg-slate-500"],
]);

type Props = {
  entry: JournalEntry;
  readOnly: boolean;
  userId?: string;
};

export const SingleEntry = (props: Props) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(props.entry.content);
  const tags = props.entry.tags.map((name) => new TagOption(name));
  const date = new Date(props.entry.dateMentioned).toLocaleDateString();
  const permissionColor = permisssionToColor.get(props.entry.permissions);
  const contentFormat = props.readOnly ? "" : "line-clamp-3 hover:line-clamp-6";
  const isDraft = props.entry.permissions === DocType.Draft;

  let routeToSend;
  if (isDraft) {
    routeToSend = {
      linkPrefix: `/edit/${props.entry._id}`,
      button: "Edit",
    };
  } else {
    routeToSend = {
      linkPrefix: `/entry/${props.entry._id}`,
      button: "Read",
    };
  }

  return (
    <div className="card-container group">
      <div className="flex justify-between">
        <h5 className="card-title">{props.entry.title}</h5>
        <EntrySettings
          entryId={props.entry._id}
          authorId={props.entry.author._id}
          userId={props.userId}
        />
      </div>

      <h3 className="card-author"> By: {props.entry.author.name} </h3>
      <section className="content-container">
        <ul className="date-text">Date: {date}</ul>
        <div
          className={`content-format ${contentFormat}`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </section>
      <nav className="c-between mt-2">
        <section className="c-start">
          <span className={`permission-container ${permissionColor}`}>
            <p className="p-2 text-center">{props.entry.permissions}</p>
          </span>
          <div className="u-start ml-4">
            <MultipleTags tags={tags} setTags={() => {}} isActive={false} />
          </div>
        </section>
        {props.readOnly ? null : (
          <Link to={`${routeToSend.linkPrefix}`}>
            <div className="read-button">
              <span className="text-sm mr-2">{routeToSend.button}</span>
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
};
