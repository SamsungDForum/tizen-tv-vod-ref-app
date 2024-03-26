type Media = {
  id: number;
  name: string;
  requiresAuth: boolean;
  live: boolean | undefined;
  url: string;
  poster: string;
  contentType: string | undefined;
  licenseServerURL: string | undefined;
  drmType: string | undefined;
  drmPreference: string[] | undefined;
  widthResolution: number[];
  heightResolution: number[];
  audio: string[];
  manifest: 'DASH' | 'HLS' | 'MSS' | undefined;
  container: string | string[];
  excludedFrom: string | string[] | undefined;
};

type Audio = {
  category: string;
  option: string | null;
};

type Subtitle = {
  category: string;
  option: string | null;
};

type Quality = {
  category: string;
  option: string | null;
};

type KeySystem = {
  category: string;
  option: string | null;
};

const playAssetItemToString = function(item: Audio | Subtitle | Quality | KeySystem): string {
  let str = `${item.category}`;
  if(item.option) {
    str += ` ${item.option}`;
  }
  return str;
}

export { playAssetItemToString };
export type { Media, Audio, Subtitle, Quality, KeySystem };