import { getVideoElement } from "../../utils/getVideoElement";
import Hlsjs from "..";

const createPlayer = function(this: Hlsjs): Promise<hlsjs.HlsjsInstance> {
  return new Promise(res => {
    const videoElement = getVideoElement();
    const player = new window.Hls({ startPosition: 0 });
    player.attachMedia(videoElement);
    console.log(`${Hlsjs.name} has been created`);
    res(player);
  });
}

export default createPlayer;