import React from "react";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";

import "./Home.css";
import "../../../src/output.css";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import { Info } from "../modules/HomeItems/Info";

export const GOOGLE_CLIENT_ID =
  "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

export type PageProps = {
  userId?: string;
  userName?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Skeleton = (props: PageProps) => {
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
            <header className="header-container fixed top-[76px] left-[200px] z-50">
              <h1 className="header-text">MemOurs</h1>
            </header>
            <main>
              <div className="main-content-container">
                <Info />
              </div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
