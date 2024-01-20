import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import DropdownOptions from "./DropdownOptions";

interface TextEditorProps {
  initialText?: string;
}

const Editor: React.FC<TextEditorProps> = ({ initialText = "" }) => {
  const permissions = [{ name: "Draft" }, { name: "Private" }, { name: "Public" }];
  const [title, setTitle] = useState<string>(initialText);
  const [editorHtml, setEditorHtml] = useState("");
  const [currentPermission, setPermissions] = useState(permissions[0]);

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div className="editor-bg">
      <section className="u-center">
        <textarea
          className="vanilla-editor title-editor"
          value={title}
          onChange={handleTitleChange}
          rows={10}
          cols={30}
          placeholder="Title..."
        />
      </section>
      {/* TO-DO: add input methods for fields */}
      {/* TO-DO: make fields a component Field that takes name, value */}
      {/* TO-DO: incorporate a toggle for Field activated and not */}
      <ul className="u-center">
        <div className="field-container pt-2 rounded-t-lg">
          <div className="field-shape field-name">Created</div>
          <div className="field-shape field-value-activated">04/29/2002</div>
        </div>
      </ul>
      <ul className="u-center">
        <div className="field-container">
          <div className="field-shape field-name">Tags</div>
          <div className="field-shape field-value">Empty</div>
        </div>
      </ul>
      <section className="h-screen">
        <div className="body-editor-container">
          <div className="body-editor-subcontainer">
            <ReactQuill
              theme="snow" // You can choose different themes (snow, bubble, etc.)
              className="vanilla-editor body-editor"
              value={editorHtml}
              onChange={handleChange}
            />
          </div>
        </div>
        <nav className="u-center">
          <div className="options-container">
            {/* TO-DO: add onClick that posts data to server */}
            <DropdownOptions
              selected={currentPermission}
              setSelected={setPermissions}
              allOptions={permissions}
            />
            <button className="options-button save-button">Save</button>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Editor;
