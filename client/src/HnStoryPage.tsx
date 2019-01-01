import React from "react";
import { HnComment } from "./HnComment";
import { timeSince } from "./timeSince";
import { getDomain } from "./getDomain";

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
        <h2>
          <a href={this.props.data.url}>{this.props.data.title}</a>
        </h2>
        <h4>
          <span>{this.props.data.by}</span>
          <span>{" | "}</span>
          <span>{this.props.data.score}</span>
          <span>{" | "}</span>
          <span>{timeSince(this.props.data.time)} ago</span>
          <span>{" | "}</span>
          <span>{getDomain(this.props.data.url)}</span>
        </h4>

        {this.props.data.text !== undefined && (
          <p dangerouslySetInnerHTML={{ __html: this.props.data.text }} />
        )}

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
