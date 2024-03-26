import { Quality } from "../../../../utils/playAssetCurrentTypes";
import Shaka from "../";

const changeCurrentVideoQuality = function(this: Shaka, quality: Quality): void {
  this.player = this.player.then(player => new Promise(res => {
    if (quality.category === 'auto') {
      player.configure("abr.enabled", true);
    } else {
      player.configure("abr.enabled", false);
      const currentLanguage = player.getVariantTracks().find(item => item.active).language;
      const [width, height] = quality.option!.split("x");
      const qualities = player.getVariantTracks();
      const track = qualities.find(x => {
        return x.height === parseInt(height) && x.width === parseInt(width) && x.language === currentLanguage;
      });

      player.selectVariantTrack(track, true);
    }
    res(player);
  }));
}

export default changeCurrentVideoQuality;