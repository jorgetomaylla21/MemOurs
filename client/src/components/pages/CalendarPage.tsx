import React from "react";
import "./Home.css";
import CalendarView from "../modules/CalendarItems/CalendarView";
import NoUser from "./NoUser";

type Props = {
  userId?: string;
};

const CalendarPage = (props) => {
  return <section>{!props.userId ? <NoUser /> : <CalendarView userId={props.userId} />}</section>;
};

export default CalendarPage;
