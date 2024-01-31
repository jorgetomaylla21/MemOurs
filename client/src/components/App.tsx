import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TextEditor from "./pages/TextEditor";
import TimelinePage from "./pages/TimelinePage";
import Calendar from "./pages/CalendarPage";
import Feed from "./pages/Feed";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import EntryPage from "./pages/EntryPage";
import NavBar from "./modules/MenuItems/NavBar";
import SideBar from "./modules/MenuItems/SideBar";
import "./pages/Home.css";
import EditPage from "./pages/EditPage";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
          setUserName(user.name);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };
  //flex-grow pt-[var(--under-nav)]
  return (
    <BrowserRouter>
      <header className="fixed top-0 z-50">
        <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      </header>

      <div className="flex">
        {!(userId === undefined) ? (
          <div className="sidebar-content-container">
            <aside className="sidebar-page-container">
              <SideBar userName={userName} userId={userId}/>
            </aside>
          </div>
        ) : null}

        <section
          className={`${!(userId === undefined) ? "ml-[16%]" : ""} header-content-container`}
        >
          <header className="header-container">
            <h1 className="header-text">MemOurs</h1>
          </header>
          <main>
            <div className="main-content-container font-mono">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-entry" element={<TextEditor userId={userId} />} />
                <Route
                  path="/timeline"
                  element={<TimelinePage userId={userId} userName={userName} />}
                />
                <Route path="/calendar" element={<Calendar userId={userId} />} />
                <Route path="/my-feed" element={<Feed userId={userId} />} />
                <Route path="/entry/:entryId" element={<EntryPage />} />
                <Route path="/edit/:entryId" element={<EditPage userId={userId} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default App;
