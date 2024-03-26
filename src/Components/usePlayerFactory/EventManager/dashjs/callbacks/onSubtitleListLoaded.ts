import { subtitle as subtitleDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onSubtitleListLoaded(event: Event, player: dashjs.MediaPlayerClass): void {
  if (event.tracks.length === 0) {
    subtitleDispatch({ list: [], current: 'off' });
    return;
  }
  subtitleDispatch({ list: event.tracks.map(track => track.lang), current: 'off' });
  player.setTextTrack(-1);
}

export default onSubtitleListLoaded;