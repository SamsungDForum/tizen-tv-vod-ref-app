import { KeySystem, Media } from "../../../../utils/playAssetCurrentTypes";
import { getShakaConfigBuilder } from "../utils/getShakaConfigBuilder";
import Shaka from "../";
import { getPlaybackTime } from "../../../../utils/playAsset";

const setAsset = function(this: Shaka, media: Media, keySystem?: KeySystem): void {
  console.log(`${Shaka.name}: setAsset()`, media);
  this.player = this.player.then(player => new Promise(res => {
    player.unload(false)
      .then(() => {
        const abrEnabled = player.getConfiguration().abr.enabled;
        player.resetConfiguration();
        const builder = getShakaConfigBuilder()
          .setDrm(media)
          .setAssetDrmPreferences(media)
          .setDrmPreference(keySystem)
          .setAbr(abrEnabled);
            
        if (!player.configure(builder.config)) {
          throw `malformed configuration ${builder.config}`;
        }

        const playbackTime = getPlaybackTime();
        console.log('Continuous watching:', playbackTime);
        player.load(media.url, playbackTime, media.contentType);
      }
    );
    res(player);
  }));
}

export default setAsset;