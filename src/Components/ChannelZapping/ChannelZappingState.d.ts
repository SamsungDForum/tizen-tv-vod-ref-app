declare module "redux-states" {
  export interface ChannelZappingState {
    channelID: number;
    channelList: {
      title: 'All' | 'Subtitles' | 'Multiple Audio' | '4K' | 'Live' | 'DRM';
      list: Array<number>;
    };
    currentRowID: number;
  }
}