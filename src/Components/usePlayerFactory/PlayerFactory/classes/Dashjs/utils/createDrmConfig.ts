import type { Media } from "../../../../utils/playAssetCurrentTypes";

function createDrmConfig(media: Media):
  | undefined 
  | {
      [key: string]: {
        serverURL?: string;
        priority?: number;
      };
    }  {
  if(!isAuthicationRequired(media)) {
      return;
  }

  if(isDrmLicenseProvided(media)) {
    if(media.drmType == null) {
      return;
    }
    
    return {
      [media.drmType]: {
          serverURL: media.licenseServerURL
      },
    };
  }

  if(isDrmPreferenceProvided(media)) {
    return media.drmPreference?.reduce((result, item) => {
        return { [item]: {
            priority: 0
        }, ...result};
    }, {});
  }

  return;

  function isAuthicationRequired(media: Media) {
    return media.requiresAuth === true;
  }

  function isDrmLicenseProvided(media: Media) {
    return media.hasOwnProperty('licenseServerURL');
  }

  function isDrmPreferenceProvided(media: Media) {
    return media.hasOwnProperty('drmPreference');
  }
}

export { createDrmConfig };