import React from "react";
import { HnComment } from "./HnComment";

export interface HnStoryPageProps {
  data: HnItem | undefined;
}

export class HnStoryPage extends React.Component<HnStoryPageProps> {
  render() {
    if (this.props.data === undefined) {
      return null;
    }
    const comments = this.props.data.kidsObj || [];
    return (
      <div>
        <h2>{this.props.data.title}</h2>
        {comments.map(comment => (
          <HnComment key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}
