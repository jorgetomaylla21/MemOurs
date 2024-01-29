import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import DropdownOptions from "./DropdownOptions";
import Fields from "./Fields";
import { MessageOverlay } from "./MessageOverlay";
import { post } from "../../../utilities";
import { TagOption } from "./TagOption";
import JournalEntry from "../../../../../shared/JournalEntry";

interface TextEditorProps {
  entry?: JournalEntry;
  userId?: string;
  entryId?: string;
}

const permissions = [{ name: "Draft" }, { name: "Private" }, { name: "Public" }];
const tags = ["Fun", "Life", "Entertainment", "Romance", "Career", "Academics"].map(
  (name) => new TagOption(name)
);

// Added function to parse passed in entry to deal with setting default values
const checkParams = (entry?: JournalEntry) => {
  return {
    author: entry?.author ?? { name: "", _id: "" },
    title: entry?.title ?? "",
    content: entry?.content ?? "",
    dateMentioned: entry?.dateMentioned ? new Date(entry.dateMentioned) : null,
    tags: entry?.tags.map((tag) => new TagOption(tag)) ?? [],
    permissions: entry?.permissions ? { name: entry.permissions } : permissions[0],
  };
};

const Editor: React.FC<TextEditorProps> = (props: TextEditorProps) => {
  const parsedEntry = checkParams(props.entry);
  const [title, setTitle] = useState<string>(parsedEntry.title);
  const [editorHtml, setEditorHtml] = useState(parsedEntry.content);
  const [currentPermission, setPermissions] = useState(parsedEntry.permissions);
  const [activatedTags, setActivatedTags] = useState<Array<TagOption>>(parsedEntry.tags);
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsedEntry.dateMentioned);
  const [warning, setWarning] = useState(false);
  const [saveDisplay, setSaveDisplay] = useState(false);

  // updating journal if entryId exists
  const routeToSend = props.entryId ? "/api/edit-journal" : "/api/journal";

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
    console.log(props.userId);
    if (!props.userId) {
      setWarning(true);
    } else {
      // save to database
      const body = {
        entryId: props.entryId, // update if exists
        title: title,
        content: editorHtml,
        dateMentioned: new Date(selectedDate ?? new Date()),
        taggedPeople: [],
        createdAt: new Date(),
        tags: activatedTags.map((tag) => tag.name),
        permissions: currentPermission.name,
      };
      post(routeToSend, body).then(() => {
        setSaveDisplay(true);
      });
      setSaveDisplay(false);
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
