import _ from "lodash";
import React from "react";

import { HnListSource } from "./App";

interface DataLayerState {
  frontItems: HnItem[] | undefined;

  dayItems: HnItem[] | undefined;

  weekItems: HnItem[] | undefined;

  monthItems: HnItem[] | undefined;
}

interface DataLayerProps {
  activeList: HnListSource | undefined;

  dataSourceUpdated(items: HnItem[] | undefined, isActive: boolean): void;
}

export class DataLayer extends React.Component<DataLayerProps, DataLayerState> {
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
    return (
      <React.Fragment>
        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateFrontItems(item)}
          activeItem={this.state.frontItems}
          storageName="HN-ITEMS"
        />

        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateDayItems(item)}
          activeItem={this.state.dayItems}
          storageName="HN-DAY-ITEMS"
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    console.log("did mount", this.state);

    // TODO: this works when data is loaded... need to determine how to trigger new data needed
  }

  componentDidUpdate(props: DataLayerProps) {
    console.log("new state", props);
    if (props.activeList !== this.props.activeList) {
      // change the data source... fire off events
      // do the fetch here (if needed)... otherwise fire the event for the new data source

      // TODO: check if data is already defined... force update somehow
      console.log("should update data... loading");

      this.updateDayItems(this.state.dayItems);
      this.updateFrontItems(this.state.frontItems);
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

    switch (activeList) {
      case HnListSource.Front:
        this.setState({ frontItems: data });
        break;
      case HnListSource.Day:
        this.setState({ dayItems: data });
        break;
      case HnListSource.Week:
        url = "/topstories/week";
        break;
      case HnListSource.Month:
        url = "/topstories/month";
        break;
    }
  }

  updateFrontItems(items: HnItem[] | undefined): void {
    console.log("new items2 front", items);
    this.setState({ frontItems: items }, () => {
      const isActive = this.props.activeList === HnListSource.Front;

      if (items === undefined) {
        // load data here
        this.loadData(HnListSource.Front);
        return;
      }

      this.props.dataSourceUpdated(items, isActive);
    });
  }

  updateDayItems(items: HnItem[] | undefined): void {
    console.log("new items2 day", items);
    this.setState({ dayItems: items }, () => {
      const isActive = this.props.activeList === HnListSource.Day;

      if (items === undefined) {
        // load data here
        this.loadData(HnListSource.Day);
        return;
      }

      this.props.dataSourceUpdated(items, isActive);
    });
  }
}

interface LocalStorageWrapperProps<TDataType> {
  storageName: string;
  activeItem: TDataType | undefined;

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
    console.log("wrapper mounted", this.props.storageName);
    const item = localStorage.getItem(this.props.storageName);
    if (item === undefined || item === null) {
      this.setState({ item: undefined }, () =>
        this.props.dataDidUpdate(undefined)
      );
      return;
    }

    console.log("found item", item);

    // parse JSON for what was found

    const obj = JSON.parse(item) as TDataType;

    this.setState({ item: obj }, () => this.props.dataDidUpdate(obj));
  }

  componentDidUpdate(
    prevProps: LocalStorageWrapperProps<TDataType>,
    prevState: LocalStorageWrapperState<TDataType>
  ) {
    // if activeItem changed... save to local storage.. update self
    console.log("state update wrappeR", this.props.storageName, this.props);
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

      localStorage.setItem(
        this.props.storageName,
        JSON.stringify(this.props.activeItem)
      );

      this.setState({ item: this.props.activeItem }, () =>
        this.props.dataDidUpdate(this.props.activeItem)
      );
    }
  }
}
