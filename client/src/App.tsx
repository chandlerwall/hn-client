import React from "react";

import { Header } from "./Header";
import { HnStory } from "./HnStory";

interface AppState {
  items: HnItem[];
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: []
    };
  }

  // TODO: add react-router for links

  render() {
    return (
      <div>
        <Header />{" "}
        <div>
          {this.state.items.map(item => (
            <HnStory data={item} key={item.id} />
          ))}
        </div>
      </div>
    );
  }

  async componentDidMount() {
    // go get some data

    const url = "/topstories/topstories";
    const response = await fetch(url);

    if (!response.ok) {
      console.error(response);
      return;
    }

    const data: HnItem[] = await response.json();

    // TODO: persist this daata into localStorage
    // TODO: do not reload data on mount... use a button

    console.log("hn items", data);
    this.setState({ items: data });
  }
}
