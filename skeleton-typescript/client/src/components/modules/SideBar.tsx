import React from "react";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";

import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar-container group">
      <ProfileCard />
      <StatsCard />
    </div>
  );
};

export default SideBar;
