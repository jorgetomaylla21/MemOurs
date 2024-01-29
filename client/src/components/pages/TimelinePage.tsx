import React from "react";
import { Timeline } from "../modules/TimelineItems/Timeline";
import { NewTimeline } from "../modules/TimelineItems/NewTimeline";

type Props = {
  userId?: string;
  userName?: string;
};
const TimelinePage = (props: Props) => {
  return <NewTimeline userId={props.userId} userName={props.userName} />;
};

export default TimelinePage;
