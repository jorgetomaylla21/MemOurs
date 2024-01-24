import React from "react";
import NavBar from "../modules/MenuItems/NavBar";
import SideBar from "../modules/MenuItems/SideBar";
import MyDatePicker from "../modules/EditorItems/DatePicker";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID, PageProps } from "./Home";
import "./Home.css";

const Calendar = (props: PageProps) => {
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
              <h1 className="header-text">Calendar View</h1>
            </header>
            <main>
              <MyDatePicker />
            </main>
          </section>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Calendar;
