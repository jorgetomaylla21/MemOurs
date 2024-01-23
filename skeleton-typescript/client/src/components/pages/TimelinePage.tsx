import React from "react";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";

import "./Home.css";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import { Timeline } from "../modules/TimelineItems/Timeline";

const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const TimelinePage = (props: Props) => {
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