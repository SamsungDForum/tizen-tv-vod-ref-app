import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioListLoaded(event: Event) {
  const list = Array.from(event.audioTracks, (item: any) => item.lang);
  audioDispatch({ current: 'default', list: list });
}

export default onAudioListLoaded;