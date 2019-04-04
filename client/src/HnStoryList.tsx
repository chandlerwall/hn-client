import React from "react";

import { HnListItem } from "./HnListItem";

interface HnStoryListProps {
  items: HnItem[];
}

export class HnStoryList extends React.Component<HnStoryListProps> {
  constructor(props: HnStoryListProps) {
    super(props);
    this.state = {
      items: []
    };
  }
  render() {
    document.title = `HN: Offline`;
    return (
      <div>
        {this.props.items.map(item => (
          <HnListItem data={item} key={item.id} />
        ))}
      </div>
    );
  }
}
