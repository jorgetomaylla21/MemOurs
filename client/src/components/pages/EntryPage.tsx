import React, { useEffect, useState } from "react";
import { ReadOnly } from "../modules/EntryPageItems/ReadOnly";
import JournalEntry from "../../../../shared/JournalEntry";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

const EntryPage = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<JournalEntry>();
  const fetchEntry = () => {
    get(`/api/entry`, { entryId: entryId }).then((entry: JournalEntry) => setEntry(entry));
  };
  useEffect(fetchEntry, []);

  if (!entry) {
    return <div> Sign in to view content </div>;
  }
  return <ReadOnly entry={entry} />;
};

export default EntryPage;
