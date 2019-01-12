import React from "react";

import { timeSince } from "./timeSince";

export interface HnCommentProps {
  comment: KidsObj3 | null;
  depth: number;
}

interface HnCommentState {
  isOpen: boolean;

  expandSelf: boolean;
}

const colors = [
  "#bc8672",
  "#c5be53",
  "#d46850",
  "#8c7f3b",
  "#dec392",
  "#c9893a"
];

export class HnComment extends React.Component<HnCommentProps, HnCommentState> {
  constructor(props: HnCommentProps) {
    super(props);

    this.state = {
      isOpen: true,
      expandSelf: false
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
      <div
        className="bp3-card"
        onClick={e => this.handleCardClick(e)}
        style={{
          paddingLeft: 12,
          marginLeft:
            this.state.expandSelf && this.state.isOpen
              ? -15 * this.props.depth
              : 0,

          borderLeftColor:
            this.props.depth < colors.length ? colors[this.props.depth] : "#bbb"
        }}
      >
        <p style={{ fontWeight: this.state.isOpen ? 450 : 300 }}>
          {comment.by}
          {" | "}
          {timeSince(comment.time)}
          {" ago"}
        </p>

        {childrenToShow}
      </div>
    );
  }
  handleCardClick(e: React.MouseEvent<HTMLDivElement>): void {
    // this is to prevent other cards from collapsing too

    e.stopPropagation();

    // dont update state if click was A link
    if ((e.target as any).tagName === "A") {
      return;
    }

    console.log("click", e.clientX, e.pageX, e.screenX, window.innerWidth);

    const target = e.target as any;
    console.log(target.offsetLeft);

    // allow some gutter expansion once shifted over
    const gutterRatio = this.state.expandSelf ? 0.85 : 0.9;

    if (
      this.props.depth > 0 &&
      (e.pageX + target.offsetLeft) / window.innerWidth > gutterRatio
    ) {
      console.log("right gutter");
      this.setState({ expandSelf: !this.state.expandSelf });
    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  }
}
