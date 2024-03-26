declare namespace dashjs {
  export interface index {
    Debug(): SingletonFactory<Debug>;
    FactoryMaker: FactoryMaker;
    MediaPlayer(): Factory<MediaPlayerClass>;
    MediaPlayerFactory: {
      create: () => unknown;
      createAll: () => unknown;
    };
    MetricsReporting(): Factory<MetricsReporting>;
    Protection(): Factory<Protection>;
    Version: string;
    supportsMediaSource(): boolean;
  }
}
