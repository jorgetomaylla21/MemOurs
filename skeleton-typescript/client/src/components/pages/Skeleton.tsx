import React from "react";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";

import "./Skeleton.css";
import "../../../src/output.css";
import NavBar from "../NavBar";
import { RouteComponentProps } from "@reach/router";
import SideBar from "../SideBar";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};
const Skeleton = (props: Props) => {
  const { handleLogin, handleLogout } = props;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <header className="fixed top-0 z-50">
          <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={props.userId} />
        </header>
        <div className="flex pt-[76px]">
          <aside className="sticky top-0 h-screen w-[300px]">
            <SideBar />
          </aside>
          <section className="w-full">
            <header className="header-container">
              <div className="header-subcontainer">
                <h1 className="header-text">MemOurs</h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl py-6 sm:px-6 lg:px-8">content here</div>
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
