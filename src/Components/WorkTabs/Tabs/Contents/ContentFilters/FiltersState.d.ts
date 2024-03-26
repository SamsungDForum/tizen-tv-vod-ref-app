declare module "redux-states" {
  export interface FiltersState {
    value: {
      SRC: 'All' | 'Azure' | 'Akamai' | 'DASH-IF' | 'Telecom Paris' | 'Verizon';
      DRM: 'All' | 'No DRM' | 'Play Ready' | 'Clear Key' | 'Widevine';
      Container: 'All' | 'Mp4' | 'Webm' | 'Containerless';
      Manifest: 'All' | 'DASH' | 'HLS' | 'MSS';
    }
  }
}