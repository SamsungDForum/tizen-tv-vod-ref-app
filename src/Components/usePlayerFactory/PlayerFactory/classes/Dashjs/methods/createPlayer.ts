import { getVideoElement } from "../../utils/getVideoElement";
import Dashjs from "../";

const createPlayer = function(this: Dashjs): Promise<dashjs.MediaPlayerClass> {
  return new Promise(res => {
    const player = window.dashjs!.MediaPlayer().create();
    const videoElement = getVideoElement();
    player.initialize(videoElement, null, true);
    player.updateSettings({
      streaming: {
        trackSwitchMode: {
          video: 'alwaysReplace'
        },
        buffer: {
          flushBufferAtTrackSwitch: true,
          fastSwitchEnabled: false
        },
      }
    });
    console.log(`${Dashjs.name} has been created`);
    res(player);
  });
}

export default createPlayer;