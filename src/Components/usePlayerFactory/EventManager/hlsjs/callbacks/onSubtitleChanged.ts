import { subtitle as subtitleDispatch } from '../../../utils/setting';

type Event = { [key: string]: any };

function onSubtitleChanged(event: Event, player: hlsjs.HlsjsInstance): void {
  const { id } = event;

  const currentSubtitle = player.subtitleTracks.find(track => track.id === id);
  subtitleDispatch({ current: currentSubtitle.lang, list: null });
}

export default onSubtitleChanged;