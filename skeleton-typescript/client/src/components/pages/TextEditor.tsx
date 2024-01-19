import React from "react";

import "./Skeleton.css";
import "../../../src/output.css";
import NavBar from "../NavBar";
import { RouteComponentProps } from "@reach/router";
import SideBar from "../SideBar";
import Editor from "../Editor";

//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID
//const GOOGLE_CLIENT_ID = "969378506162-5ltmi54vc1d96lelg5b44slm8c1vbol3.apps.googleusercontent.com";

type Props = RouteComponentProps 
const Skeleton = (props: Props) => {
  

  return (
    <div>
      <h1>Hello Llamas, this is your soon to be text editor, no CSS yet:o</h1>
      <Editor/>
    </div>
  );
};

export default Skeleton;
