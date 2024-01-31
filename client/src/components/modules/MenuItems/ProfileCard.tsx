import React, { useEffect, useState } from "react";
import "./SideBar.css";

type Props = {
  userName?: string;
};
const ProfileCard = (props: Props) => {
  const [userName, setUserName] = useState("No User");

  useEffect(() => {
    const display = props.userName ?? "No user";
    setUserName(display);
  }, [props.userName]);
  const myImage = require('../../../assets/profile_cat.jpg');

  return (
    <section className="px-4 pb-8">
      <div className="profilecard-container">       
        <img src={myImage.default} alt="Profile Cat" className="profile-pic"/>       
      </div>
      <div className="profile-name">{userName}</div>
    </section>
  );
};

export default ProfileCard;
