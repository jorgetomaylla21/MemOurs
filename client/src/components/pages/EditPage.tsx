import React, { useEffect, useState } from "react";
import Editor from "../modules/EditorItems/Editor";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import JournalEntry from "../../../../shared/JournalEntry";

type Props = {
  userId?: string;
};
const TextEditor = (props: Props) => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<JournalEntry>();
  const fetchEntry = () => {
    get(`/api/entry`, { entryId: entryId }).then((entry: JournalEntry) => setEntry(entry));
  };
  useEffect(fetchEntry, []);

  if (!entry) {
    return <div> Sign in to view content </div>;
  }
  return <Editor userId={props.userId} entry={entry} entryId={entryId} />;
};

export default TextEditor;
