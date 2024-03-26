import { Subtitle } from "../../../../utils/playAssetCurrentTypes";
import Dashjs from "../";

const changeCurrentSubtitles = function(this: Dashjs, subtitles: Subtitle): void {
  this.player = this.player.then(player => new Promise(res => {
    if(subtitles.category === 'off') {
      player.setTextTrack(-1);
      res(player);
      return;
    }

    const track = player.getTracksFor('text')!.find(item => item.lang === subtitles.category)!;
    player.setTextTrack(track.index);
    res(player);
  })); 
}

export default changeCurrentSubtitles;