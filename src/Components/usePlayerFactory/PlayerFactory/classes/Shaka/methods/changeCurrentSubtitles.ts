import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Shaka from "../";

const changeCurrentSubtitles = function(this: Shaka, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if (subtitles.category == 'off') {
      player.setTextTrackVisibility(false);
    } else {
      player.selectTextLanguage(subtitles.category);
      player.setTextTrackVisibility(true);
    }
    res(player);
  }));
}

export default changeCurrentSubtitles;