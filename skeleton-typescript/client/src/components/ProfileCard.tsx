import React from "react";
import "./SideBar.css";

const ProfileCard = () => {
  const userName = "Saul Vega Sauceda";
  return (
    <section className="px-4 pb-8">
      <div className="profilecard-container">
        <div className="profile-pic"></div>
      </div>
      <div className="profile-name">{userName}</div>
    </section>
  );
};

export default ProfileCard;
