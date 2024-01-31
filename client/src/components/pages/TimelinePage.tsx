import React from "react";
import { UserTimeline } from "../modules/TimelineItems/Timeline";
import NoUser from "./NoUser";

type Props = {
  userId?: string;
  userName?: string;
};
const TimelinePage = (props: Props) => {
  return (
    <section>
      {!props.userId ? (
        <NoUser />
      ) : (
        <UserTimeline userId={props.userId} userName={props.userName} />
      )}
    </section>
  );
};

export default TimelinePage;
