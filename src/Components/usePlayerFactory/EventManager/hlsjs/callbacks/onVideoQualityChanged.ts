import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onVideoQualityChanged(event: Event, player: hlsjs.HlsjsInstance) {
  const currentLevel = player.levels[event.level];
  const codec = currentLevel.videoCodec;
  const current = `${codec} ${currentLevel.width} x ${currentLevel.height}`;
  videoQualityDispatch({ current, list: null });
}

export default onVideoQualityChanged;