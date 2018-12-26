import React from "react";
import { HnComment } from "./HnComment";

export interface HnStoryPageProps {
  data: HnItem;
}

export class HnStoryPage extends React.Component<HnStoryPageProps> {
  render() {
    if (this.props.data === undefined) {
      return null;
    }
    const comments = this.props.data.kidsObj || [];
    return (
      <div>
        {this.props.data.title}
        {comments.map(comment => (
          <HnComment key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    );
  }
}
