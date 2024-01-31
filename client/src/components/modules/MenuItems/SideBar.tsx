import React from "react";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";

import "./SideBar.css";

type Props = {
  userName?: string;
  userId?: string;
};

const SideBar = (props: Props) => {
  return (
    <div className="sidebar-container group">
      <ProfileCard userName={props.userName} />
      <StatsCard userId={props.userId} userName={props.userName}/>
    </div>
  );
};

export default SideBar;
