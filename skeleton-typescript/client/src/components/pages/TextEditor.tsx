import React from "react";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";

import "./Home.css";
import NavBar from "../modules/NavBar";
import { RouteComponentProps } from "@reach/router";
import SideBar from "../modules/SideBar";
import Editor from "../modules/Editor";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
//const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const TextEditor = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <header className="fixed top-0 z-50">
          <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={props.userId} />
        </header>
        <div className="sidebar-content-container">
          <aside className="sidebar-page-container">
            <SideBar />
          </aside>
          <section className="header-content-container">
            <header className="header-container">
              <h1 className="header-text">MemOurs</h1>
            </header>
            <main>
              <div className="main-content-container">
                <Editor />
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
