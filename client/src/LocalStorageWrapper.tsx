import _ from "lodash";
import React from "react";
import LZString from "lz-string";
import localForage from "localforage";

export interface LocalStorageWrapperProps<TDataType> {
  storageName: string;
  activeItem: TDataType;

  dataDidUpdate(item: TDataType | undefined): void;
}

export interface LocalStorageWrapperState<TDataType> {
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
  async componentDidMount() {
    // check localStorage for obj
    const itemCompressed = await localForage.getItem<string>(
      this.props.storageName
    );
    // decompress
    if (itemCompressed === undefined || itemCompressed === null) {
      this.setState({ item: undefined }, () =>
        this.props.dataDidUpdate(undefined)
      );
      return;
    }
    const item = LZString.decompress(itemCompressed);
    // seems to be some sort of corruption on load.. clear localStorage
    if (item === null) {
      localForage.removeItem(this.props.storageName);
      this.setState({ item: undefined }, () =>
        this.props.dataDidUpdate(undefined)
      );
      return;
    }
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
      const strToStoreCompressed = LZString.compress(strToStore);
      localForage.setItem(this.props.storageName, strToStoreCompressed);
      this.setState({ item: this.props.activeItem }, () =>
        this.props.dataDidUpdate(this.props.activeItem)
      );
    }
  }
}
