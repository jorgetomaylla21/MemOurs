import React from "react";
import { Link } from "@reach/router";
import "./NavBar.css";
import { GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";
import { RouteComponentProps } from "@reach/router";
import logo from "../../assets/logo.png";

type Props = RouteComponentProps & {
  userId?: string;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

const NavBar = (props: Props) => {
  const { handleLogin, handleLogout } = props;
  return (
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
            <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
