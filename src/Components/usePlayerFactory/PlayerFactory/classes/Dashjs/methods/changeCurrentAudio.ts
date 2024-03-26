import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Dashjs from "../";

const changeCurrentAudio = function(this: Dashjs, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const targetAudio = player
      .getTracksFor("audio")
      .find(track => track.lang === audio.option && track.codec.includes(audio.category));

    if(targetAudio != null) {
      player.setCurrentTrack(targetAudio);
    }
    res(player);
  }));
};

export default changeCurrentAudio;