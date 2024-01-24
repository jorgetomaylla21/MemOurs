import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import { ReadOnly } from "../modules/EntryPageItems/ReadOnly";
import JournalEntry from "../../../../shared/JournalEntry";
import { GOOGLE_CLIENT_ID, PageProps } from "./Home";
import "./Home.css";

type Props = PageProps & {
  entry: JournalEntry;
};
const EntryPage = (props: Props) => {
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
              <h1 className="header-text">{props.entry.title}</h1>
            </header>
            <main>
              <div className="main-content-container">
                {!props.userId ? <p>Sign in to view content</p> : <ReadOnly entry={props.entry} />}
              </div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default EntryPage;
