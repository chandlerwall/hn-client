import _ from "lodash";
import React from "react";
import LZString from "lz-string";

import { HnListSource } from "./App";

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
  refreshData(activeList: HnListSource): void {
    
  }
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

  getStoryData(id: number) {
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

    return undefined;
  }

  getPageData(page: string | undefined) {
    // TODO: add loading step if data is missing -- figure out how to trigger refresh
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

  async loadData(activeList: HnListSource) {
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
    console.log("new items2 front", data, listType);

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

interface LocalStorageWrapperProps<TDataType> {
  storageName: string;
  activeItem: TDataType;

  dataDidUpdate(item: TDataType | undefined): void;
}

interface LocalStorageWrapperState<TDataType> {
  item: TDataType | undefined;
}

export class LocalStorageWrapper<TDataType> extends React.Component<
  LocalStorageWrapperProps<TDataType>,
  LocalStorageWrapperState<TDataType>
> {
  constructor(props: LocalStorageWrapperProps<TDataType>) {
    super(props);

    this.state = {
      item: undefined
    };
  }
  render() {
    return null;
  }

  componentDidMount() {
    // check localStorage for obj

    const itemCompr = localStorage.getItem(this.props.storageName);

    // decompress

    if (itemCompr === undefined || itemCompr === null) {
      this.setState({ item: undefined }, () =>
        this.props.dataDidUpdate(undefined)
      );
      return;
    }

    const item = LZString.decompress(itemCompr);
    

    // parse JSON for what was found

    const obj = JSON.parse(item) as TDataType;

    this.setState({ item: obj }, () => this.props.dataDidUpdate(obj));
  }

  componentDidUpdate(
    prevProps: LocalStorageWrapperProps<TDataType>,
    prevState: LocalStorageWrapperState<TDataType>
  ) {
    // if activeItem changed... save to local storage.. update self

    if (!_.isEqual(prevProps.activeItem, this.props.activeItem)) {
      // do a check for undefined and kick out?
      if (this.props.activeItem === undefined) {
        return;
      }

      // TODO: this save should only happen when the data is new
      if (_.isEqual(this.state.item, this.props.activeItem)) {
        // do not need to save or update... it is the same as current state
        // happens when loaded
        return;
      }
      console.log("save item", this.props.activeItem);

      // compress and save

      const strToStore = JSON.stringify(this.props.activeItem);
      const strToStoreCompr = LZString.compress(strToStore);
      localStorage.setItem(this.props.storageName, strToStoreCompr);

      this.setState({ item: this.props.activeItem }, () =>
        this.props.dataDidUpdate(this.props.activeItem)
      );
    }
  }
}
