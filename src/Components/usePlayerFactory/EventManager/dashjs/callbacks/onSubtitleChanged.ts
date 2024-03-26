import { subtitle as subtitleDispatch } from "../../../utils/setting";

type Event = Parameters<dashjs.Events.QualityChangeRenderedCallback>[0];

function onSubtitleChanged(event: Event, player: dashjs.MediaPlayerClass): void {
  if (event.mediaType === 'text') {
    const index = player.getCurrentTextTrackIndex();
    const textTracks = player.getTracksFor('text');
    const currentTrack = textTracks[index];

    subtitleDispatch({ current: currentTrack.lang, list: null });
  }
}

export default onSubtitleChanged;