import React, { useState, ChangeEvent } from "react";
import "./Editor.css";

interface TextEditorProps {
  initialText?: string;
}

const Editor: React.FC<TextEditorProps> = ({ initialText = "" }) => {
  const [text, setText] = useState<string>(initialText);
  const [title, setTitle] = useState<string>(initialText);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="editor-bg">
      <div className="u-center">
        <textarea
          className="vanilla-editor title-editor"
          value={title}
          onChange={handleTitleChange}
          rows={10}
          cols={30}
          placeholder="Title..."
        />
      </div>
      {/* TO-DO: add input methods for fields */}
      {/* TO-DO: make fields a component Field that takes name, value */}
      {/* TO-DO: incorporate a toggle for Field activated and not */}
      <div className="u-center">
        <div className="field-container pt-2">
          <div className="field-shape field-name">Created</div>
          <div className="field-shape field-value-activated">04/29/2002</div>
        </div>
      </div>
      <div className="u-center">
        <div className="field-container">
          <div className="field-shape field-name">Tags</div>
          <div className="field-shape field-value">Empty</div>
        </div>
      </div>
      <div className="u-center">
        <textarea
          className="vanilla-editor body-editor"
          value={text}
          onChange={handleTextChange}
          rows={10}
          cols={30}
          placeholder="Write your thoughts here.."
        />
      </div>
      <div className="u-center">
        <div className="options-container">
          {/* TO-DO: add onClick that posts data to server */}
          <button className="save-button">Save</button>
        </div>
      </div>
      <div>
        <strong>Preview:</strong>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default Editor;
