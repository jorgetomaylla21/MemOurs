import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { differenceInCalendarDays } from "date-fns";

function isSameDay(a: Date, b: Date): boolean {
  return differenceInCalendarDays(a, b) === 0;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  userId?: string;
};

const CalendarView = () => {
  const [value, onChange] = useState<Value>(new Date());
  const datesToAddClassTo = [
    new Date("01/31/2024"),
    new Date("02/02/2024"),
    new Date("02/05/2024"),
  ];

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return "text-white bg-sky-700 rounded-full";
      }
    }
  }

  return (
    <div className="flex justify-center items-center p-8 w-full">
      <Calendar
        className={
          "font-mono w-5/6 bg-slate-200 p-8 shadow-lg border-black rounded-lg text-black font-bold"
        }
        onChange={onChange}
        tileClassName={tileClassName}
        showNeighboringMonth={false}
        showDoubleView={true}
      />
    </div>
  );
};

export default CalendarView;
