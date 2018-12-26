import React from "react";
import { Link } from "react-router-dom";

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
            <span>{story.descendants}</span>
          </Link>
          <span>{" | " + story.score}</span>
        </p>
      </div>
    );
  }
}
