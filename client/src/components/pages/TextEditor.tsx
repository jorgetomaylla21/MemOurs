import React from "react";
import Editor from "../modules/EditorItems/Editor";

type Props = {
  userId?: string;
};
const TextEditor = (props: Props) => {
  return <Editor userId={props.userId} />;
};

export default TextEditor;
