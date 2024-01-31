import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {
  GoogleLogin,
  googleLogout,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import logo from "../../../assets/logo.png";

type Props = {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

const NavBar = (props: Props) => {
  const { handleLogin, handleLogout } = props;
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {
        (props.userId === undefined) ? (
      <div className="nav-bar">
        <span className="flex justify-start">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          <Link to="/tutorial">
            <div className="nav-icon">Tutorial</div>
          </Link>
          
        </span>
        <div className="flex justify-between">
          {props.userId ? (
            <button
              className="nav-icon mr-4"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="google-button">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log("Error Logging in")}
              />
            </div>
          )}
        </div>
      </div>
        ) : 
        (
          <div className="nav-bar">
        <span className="flex justify-start">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          <Link to="/new-entry">
            <div className="nav-icon">New Entry</div>
          </Link>
          <Link to="/timeline">
            <div className="nav-icon">Timeline</div>
          </Link>
          <Link to="/calendar">
            <div className="nav-icon">Calendar</div>
          </Link>
          <Link to="/my-feed">
            <div className="nav-icon">My Feed</div>
          </Link>
        </span>
        <div className="flex justify-between">
          {props.userId ? (
            <button
              className="nav-icon mr-4"
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="google-button">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => console.log("Error Logging in")}
              />
            </div>
          )}
        </div>
      </div>
        )
      }
      
    </GoogleOAuthProvider>
  );
};

export default NavBar;
