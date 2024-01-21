import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import DropdownOptions from "./DropdownOptions";
import Fields from "./Fields";
import { TagObj } from "./Tag";

interface TextEditorProps {
  initialText?: string;
}

const Editor: React.FC<TextEditorProps> = ({ initialText = "" }) => {
  const permissions = [{ name: "Draft" }, { name: "Private" }, { name: "Public" }];
  const tags = [
    { name: "Fun", color: "amber" },
    { name: "Life", color: "green" },
    { name: "Entertainment", color: "orange" },
    { name: "Romance", color: "red" },
    { name: "Career", color: "blue" },
    { name: "Academics", color: "purple" },
  ];
  const [title, setTitle] = useState<string>(initialText);
  const [editorHtml, setEditorHtml] = useState("");
  const [currentPermission, setPermissions] = useState(permissions[0]);
  const [activatedTags, setActivatedTags] = useState(new Array<TagObj>());

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div className="editor-bg">
      <section className="u-center">
        <section className="w-editor-content flex-col">
          <textarea
            className="vanilla-editor title-editor"
            value={title}
            onChange={handleTitleChange}
            rows={1}
            cols={20}
            placeholder="Title..."
          />
          <Fields
            allTagOptions={tags}
            activatedTags={activatedTags}
            setActivatedTags={setActivatedTags}
          />
          <section className="h-screen">
            <div className="h-1/2">
              <div className="quill-container">
                <ReactQuill
                  theme="snow"
                  className="vanilla-editor body-editor"
                  value={editorHtml}
                  onChange={handleChange}
                  placeholder="Start writing about your day..."
                />
              </div>
            </div>
            <nav className="bottom-nav-container">
              {/* TO-DO: add onClick that posts data to server */}
              <DropdownOptions
                selected={currentPermission}
                setSelected={setPermissions}
                allOptions={permissions}
              />
              <button className="config-button save-button">Save</button>
            </nav>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Editor;
