import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import Editor from "../modules/EditorItems/Editor";
import { GOOGLE_CLIENT_ID, PageProps } from "./Home";
import "./Home.css";

const TextEditor = (props: PageProps) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <header className="fixed top-0 z-50">
          <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={props.userId} />
        </header>
        <div className="sidebar-content-container">
          <aside className="sidebar-page-container">
            <SideBar userName={props.userName} />
          </aside>
          <section className="header-content-container">
            <header className="header-container">
              <h1 className="header-text">MemOurs</h1>
            </header>
            <main>
              <div className="main-content-container">
                <Editor userId={props.userId} />
              </div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
/* <div>
                    <RichTextEditor value={editorValue} onChange={handleEditorChange} />
                </div> */

export default TextEditor;
