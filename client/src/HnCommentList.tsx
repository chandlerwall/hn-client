import React from "react";
import { HnComment } from "./HnComment";
import scrollIntoView from "scroll-into-view-if-needed";

interface HnCommentListProps {
  childComments: Array<KidsObj3 | null>;
  depth: number;
  canExpand: boolean;
}

export class HnCommentList extends React.Component<HnCommentListProps, {}> {
  childRefs: Array<React.RefObject<HnComment>> = [];
  constructor(props: HnCommentListProps) {
    super(props);
    props.childComments.forEach(item => {
      if (item === null) {
        return;
      }
      this.childRefs[item.id] = React.createRef();
    });
  }
  render() {
    const validChildren = this.props.childComments.filter(
      comm => comm !== null
    );
    return (
      <React.Fragment>
        {validChildren.map((childComm, index) => (
          <HnComment
            key={childComm!.id}
            comment={childComm}
            depth={this.props.depth + 1}
            canExpand={this.props.canExpand}
            ref={this.childRefs[childComm!.id]}
            scrollToNextChild={() => {
              // check if next is real
              // HACK: nothing here is pretty... bouncing around refs to get the DIV to scroll to
              // scroll to self if no siblings around
              const nextSib = validChildren[index + 1] || validChildren[index];

              if (nextSib === undefined || nextSib === null) {
                return;
              }
              const refObj = this.childRefs[nextSib.id].current!;

              scrollIntoView(refObj.getDivRef(), {
                behavior: actions =>
                  // list is sorted from innermost (closest parent to your target) to outermost (often the document.body or viewport)
                  actions.forEach(({ el, top, left }) => {
                    // implement the scroll anyway you want
                    window.scrollTo({
                      top: top - 80,
                      behavior: "smooth" // Optional, adds animation)
                    });
                  }),
                block: "nearest",
                inline: "nearest",
                scrollMode: "if-needed"
              });
            }}
          />
        ))}
      </React.Fragment>
    );
  }
}
