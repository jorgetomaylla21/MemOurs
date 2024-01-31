import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { differenceInCalendarDays } from "date-fns";
import JournalEntry from "../../../../../shared/JournalEntry";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";
import { entry } from "../../../../../webpack.config";

function isSameDay(a: Date, b: Date): boolean {
  return differenceInCalendarDays(a, b) === 0;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  userId?: string;
};

const CalendarView = (props: Props) => {
  const [value, onChange] = useState<Value>(new Date());
  const [activeFeed, setActiveFeed] = useState({
    user: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const loadEntries = () => {
    get("/api/my-journals").then((entries: JournalEntry[]) => {
      setActiveFeed({
        user: props.userId,
        entries: entries,
      });
    });
  };

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    const callback = () => {
      loadEntries();
    };
    socket.on("journalEntries", callback);
    return () => {
      socket.off("journalEntries", callback);
    };
  }, []);

  const datesToAddClassTo = activeFeed.entries.map((entry) => new Date(entry.dateMentioned));

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
