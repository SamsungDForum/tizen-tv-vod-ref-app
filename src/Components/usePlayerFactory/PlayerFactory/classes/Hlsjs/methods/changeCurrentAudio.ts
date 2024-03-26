import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Hlsjs from "..";

const changeCurrentAudio = function(this: Hlsjs, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const trackId = player.audioTracks.find(item => item.lang === audio.category).id;
    player.audioTrack = trackId;
    res(player);
  }));  
};

export default changeCurrentAudio;