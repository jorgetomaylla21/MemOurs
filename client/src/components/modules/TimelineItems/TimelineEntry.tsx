import React from "react";
import { Timeline } from "flowbite-react";
import DOMPurify from "dompurify";
import JournalEntry from "../../../../../shared/JournalEntry";
import MultipleTags from "../EditorItems/MultipleTags";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { permisssionToColor } from "../FeedItems/SingleEntry";
import { TagOption } from "../EditorItems/TagOption";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

type Props = {
  entry: JournalEntry;
};

export const TimelineEntry = (props: Props) => {
  const sanitizedHtml = DOMPurify.sanitize(props.entry.content);
  const tags = props.entry.tags.map((name) => new TagOption(name));
  const permissionColor = permisssionToColor.get(props.entry.permissions);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const routeToSend = {
    linkPrefix: `/entry/${props.entry._id}`,
    button: "Read",
  };
  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0%)" : "translateX(100%)",
  });

  return (
    <animated.div
      ref={ref}
      style={animation}
      className="rounded-md px-4 mb-4 group max-w-2xl hover:bg-slate-100"
    >
      <Timeline.Item>
        <Timeline.Point />
        <Timeline.Content>
          <Timeline.Time>{new Date(props.entry.dateMentioned).toLocaleDateString()}</Timeline.Time>
          <Timeline.Title>{props.entry.title}</Timeline.Title>
          <Timeline.Body>
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          </Timeline.Body>
          <nav className="c-between mt-2rounded-lg">
            <section className="c-start">
              <span className={`permission-container ${permissionColor}`}>
                <p className="p-2 text-center">{props.entry.permissions}</p>
              </span>
              <div className="u-start ml-4">
                <MultipleTags tags={tags} setTags={() => {}} isActive={false} />
              </div>
            </section>
            <Link to={`${routeToSend.linkPrefix}`} className="pb-8">
              <div className="read-button">
                <span className="text-sm mr-2">{routeToSend.button}</span>
                <ArrowRightIcon className="h-5 w-5" />
              </div>
            </Link>
          </nav>
        </Timeline.Content>
      </Timeline.Item>
    </animated.div>
  );
};
