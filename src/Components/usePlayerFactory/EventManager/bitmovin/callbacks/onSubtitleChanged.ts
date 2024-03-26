import { subtitle as subtitleDispatch } from '../../../utils/setting';

type Event = { [key: string]: any };

function onSubtitleChanged(event: Event): void {
  subtitleDispatch({ current: event.subtitle.lang, list: null });
}

export default onSubtitleChanged;