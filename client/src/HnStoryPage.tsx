import React from "react";
import { HnComment } from "./HnComment";
import { timeSince } from "./timeSince";
import { getDomain } from "./getDomain";
import { DataLayer } from "./DataLayer";

interface HnStoryPageState {
  data: HnItem | undefined;
}

export interface HnStoryPageProps {
  dataLayer: DataLayer | null;
  id: number;
}

export class HnStoryPage extends React.Component<
  HnStoryPageProps,
  HnStoryPageState
> {
  constructor(props: HnStoryPageProps) {
    super(props);

    this.state = {
      data: undefined
    };
  }

  render() {
    if (this.state.data === undefined) {
      return null;
    }

    const storyData = this.state.data;

    const comments = storyData.kidsObj || [];
    return (
      <div>
        <h2>
          <a href={storyData.url}>{storyData.title}</a>
        </h2>
        <h4>
          <span>{storyData.by}</span>
          <span>{" | "}</span>
          <span>{storyData.score}</span>
          <span>{" | "}</span>
          <span>{timeSince(storyData.time)} ago</span>
          <span>{" | "}</span>
          <span>{getDomain(storyData.url)}</span>
        </h4>

        {storyData.text !== undefined && (
          <p dangerouslySetInnerHTML={{ __html: storyData.text }} />
        )}

        {comments.map(comment => (
          <HnComment key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    // set the data initially -- kick off async request if needed
    this.updateDataFromDataLayer();
  }

  private async updateDataFromDataLayer() {
    const storyData = await this.getStoryData(this.props.id);

    this.setState({ data: storyData });
  }

  componentDidUpdate(prevProps: HnStoryPageProps) {
    // load the story once the data layer is available
    if (prevProps.dataLayer === null && this.props.dataLayer !== null) {
      this.updateDataFromDataLayer();
    }
  }

  private async getStoryData(id: number): Promise<HnItem | undefined> {
    return this.props.dataLayer === null
      ? undefined
      : await this.props.dataLayer.getStoryData(id);
  }
}
