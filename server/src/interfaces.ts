import { Item } from "./item";

export interface HasTime {
  lastUpdated: number; // UNIX timestamp in seconds
}

export interface TopStories extends HasTime {
  items: number[];
  id: TopStoriesType;
}

export interface ItemExt extends Item, HasTime {
  firstLayerOnly?: boolean;
}

export interface TopStoriesParams {
  type: TopStoriesType;
}

export type TopStoriesType = "topstories" | "day" | "week" | "month";

export interface ItemParams {
  id: number;
}
