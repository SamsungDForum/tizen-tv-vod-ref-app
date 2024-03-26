import { isTizenPlatform, getTizenVersion } from '../../../libs/tizenFilesystem';
import { setStaticPreview, setDynamicPreview } from './backroundServiceHelpers';
import { SETTING_PREVIEW_THROTTLE_TIME } from './constants';
import { createPreviewTilesFromClip } from './createPreviewTilesFromClip';
import _ from 'lodash';

const throttledUseEffect = _.throttle((favClips) => {
  if (!isTizenPlatform() || getTizenVersion() < 5 || favClips === undefined) {
    return;
  }

  if(favClips.length === 0) {
    setStaticPreview();
    return;
  }

  const previewData = {
    sections: [
      {
        title: "Favourites",
        tiles: favClips.map(clip => createPreviewTilesFromClip(clip)),
      },
    ],
  };

  setDynamicPreview(previewData);
}, SETTING_PREVIEW_THROTTLE_TIME);

export default throttledUseEffect;