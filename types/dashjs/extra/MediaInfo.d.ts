declare namespace dashjs {
  type MediaInfo = {
    KID: any | null;
    accessibilitiesWithSchemeIdUri: any[];
    accessibility: any[];
    audioChannelConfiguration: any[];
    audioChanngelConfigurationWithSchemeIdUri: any[];
    bitrateList: {
      bandwidth: number;
      width: number;
      height: number;
      scanType: string;
      id: string;
    }[];
    codec: string;
    contentProtection: any;
    id: string | null;
    index: number;
    isEmbedded: boolean;
    isFragmented: boolean;
    isText: boolean;
    labels: any[];
    lang: string;
    mimeType: string;
    representationCount: number;
    roles: any[];
    rolesWithSchemeIdUri: any[];
    segmentAlignment: boolean;
    selectionPriority: number;
    streamInfo: StreamInfo; 
    subSegmentAlignment: boolean;
    supplementalProperties: { [key: string]: any };
    supplementalPropertiesAsArray: any[];
    type: MediaType;
    viewpoint: any;
    viewpointsWithSchemeIdUri: any[];
  };
}