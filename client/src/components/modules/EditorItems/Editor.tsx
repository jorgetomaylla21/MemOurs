import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import DropdownOptions from "./DropdownOptions";
import Fields from "./Fields";
import { MessageOverlay } from "./MessageOverlay";
import { post } from "../../../utilities";
import { TagOption } from "./TagOption";

interface TextEditorProps {
  userId?: string;
}

const Editor: React.FC<TextEditorProps> = (props: TextEditorProps) => {
  const permissions = [{ name: "Draft" }, { name: "Private" }, { name: "Public" }];
  const tags = ["Fun", "Life", "Entertainment", "Romance", "Career", "Academics"].map(
    (name) => new TagOption(name)
  );
  const [title, setTitle] = useState<string>("");
  const [editorHtml, setEditorHtml] = useState("");
  const [currentPermission, setPermissions] = useState(permissions[0]);
  const [activatedTags, setActivatedTags] = useState(new Array<TagOption>());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [warning, setWarning] = useState(false);
  const [saveDisplay, setSaveDisplay] = useState(false);

  const warningMessage = {
    header: "Login to account",
    details: "You must login in order to perform this action.",
  };
  const saveMessage = {
    header: "Saved!",
    details: "Your journal was succefully saved.",
  };

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
      // save to database
      const body = {
        title: title,
        content: editorHtml,
        dateMentioned: new Date(selectedDate ?? new Date()),
        taggedPeople: [],
        createdAt: new Date(),
        tags: activatedTags.map((tag) => tag.name),
        permissions: currentPermission.name,
      };
      post("/api/journal", body).then((entry) => {
        setSaveDisplay(true);
      });
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
              <div className="quill-container caret-blue-700">
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
              <button className="config-button save-button" onClick={handleSave}>
                Save
              </button>
              {/* Show must sign in overlay */}
              {warning ? (
                <MessageOverlay
                  open={warning}
                  setOpen={setWarning}
                  message={warningMessage}
                  isWarning={true}
                />
              ) : null}
              {/* Show saved overlay */}
              {saveDisplay ? (
                <MessageOverlay
                  open={saveDisplay}
                  setOpen={setSaveDisplay}
                  message={saveMessage}
                  isWarning={false}
                />
              ) : null}
              <DropdownOptions
                selected={currentPermission}
                setSelected={setPermissions}
                allOptions={permissions}
              />
            </nav>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Editor;
