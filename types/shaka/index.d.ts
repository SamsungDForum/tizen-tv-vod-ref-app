declare namespace shaka {
  export interface index {
    Player: {
      new(element?: HTMLVideoElement, dependencyInjector?: (player: ShakaInstance) => void): ShakaInstance;
    };
    abr: { [index: string]: any };
    ads: { [index: string]: any }; 
    cast: { [index: string]: any };
    dash: { [index: string]: any };
    dependencies: { [index: string]: any };
    hls: { [index: string]: any };
    log: { [index: string]: any };
    media: { [index: string]: any };
    net: { [index: string]: any };
    offline: { [index: string]: any };
    polyfill: { [index: string]: any };
    text: { [index: string]: any };
    util: { [index: string]: any };
  }
}
