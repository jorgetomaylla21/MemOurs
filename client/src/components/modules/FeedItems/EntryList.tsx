import React, { useState, useEffect } from "react";
import JournalEntry from "../../../../../shared/JournalEntry";
import { SingleEntry } from "./SingleEntry";
import { DocType } from "./ToggleView";
import { get } from "../../../utilities";
import "./SingleEntry.css";

type Props = {
  userId?: string;
  docType: DocType;
};

export const EntryList = (props: Props) => {
  const [activeFeed, setActiveFeed] = useState({
    recipient: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const loadEntries = () => {
    get("/api/journal", { permissions: props.docType }).then((entries: JournalEntry[]) => {
      setActiveFeed({
        recipient: props.userId,
        entries: entries,
      });
    });
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className="c-center">
      <section className="mt-2">
        {activeFeed.entries
          // sort by date of event
          .sort(
            (a: JournalEntry, b: JournalEntry) =>
              new Date(a.dateMentioned).getDate() - new Date(b.dateMentioned).getDate()
          )
          .map((entry: JournalEntry, key) => (
            <ul className="mb-2">
              <SingleEntry key={key} entry={entry} readOnly={false} />
            </ul>
          ))}
      </section>
    </div>
  );
};
