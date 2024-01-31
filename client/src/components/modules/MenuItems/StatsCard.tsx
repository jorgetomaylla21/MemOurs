import React, { useState, useEffect } from "react";
import "./SideBar.css";
import JournalEntry from "../../../../../shared/JournalEntry";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";

type Props = {
  userId?: string;
};

const StatsCard = (props : Props) => {
  const [privateFeed, setPrivateFeed] = useState({
    user: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const privateEntries = () => {
    get("/api/journal", { permissions: "Private" }).then((entries: JournalEntry[]) => {
      setPrivateFeed({
        user: props.userId,
        entries: entries,
      });
    });
  };

  useEffect(() => {
    privateEntries();
    publicEntries();
    draftEntries();
  }, []);



  const [publicFeed, setPublicFeed] = useState({
    user: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const publicEntries = () => {
    get("/api/journal", { permissions: "Public" }).then((entries: JournalEntry[]) => {
      setPublicFeed({
        user: props.userId,
        entries: entries,
      });
    });
  };

  const [draftFeed, setDraftFeed] = useState({
    user: props.userId,
    entries: new Array<JournalEntry>(),
  });

  const draftEntries = () => {
    get("/api/journal", { permissions: "Draft" }).then((entries: JournalEntry[]) => {
      setDraftFeed({
        user: props.userId,
        entries: entries,
      });
    });
  };

    useEffect(() => {
    const callback = () => {
      privateEntries();
      publicEntries();
      draftEntries();
    };
    socket.on("journalEntries", callback);
    return () => {
      socket.off("journalEntries", callback);
    };
  }, []);
  
  return (
    <section className="statscard-container">
      <div className="stats-header">Stats</div>
      <div className="stats-entry">
        <div className="stats-type">Total Memories</div>
        <div className="stats-value">{privateFeed.entries.length + publicFeed.entries.length + draftFeed.entries.length }</div>
      </div>
      <div className="stats-entry">
        <div className="stats-type">Public Memories</div>
        <div className="stats-value">{publicFeed.entries.length}</div>
      </div>
      <div className="stats-entry">
        <div className="stats-type">Private Memories</div>
        <div className="stats-value">{privateFeed.entries.length}</div>
      </div>
      <div className="stats-entry">
        <div className="stats-type">Unpublished Drafts</div>
        <div className="stats-value">{draftFeed.entries.length}</div>
      </div>
      <div className="stats-entry">
      <div className="stats-type"> Last Entry</div>
      {
  publicFeed.entries.length > 0 && (
    <div className="stats-value">
      {new Date(
        publicFeed.entries
          .sort(
            (a: JournalEntry, b: JournalEntry) =>
              new Date(b.dateMentioned).getTime() - new Date(a.dateMentioned).getTime()
          )[0]?.createdAt || ''
      ).toLocaleDateString()}
    </div>
  )
}

      </div>
      <div className="stats-entry">
        <div className="stats-type"> Streak</div>
        <div className="stats-value">15</div>
      </div>
    </section>
  );
};

export default StatsCard;
