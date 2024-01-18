import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";

import "./Skeleton.css";
import "../../../src/input.css";
import { RouteComponentProps } from "@reach/router";

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
      {props.userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
      )}
      <h1>Good luck on your project :)</h1>
      <h2> What we provide in this skeleton</h2>
      <ul>
        <li>Google Auth (Skeleton.js & auth.js)</li>
        <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
        <li>User Model (auth.js & user.js)</li>
      </ul>
      <h2> What you need to change</h2>
      <ul>
        <li>Change the font in utilities.css</li>
        <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
        <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
        <li>Change the Database SRV for Atlas (server.js)</li>
        <li>Change the Database Name for MongoDB (server.js)</li>
        <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
        <li>Update website title in client/dist/index.html</li>
      </ul>
      <h1 className="text-3xl font-bold underline text-red-300">Hello world!</h1>
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
