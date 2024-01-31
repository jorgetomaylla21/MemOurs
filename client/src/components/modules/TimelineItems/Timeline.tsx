import React, { useEffect, useState } from "react";
import { Timeline } from "flowbite-react";
import { get } from "../../../utilities";
import JournalEntry from "../../../../../shared/JournalEntry";
import { socket } from "../../../client-socket";
import { TimelineEntry } from "./TimelineEntry";

const theme = {
  root: {
    direction: {
      horizontal: "items-base sm:flex",
      vertical: "relative border-l border-gray-400",
    },
  },
  item: {
    root: {
      horizontal: "relative mb-6 sm:mb-0",
      vertical: "mb-10 ml-6",
    },
    content: {
      root: {
        base: "mt-3 sm:pr-8",
      },
      body: {
        base: "mb-4 text-base font-normal text-gray-700",
      },
      time: {
        base: "mb-1 text-sm font-normal leading-none text-gray-400",
      },
      title: {
        base: "text-lg font-semibold text-gray-900",
      },
    },
    point: {
      horizontal: "flex items-center",
      line: "hidden h-0.5 w-full bg-gray-400 sm:flex",
      marker: {
        base: {
          horizontal:
            "absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-400 dark:border-gray-900 dark:bg-gray-700",
          vertical:
            "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-400",
        },
        icon: {
          base: "h-3 w-3 text-cyan-600 dark:text-cyan-300",
          wrapper:
            "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-200 ring-8 ring-white",
        },
      },
      vertical: "",
    },
  },
};
type Props = {
  userId?: string;
  userName?: string;
};
export const UserTimeline = (props: Props) => {
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

  return (
    <div className="mt-4">
      <h1 className="ml-[4%] rounded-full p-4 flex justify-between items-center text-xl border-2 font-bold text-black bg-slate-100 max-w-2xl">
        {`${props.userName}'s Timeline`}
      </h1>
      <div className="pl-[8%] pt-5 max-w-6xl">
        <Timeline theme={theme}>
          {activeFeed.entries
            // sort by date of event
            .sort(
              (a: JournalEntry, b: JournalEntry) =>
                new Date(b.dateMentioned).getTime() - new Date(a.dateMentioned).getTime()
            )
            .map((entry: JournalEntry, key) => (
              <TimelineEntry key={key} entry={entry} />
            ))}
        </Timeline>
      </div>
    </div>
  );
};
