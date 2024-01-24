import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import { ReadOnly } from "../modules/EntryPageItems/ReadOnly";
import JournalEntry from "../../../../shared/JournalEntry";
import { GOOGLE_CLIENT_ID, PageProps } from "./Home";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";
import "./Home.css";

const EntryPage = (props: PageProps) => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<JournalEntry>();
  console.log("ENTRY ID::::");
  console.log(entryId);
  console.log(props.userId);
  if (entryId && props.userId) {
    const fetchEntry = () => {
      get(`/api/entry`, { entryId: entryId }).then((entry: JournalEntry) => setEntry(entry));
    };
    useEffect(fetchEntry, []);
  }

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
              <h1 className="header-text">{entry?.title}</h1>
            </header>
            <main>
              <div className="main-content-container">
                {!props.userId ? <p>Sign in to view content</p> : <ReadOnly entry={entry} />}
              </div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default EntryPage;
