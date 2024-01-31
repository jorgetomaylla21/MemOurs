import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { differenceInCalendarDays } from "date-fns";
import JournalEntry from "../../../../../shared/JournalEntry";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";
import { groupEntriesByDate } from "./utilities";
import { MarkerDropdown } from "./MarkerDropdown";

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
  const [selectedEntryDate, setSelectedEntryDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const [showEntryMenu, setShowEntryMenu] = useState<boolean>(false);
  const [activeFeed, setActiveFeed] = useState({
    user: props.userId,
    datesToEntries: new Map<string, JournalEntry[]>(),
  });
  const [datesToAddClassTo, setDates] = useState(new Array<Date>());

  const loadEntries = () => {
    get("/api/my-journals").then((entries: JournalEntry[]) => {
      setActiveFeed({
        user: props.userId,
        datesToEntries: groupEntriesByDate(entries),
      });
    });
  };

  useEffect(() => {
    setDates(
      Array.from(activeFeed.datesToEntries.keys()).map((dateString) => new Date(dateString))
    );
  }, [activeFeed]);

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

  const handleClick = (date: Date) => {
    setSelectedEntryDate(date.toLocaleDateString());
    setShowEntryMenu(true);
  };

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return "border-2 rounded-xl w-full h-full";
      }
    }
  }

  function tileContent({ activeStartDate, date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add dropdown to
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return (
          <div className="flex justify-center items-center mt-1">
            <button
              className="flex justify-center items-center h-6 w-6 aspect-square rounded-full bg-red-500"
              onClick={() => handleClick(date)}
            >
              <p className="text-white p-1 aspect-square">
                {activeFeed.datesToEntries.get(date.toLocaleDateString())?.length}
              </p>
            </button>
          </div>
        );
      }
    }
  }

  return (
    <div className="flex justify-start">
      <span className="ml-4 mt-4 w-full">
        <Calendar
          className={
            "font-mono bg-slate-100 shadow-lg border-0 rounded-lg text-black font-bold z-10"
          }
          onChange={onChange}
          tileClassName={tileClassName}
          tileContent={tileContent}
          showNeighboringMonth={false}
          showDoubleView={true}
        />
      </span>
      <span className="mt-4 ml-2 w-full">
        {showEntryMenu ? (
          <MarkerDropdown
            date={selectedEntryDate}
            entries={activeFeed.datesToEntries.get(selectedEntryDate) ?? []}
          />
        ) : null}
      </span>
    </div>
  );
};

export default CalendarView;
