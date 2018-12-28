import React from "react";

import { HnListItem } from "./HnListItem";

interface HnStoryListProps {
  items: HnItem[];
  requestNewData(): void;
}

export class HnStoryList extends React.Component<HnStoryListProps> {
  constructor(props: HnStoryListProps) {
    super(props);
    this.state = {
      items: []
    };
  }
  render() {
    return (
      <React.Fragment>
        <div onClick={this.props.requestNewData}>reload</div>
        <div>
          {this.props.items.map(item => (
            <HnListItem data={item} key={item.id} />
          ))}
        </div>
      </React.Fragment>
    );
  }

  
}
