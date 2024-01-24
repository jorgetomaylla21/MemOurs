import React from "react";
import JournalEntry from "../../../../../shared/JournalEntry";
import { SingleEntry } from "../FeedItems/SingleEntry";

type Props = {
  entry?: JournalEntry;
};
export const ReadOnly = (props: Props) => {
  return (
    <section className="flex justify-center items-center">
      {props.entry ? <SingleEntry entry={props.entry} readOnly={true} /> : "Page does not exist"}
    </section>
  );
};
