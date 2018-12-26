import { Card } from "@blueprintjs/core";
import React from "react";

export interface HnCommentProps {
  comment: KidsObj3;
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
    const childComments = this.props.comment.kidsObj || [];
    const commentText = this.props.comment.text || "";

    // TODO: rewrite links to hn to open in this site instead

    const childrenToShow = !this.state.isOpen ? null : (
      <React.Fragment>
        <p dangerouslySetInnerHTML={{ __html: commentText }} />

        {childComments.map(childComm => (
          <HnComment
            key={this.props.comment.id + "-" + childComm.id}
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
          marginLeft: this.props.depth * 20,
          width: "100%"
        }}
      >
        <p>{this.props.comment.by}</p>

        {childrenToShow}
      </Card>
    );
  }
  handleCardClick(e: React.MouseEvent<HTMLDivElement>): void {
    // this is to prevent other cards from collapsing too
    e.stopPropagation();

    this.setState({ isOpen: !this.state.isOpen });
  }
}
