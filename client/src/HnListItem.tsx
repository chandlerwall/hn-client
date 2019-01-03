import React from "react";
import { Link } from "react-router-dom";

import { getDomain } from "./getDomain";
import { timeSince } from "./timeSince";
import { Glyphicon } from "react-bootstrap";

export interface HnStoryProps {
  data: HnItem;
}

export class HnListItem extends React.Component<HnStoryProps> {
  render() {
    const story = this.props.data;
    return (
      <div>
        <p>
          <a href={story.url}>{story.title}</a>
        </p>
        <p>
          <span>{story.score + " | "}</span>
          <Link to={"/story/" + story.id}>
            <span>
              <Glyphicon glyph="comment" /> {" " + story.descendants}
            </span>
          </Link>
          <span>{" | " + timeSince(story.time) + " ago"}</span>
          <span>{" | " + getDomain(story.url)}</span>
        </p>
      </div>
    );
  }
}
