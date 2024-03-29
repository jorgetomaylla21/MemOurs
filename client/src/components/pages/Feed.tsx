import React from "react";
import { ToggleView } from "../modules/FeedItems/ToggleView";
import NoUser from "./NoUser";

type Props = {
  userId?: string;
};
const Feed = (props: Props) => {
  return (
    <section className="u-relative min-h-screen bg-gray-100">
      {!props.userId ? <NoUser /> : <ToggleView userId={props.userId} />}
    </section>
  );
};

export default Feed;
