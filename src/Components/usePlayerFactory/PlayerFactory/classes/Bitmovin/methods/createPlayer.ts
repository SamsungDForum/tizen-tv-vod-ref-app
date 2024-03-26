import { getBitmovinConfig } from "../utils/getBitmovinConfig";
import { getVideoElement } from "../../utils/getVideoElement";
import Bitmovin from "../";

const createPlayer = function(this: Bitmovin): Promise<bitmovin.BitmovinInstance> {
  return new Promise(res => {
    const config = getBitmovinConfig();
    const videoElement = getVideoElement(); 
    const player = new window.bitmovin!.player.Player(videoElement.parentElement!, config);
    player.setVideoElement(videoElement);
    console.log(`${Bitmovin.name} has been created`);
    res(player);
  });
}

export default createPlayer;