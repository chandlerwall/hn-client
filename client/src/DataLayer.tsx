import React from "react";

import { HnListSource } from "./App";
import { LocalStorageWrapper } from "./LocalStorageWrapper";

interface DataLayerState {
  frontItems: HnItem[];

  dayItems: HnItem[];

  weekItems: HnItem[];

  monthItems: HnItem[];
}

interface DataLayerProps {
  provideNewItems(items: HnItem[], listType: HnListSource): void;
}

export class DataLayer extends React.Component<DataLayerProps, DataLayerState> {
  refreshData(activeList: HnListSource): void {}
  constructor(props: DataLayerProps) {
    super(props);

    this.state = {
      dayItems: [],
      frontItems: [],
      monthItems: [],
      weekItems: []
    };
  }

  render() {
    // TODO: generalize the comps and events for the data type (don't duplicate)
    return (
      <React.Fragment>
        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateNewItems(item, HnListSource.Front)}
          activeItem={this.state.frontItems}
          storageName="HN-ITEMS"
        />

        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateNewItems(item, HnListSource.Day)}
          activeItem={this.state.dayItems}
          storageName="HN-DAY-ITEMS"
        />

        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateNewItems(item, HnListSource.Week)}
          activeItem={this.state.weekItems}
          storageName="HN-WEEK-ITEMS"
        />

        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateNewItems(item, HnListSource.Month)}
          activeItem={this.state.monthItems}
          storageName="HN-MONTH-ITEMS"
        />
      </React.Fragment>
    );
  }

  async getStoryData(id: number) {
    let item = this.state.frontItems.find(c => c.id === id);
    if (item !== undefined) {
      return item;
    }

    item = this.state.dayItems.find(c => c.id === id);
    if (item !== undefined) {
      return item;
    }

    item = this.state.weekItems.find(c => c.id === id);
    if (item !== undefined) {
      return item;
    }

    item = this.state.monthItems.find(c => c.id === id);
    if (item !== undefined) {
      return item;
    }

    // hit the API for the story data
    return await this.getStoryFromServer(id);
  }

  public async getStoryFromServer(id: number) {
    let url = "/api/story/" + id;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(response);
      return undefined;
    }
    const data: HnItem | { error: string } = await response.json();

    if ("error" in data) {
      console.error(data);
      return undefined;
    }

    console.log("hn item from server", data);

    return data;
  }

  getPageData(page: string | undefined) {
    // TODO: add loading step if data is missing -- figure out how to trigger refresh
    console.log("getpage state", this.state);
    switch (page) {
      case "day":
        if (this.state.dayItems.length === 0) {
          this.loadData(HnListSource.Day);
        }
        return this.state.dayItems || [];
      case "week":
        if (this.state.weekItems.length === 0) {
          this.loadData(HnListSource.Week);
        }
        return this.state.weekItems || [];
      case "month":
        if (this.state.monthItems.length === 0) {
          this.loadData(HnListSource.Month);
        }
        return this.state.monthItems || [];
      default:
        if (this.state.frontItems.length === 0) {
          this.loadData(HnListSource.Front);
        }
        return this.state.frontItems || [];
    }
  }

  public async loadData(activeList: HnListSource) {
    console.log("loading data");
    let url = "";
    switch (activeList) {
      case HnListSource.Front:
        url = "/topstories/topstories";
        break;
      case HnListSource.Day:
        url = "/topstories/day";
        break;
      case HnListSource.Week:
        url = "/topstories/week";
        break;
      case HnListSource.Month:
        url = "/topstories/month";
        break;
    }
    const response = await fetch(url);
    if (!response.ok) {
      console.error(response);
      return;
    }
    const data: HnItem[] = await response.json();

    // TODO: do not reload data on mount... use a button

    // TODO: take that list of items and set it equal to the current list
    // TODO: update the items with a merge of sorts instead of overwriting

    console.log("hn items", data);

    this.updateNewItems(data, activeList);
  }

  updateNewItems(data: HnItem[] | undefined, listType: HnListSource): void {
    console.log("new items2", data, listType);

    if (data === undefined) {
      data = [];
    }

    switch (listType) {
      case HnListSource.Front:
        this.setState({ frontItems: data });
        break;
      case HnListSource.Day:
        this.setState({ dayItems: data });
        break;
      case HnListSource.Week:
        this.setState({ weekItems: data });
        break;
      case HnListSource.Month:
        this.setState({ monthItems: data });
        break;
    }

    this.props.provideNewItems(data, listType);
  }
}
