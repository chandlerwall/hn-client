import { Card } from "@blueprintjs/core";
import React from "react";
import { timeSince } from "./timeSince";

export interface HnCommentProps {
  comment: KidsObj3 | null;
  depth: number;
}

interface HnCommentState {
  isOpen: boolean;
}

export class HnComment extends React.Component<HnCommentProps, HnCommentState> {
  constructor(props: HnCommentProps) {
    super(props);

    this.state = {
      isOpen: true
    };
  }

  render() {
    const comment = this.props.comment;

    if (comment === null) {
      return null;
    }

    const childComments = comment.kidsObj || [];
    const commentText = comment.text || "";

    if (
      comment.deleted &&
      (comment.kidsObj === undefined || comment.kidsObj!.length === 0)
    ) {
      // kick out nothing if the comment was deleted and has no children
      return null;
    }

    // TODO: rewrite links to hn to open in this site instead

    const childrenToShow = !this.state.isOpen ? null : (
      <React.Fragment>
        <p
          className="comment"
          dangerouslySetInnerHTML={{ __html: commentText }}
        />

        {childComments.map(childComm => (
          <HnComment
            key={comment.id + "-" + childComm.id}
            comment={childComm}
            depth={this.props.depth + 1}
          />
        ))}
      </React.Fragment>
    );

    return (
      <Card
        interactive
        onClick={e => this.handleCardClick(e)}
        style={{
          paddingLeft: 12,
          width: "100%"
        }}
      >
        <p>
          {comment.by}
          {" | "}
          {timeSince(comment.time)}
          {" ago"}
        </p>

        {childrenToShow}
      </Card>
    );
  }
  handleCardClick(e: React.MouseEvent<HTMLDivElement>): void {
    // this is to prevent other cards from collapsing too
    e.stopPropagation();

    // dont update state if click was A link
    if ((e.target as any).tagName === "A") {
      return;
    }

    this.setState({ isOpen: !this.state.isOpen });
  }
}
