import computeScrollIntoView from "compute-scroll-into-view";
import _ from "lodash";
import React from "react";

import { HnComment } from "./HnComment";

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
            depth={this.props.depth}
            canExpand={this.props.canExpand}
            ref={this.childRefs[childComm!.id]}
            scrollToNextChild={() => {
              // check if next is real
              // HACK: nothing here is pretty... bouncing around refs to get the DIV to scroll to
              // scroll to self if no siblings around
              let nextSib = validChildren[index + 1];
              const meEl = validChildren[index];

              if (meEl === null) {
                return;
              }

              if (nextSib === undefined || nextSib === null) {
                nextSib = meEl;
              }

              const refObj = this.childRefs[nextSib.id].current!;
              const divToScroll = refObj.getDivRef();

              const actions = computeScrollIntoView(divToScroll, {
                block: "nearest",
                inline: "nearest",
                scrollMode: "if-needed"
              });

              const refObjMe = this.childRefs[meEl.id].current!;
              const divToScrollMe = refObjMe.getDivRef();

              const actionsMe = computeScrollIntoView(divToScrollMe, {
                block: "nearest",
                inline: "nearest",
                scrollMode: "if-needed"
              });

              if (actions.length == 0 && actionsMe.length == 0) {
                return;
              }

              // the goal here is to determine if the next sibling or the collapsed header is hidden
              // if either is not visible, it will scroll to the next sib (or collapsed if no sibs)

              // TODO: consider if this 80 should be less if no siblings
              window.scrollTo({
                top: divToScroll.offsetTop - 80,
                behavior: "smooth" // Optional, adds animation)
              });
            }}
          />
        ))}
      </React.Fragment>
    );
  }
}
