import React, { useState, useEffect } from "react";
import JournalEntry from "../../../../../shared/JournalEntry";
import { SingleEntry } from "./SingleEntry";
import { DocType } from "./ToggleView";
import { get } from "../../../utilities";
import "./SingleEntry.css";
import { NewEntryCard } from "./NewEntryCard";
import { socket } from "../../../client-socket";

type Props = {
  userId?: string;
  docType: DocType;
};

export const EntryList = (props: Props) => {
  const [activeFeed, setActiveFeed] = useState({
    user: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const loadEntries = () => {
    get("/api/journal", { permissions: props.docType }).then((entries: JournalEntry[]) => {
      setActiveFeed({
        user: props.userId,
        entries: entries,
      });
    });
  };

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    const callback = () => {
      loadEntries();
    };
    socket.on("journalEntries", callback);
    return () => {
      socket.off("journalEntries", callback);
    };
  }, []);

  return (
    <div className="c-center">
      <section className="mt-2">
        <ul className="mb-2">
          <NewEntryCard />
        </ul>
        {activeFeed.entries
          // sort by date of event
          .sort(
            (a: JournalEntry, b: JournalEntry) =>
              new Date(b.dateMentioned).getTime() - new Date(a.dateMentioned).getTime()
          )
          .map((entry: JournalEntry, key) => (
            <ul className="mb-2">
              <SingleEntry key={key} entry={entry} userId={props.userId} readOnly={false} />
            </ul>
          ))}
      </section>
    </div>
  );
};
