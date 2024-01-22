import React from "react";
import "./SideBar.css";

const StatsCard = () => {
  return (
    <section className="statscard-container">
      <div className="stats-header">Stats</div>
      <div className="stats-entry">
        <div className="stats-type">Memories</div>
        <div className="stats-value">14</div>
      </div>
      <div className="stats-entry">
        <div className="stats-type">Last Entry</div>
        <div className="stats-value">04/29/2020</div>
      </div>
      <div className="stats-entry">
        <div className="stats-type"> Streak</div>
        <div className="stats-value">15</div>
      </div>
    </section>
  );
};

export default StatsCard;
