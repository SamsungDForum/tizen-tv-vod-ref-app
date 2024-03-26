import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Bitmovin from "..";

const changeCurrentAudio = function(this: Bitmovin, audio: Audio): void {
  this.player = this.player.then(player => new Promise(res => {
    const audioList = player.getAvailableAudio();
    const targetAudio = audioList.find(item => item.lang === audio.option && item.id.includes(audio.category));
    player.setAudio(targetAudio.id);
    res(player);
  }))
};

export default changeCurrentAudio;