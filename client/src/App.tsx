import "./App.css";

import _ from "lodash";
import React, { RefObject } from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router";

import { DataLayer } from "./DataLayer";
import { Header } from "./Header";
import { HnStoryList } from "./HnStoryList";
import { HnStoryPage } from "./HnStoryPage";

interface StoryPageProps extends RouteComponentProps<{ id: string }> {}
interface AppPageProps extends RouteComponentProps<{ page?: string }> {}

class _App extends React.Component<AppPageProps, AppState> {
  dataLayer: RefObject<DataLayer>;

  static getDerivedStateFromProps(props: AppPageProps, state: AppState) {
    let listType: HnListSource;
    switch (props.match.params.page) {
      case "day":
        listType = HnListSource.Day;
        break;

      case "week":
        listType = HnListSource.Week;
        break;

      case "month":
        listType = HnListSource.Month;
        break;

      default:
        listType = HnListSource.Front;
        break;
    }

    console.log("derived state", props.match.params.page, listType);

    return { ...state, activeList: listType };
  }

  constructor(props: AppPageProps) {
    super(props);

    this.state = {
      items: [],
      allItems: [],
      activeList: HnListSource.Front
    };

    this.dataLayer = React.createRef();

    this.updateActiveDataStore = this.updateActiveDataStore.bind(this);
    this.newItemsProvided = this.newItemsProvided.bind(this);
  }

  updateActiveDataStore(items: HnItem[], isActive: boolean) {
    if (isActive) {
      this.setState({ items });
    }

    // this is needed to ensure that state updates are atomic
    // all new items need to be joined together... cannot skip updatesÍ
    this.setState(prevState => {
      let allItems = _.cloneDeep(prevState.allItems).concat(items);
      allItems = _.uniqBy(allItems, c => c.id);
      console.log("new all itemS", allItems);
      return { allItems };
    });
  }

  render() {
    console.log("render state", this.state);
    return (
      <div>
        <DataLayer
          ref={this.dataLayer}
          provideNewItems={this.newItemsProvided}
        />

        <Header requestNewData={() => {
                  this.dataLayer.current!.updateNewItems(
                    undefined,
                    this.state.activeList
                  );
                  this.setState({ items: [] });
                }}/>

        <Switch>
          <Route
            path={"/story/:id"}
            exact
            render={(props: StoryPageProps) => (
              <HnStoryPage
                data={
                  this.dataLayer.current === null
                    ? undefined
                    : this.dataLayer.current.getStoryData(
                        +props.match.params.id
                      )
                }
              />
            )}
          />
          <Route
            path="/:page?"
            render={(props: AppPageProps) => (
              <HnStoryList
                items={
                  this.dataLayer.current === null
                    ? []
                    : this.dataLayer.current.getPageData(
                        props.match.params.page
                      )
                }
                
              />
            )}
          />
        </Switch>
      </div>
    );
  }
  newItemsProvided(items: HnItem[], listType: HnListSource): void {
    if (listType === this.state.activeList) {
      this.setState({ items });
    }
  }
}

export const App = withRouter(_App);

export enum HnListSource {
  Front,
  Day,
  Week,
  Month
}

interface AppState {
  items: HnItem[];
  allItems: HnItem[];

  activeList: HnListSource;
}
