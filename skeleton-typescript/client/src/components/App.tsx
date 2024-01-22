import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";

import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TextEditor from "./pages/TextEditor";
import Calendar from "./pages/Calendar";
import Feed from "./pages/Feed";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // TRhey are registed in the database and currently logged in.
          setUserId(user._id);
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
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        />
        <Route
          path="/new-entry"
          element={
            <TextEditor handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route
          path="/calendar"
          element={
            <Calendar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route
          path="/my-feed"
          element={<Feed handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
