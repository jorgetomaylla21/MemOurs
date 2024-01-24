import React from "react";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";

import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import { Timeline } from "../modules/TimelineItems/Timeline";
import { GOOGLE_CLIENT_ID, PageProps } from "./Home";
import "./Home.css";

const TimelinePage = (props: PageProps) => {
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
              <h1 className="header-text">Your Timeline</h1>
            </header>
            <main>
              <div className="main-content-container">
                <Timeline />
              </div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default TimelinePage;
