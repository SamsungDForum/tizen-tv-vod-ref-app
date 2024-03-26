import { Audio } from "../../../../utils/playAssetCurrentTypes";
import Shaka from "../";

const changeCurrentAudio = function(this: Shaka, audio: Audio): void {
this.player = this.player.then(player => new Promise(res => {
      player.selectAudioLanguage(audio.category);
      res(player);
    }
  ));  
};

export default changeCurrentAudio;