import { subtitle as subtitleDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onSubtitleListLoaded(event: Event) {
  const list = event.subtitleTracks
    .map(item => item.lang);

  subtitleDispatch({ current: 'off', list});
}

export default onSubtitleListLoaded;