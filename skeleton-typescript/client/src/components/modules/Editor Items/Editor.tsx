import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import DropdownOptions from "./DropdownOptions";
import Fields from "./Fields";
import { TagObj } from "./Tag";
import { WarningOverlay } from "./WarningOverlay";
import { post } from "../../../utilities";

interface TextEditorProps {
  userId?: string;
}

const Editor: React.FC<TextEditorProps> = (props: TextEditorProps) => {
  const permissions = [{ name: "Draft" }, { name: "Private" }, { name: "Public" }];
  const tags = [
    { name: "Fun", color: "amber" },
    { name: "Life", color: "green" },
    { name: "Entertainment", color: "orange" },
    { name: "Romance", color: "red" },
    { name: "Career", color: "blue" },
    { name: "Academics", color: "purple" },
  ];
  const [title, setTitle] = useState<string>("");
  const [editorHtml, setEditorHtml] = useState("");
  const [currentPermission, setPermissions] = useState(permissions[0]);
  const [activatedTags, setActivatedTags] = useState(new Array<TagObj>());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [warning, setWarning] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleText = (html) => {
    setEditorHtml(html);
  };

  const handleSave = () => {
    if (!props.userId) {
      setWarning(true);
    } else {
      setWarning(false);
      // save to database
      const body = {
        title: title,
        content: editorHtml,
        dateMentioned: selectedDate?.toLocaleDateString() ?? "",
        taggedPeople: [],
        createdAt: new Date().toLocaleDateString(),
        tags: activatedTags.map((tag) => tag.name),
        permissions: currentPermission.name,
      };
      console.log("sending body...");
      console.log(selectedDate?.toLocaleDateString());
      console.log(body);
      post("/api/journal", body).then((entry) => console.log(entry));
    }
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
            placeholder="Untitled"
          />
          <Fields
            allTagOptions={tags}
            activatedTags={activatedTags}
            setActivatedTags={setActivatedTags}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <section className="h-screen">
            <div className="h-1/2">
              <div className="quill-container">
                <ReactQuill
                  theme="snow"
                  className="vanilla-editor body-editor"
                  value={editorHtml}
                  onChange={handleText}
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
              <button className="config-button save-button" onClick={handleSave}>
                Save
              </button>
              {warning ? <WarningOverlay open={warning} setOpen={setWarning} /> : null}
            </nav>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Editor;
