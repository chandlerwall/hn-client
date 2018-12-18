import React from "react";

interface HnStoryProps {
  data: HnItem;
}

export class HnStory extends React.Component<HnStoryProps> {
  render() {
    const story = this.props.data;
    return (
      <div>
        <p>
          <a href={story.url}>{story.title}</a>
        </p>
        <p>
          <span>{story.score + " | "}</span>
          <a href={"https://news.ycombinator.com/item?id=" + story.id}>
            <span>{story.descendants}</span>
          </a>
          <span>{" | " + story.score}</span>
        </p>
      </div>
    );
  }
}
