import React from "react";
import { ToggleView } from "../modules/FeedItems/ToggleView";

type Props = {
  userId?: string;
};
const Feed = (props: Props) => {
  return (
    <section className="u-relative">
      {!props.userId ? <p>Sign in to view content</p> : <ToggleView userId={props.userId} />}
    </section>
  );
};

export default Feed;
