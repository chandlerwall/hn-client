import "./App.css";

import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";

import { DataLayer } from "./DataLayer";
import { Header } from "./Header";
import { HnStoryList } from "./HnStoryList";
import { HnStoryPage } from "./HnStoryPage";
import _ from "lodash";

interface HomeRouterProps {
  id: string; // This one is coming from the router
}

interface HomeProps extends RouteComponentProps<HomeRouterProps> {
  // Add your regular properties here
}

export class AppRouter extends React.Component {
  render() {
    const routes = [
      { path: "/", source: HnListSource.Front },
      { path: "/day", source: HnListSource.Day },
      { path: "/week", source: HnListSource.Week },
      { path: "/month", source: HnListSource.Month }
    ];
    return (
      <Switch>
        {routes.map(route => (
          <Route
            path={route.path}
            exact
            key={route.path}
            render={() => <App activeList={route.source} storyId={undefined} />}
          />
        ))}

        <Route
          path={"/story/:id"}
          exact
          render={(props: HomeProps) => (
            <App activeList={undefined} storyId={+props.match.params.id} />
          )}
        />
      </Switch>
    );
  }
}

interface AppProps {
  activeList: HnListSource | undefined;
  storyId: number | undefined;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      items: [],
      allItems: []
    };

    this.updateActiveDataStore = this.updateActiveDataStore.bind(this);
  }

  updateActiveDataStore(items: HnItem[], isActive: boolean) {
    if (isActive) {
      this.setState({ items });
    }
    
    this.setState(prevState => {
      let allItems = _.cloneDeep(prevState.allItems).concat(items);
      allItems = _.uniqBy(allItems, c => c.id);
      console.log("new all itemS", allItems);
      return { allItems };
    });
  }

  render() {
    console.log("app render", this.props.activeList);

    console.log(
      "active id",
      this.props.storyId,
      this.state.allItems.find(item => item.id === this.props.storyId)
    );
    const mainContent =
      this.props.storyId === undefined ? (
        <HnStoryList items={this.state.items} />
      ) : (
        <HnStoryPage
          data={
            this.state.allItems.find(item => item.id === this.props.storyId)!
          }
        />
      );
    return (
      <div>
        <DataLayer
          activeList={this.props.activeList}
          dataSourceUpdated={this.updateActiveDataStore}
        />

        <Header />
        {mainContent}
      </div>
    );
  }
}

export enum HnListSource {
  Front,
  Day,
  Week,
  Month
}

interface AppState {
  items: HnItem[];
  allItems: HnItem[];
}
