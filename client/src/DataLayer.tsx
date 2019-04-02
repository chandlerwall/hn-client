import _ from "lodash";
import React from "react";

import { HnListSource } from "./App";
import { LocalStorageWrapper } from "./LocalStorageWrapper";

interface DataLayerState {
  allItems: HnItem[];

  currentLists: DataList[];
}

export interface DataList {
  key: HnListSource;
  stories: number[]; // will be an array of IDs
}

interface DataLayerProps {
  provideNewItems(items: HnItem[], listType: HnListSource): void;
}

export class DataLayer extends React.Component<DataLayerProps, DataLayerState> {
  refreshData(activeList: HnListSource): void {}
  constructor(props: DataLayerProps) {
    super(props);

    this.state = {
      allItems: [],
      currentLists: []
    };
  }

  render() {
    // TODO: generalize the comps and events for the data type (don't duplicate)
    return (
      <React.Fragment>
        <LocalStorageWrapper<HnItem[]>
          dataDidUpdate={item => this.updateNewItems(item, HnListSource.Front)}
          activeItem={this.state.allItems}
          storageName="HN-ALL-ITEMS"
        />

        <LocalStorageWrapper<DataList[]>
          dataDidUpdate={item => console.log("item list did update", item)}
          activeItem={this.state.currentLists}
          storageName="HN-DATA-LISTS"
        />
      </React.Fragment>
    );
  }

  async getStoryData(id: number) {
    let item = this.state.allItems.find(c => c.id === id);
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

    if (page === "" || page === undefined) {
      page = "front";
    }

    const pageToSourceMapping: { [key: string]: HnListSource } = {
      day: HnListSource.Day,
      week: HnListSource.Week,
      month: HnListSource.Month,
      front: HnListSource.Front
    };

    const source = pageToSourceMapping[page];

    if (source === undefined) {
      console.error("unknown page -> source map");
      return [];
    }

    const idsToLoad = this.state.currentLists.find(c => c.key === source);

    if (idsToLoad === undefined) {
      // TODO: this needs to fire off an update
      console.error("bad key given?");
      return [];
    }

    const dataOut = idsToLoad.stories
      .map(id => this.state.allItems.find(c => c.id === id))
      .filter(c => c !== undefined) as HnItem[];

    return dataOut;
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
    let data: HnItem[] = await response.json();

    if (activeList !== HnListSource.Front) {
      // flip score to get descending
      data = _.sortBy<HnItem>(data, c => -c.score);
    }

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

    // replace the list with the new IDs
    const newList = data.map(c => c.id);

    const newDataList = _.cloneDeep(this.state.currentLists);

    let listToUpdate = newDataList.find(c => c.key === listType);

    if (listToUpdate === undefined) {
      newDataList.push({
        key: listType,
        stories: newList
      });
    } else {
      listToUpdate.stories = newList;
    }

    // get all items... replace those whose data is newer in this version

    const newAllItems = _.cloneDeep(this.state.allItems);

    const storiesToReturn: HnItem[] = [];

    data.forEach(newStory => {
      const existingStoryIndex = newAllItems.findIndex(
        c => c.id === newStory.id
      );

      // add the story if it is new
      if (existingStoryIndex === -1) {
        newAllItems.push(newStory);
        storiesToReturn.push(newStory);
        return;
      }

      // check the data if already found
      const existingStory = newAllItems[existingStoryIndex];
      if (existingStory.lastUpdated > newStory.lastUpdated) {
        storiesToReturn.push(existingStory);
        return;
      }

      newAllItems[existingStoryIndex] = newStory;
      storiesToReturn.push(newStory);

      // new story is actually newer... replace its data
    });

    // update otherwise

    this.setState({ allItems: newAllItems, currentLists: newDataList }, () => {
      this.props.provideNewItems(storiesToReturn, listType);
    });
  }
}
