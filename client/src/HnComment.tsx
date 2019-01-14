import React from "react";

import { timeSince } from "./timeSince";

import classNames from "classnames";
import { HnCommentList } from "./HnCommentList";

export interface HnCommentProps {
  comment: KidsObj3 | null;
  depth: number;

  canExpand: boolean;

  scrollToNextChild(): void;
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
  divRef: React.RefObject<HTMLDivElement>;

  constructor(props: HnCommentProps) {
    super(props);

    this.state = {
      isOpen: true,
      expandSelf: false
    };

    this.divRef = React.createRef();
  }

  getDivRef() {
    return this.divRef.current!;
  }

  render() {
    const comment = this.props.comment;

    if (comment === null) {
      return null;
    }

    const childComments = comment.kidsObj || [];
    const commentText = comment.text || "";

    if (!isValidComment(comment)) {
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

        <HnCommentList
          childComments={childComments}
          canExpand={!this.state.expandSelf}
          depth={this.props.depth + 1}
        />
      </React.Fragment>
    );

    return (
      <div
        className={classNames("bp3-card", { collapsed: !this.state.isOpen })}
        onClick={e => this.handleCardClick(e)}
        style={{
          paddingLeft: 12,
          marginLeft:
            this.state.expandSelf && this.state.isOpen
              ? -15 * this.props.depth
              : 0,

          borderLeftColor:
            this.props.depth < colors.length
              ? colors[this.props.depth]
              : "#bbb",

          borderLeftWidth: this.state.expandSelf ? 6 : undefined,

          borderRight: this.state.expandSelf
            ? "1px solid" + colors[this.props.depth]
            : undefined,
          paddingRight: this.state.expandSelf ? 6 : undefined
        }}
      >
        <p
          style={{ fontWeight: this.state.isOpen ? 450 : 300 }}
          ref={this.divRef}
        >
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

    const target = e.target as any;

    // allow some gutter expansion once shifted over
    const gutterRatio = this.state.expandSelf ? 0.85 : 0.9;

    if (
      this.props.depth > 0 &&
      this.props.canExpand &&
      (e.pageX + target.offsetLeft) / window.innerWidth > gutterRatio
    ) {
      this.setState({ expandSelf: !this.state.expandSelf });
    } else {
      const isOpen = !this.state.isOpen;
      this.setState({ isOpen }, () => {
        if (!isOpen) {
          this.props.scrollToNextChild();
        }
      });
    }
  }
}

export function isValidComment(comment: KidsObj3 | null) {
  if (comment === null) {
    return false;
  }
  const isBad =
    comment.deleted &&
    (comment.kidsObj === undefined || comment.kidsObj!.length === 0);

  return !isBad;
}
