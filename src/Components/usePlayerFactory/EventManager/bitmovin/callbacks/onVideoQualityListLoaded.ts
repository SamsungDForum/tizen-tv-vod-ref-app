import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

function onVideoQualityListLoaded(player: bitmovin.BitmovinInstance) {
  const list = player.getAvailableVideoQualities()
    .map(quality => `${quality.width} x ${quality.height}`);
  
  videoQualityDispatch({ current: 'auto', list });
}

export default onVideoQualityListLoaded;