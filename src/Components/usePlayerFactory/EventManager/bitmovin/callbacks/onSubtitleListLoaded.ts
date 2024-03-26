import { subtitle as subtitleDispatch } from "../../../utils/setting";

function onSubtitleListLoaded(player: bitmovin.BitmovinInstance) {
  const list = player.subtitles.list()
    .map(item => item.lang);

  subtitleDispatch({ current: 'off', list });
}

export default onSubtitleListLoaded;