import { getVideoElement } from "../../utils/getVideoElement";
import Shaka from "../";

const createPlayer = function(this: Shaka): Promise<shaka.ShakaInstance> {
  return new Promise(res => {
    const videoElement = getVideoElement();
    const player = new window.shaka.Player(videoElement);

    if (window.shaka.polyfill && window.shaka.polyfill.installAll) {
      window.shaka.polyfill.installAll();
    }

    console.log(`${Shaka.name} has been created`);
    res(player);
  });
}

export default createPlayer;