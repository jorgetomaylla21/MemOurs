import React from "react";
import "./Home.css";
import CalendarView from "../modules/CalendarItems/CalendarView";

type Props = {
  userId?: string;
};

const CalendarPage = (props) => {
  return <CalendarView userId={props.userId} />;
};

export default CalendarPage;
