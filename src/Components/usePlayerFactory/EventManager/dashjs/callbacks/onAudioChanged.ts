import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioChanged(event: Event) {
  const { mediaType, newMediaInfo } = event;
  if(mediaType === 'audio') {
    const { lang, codec } = newMediaInfo;
    const current = `${codec.match(/codecs="(.+?)"/)[1]} ${lang}`;
    audioDispatch({ current, list: null });
  }
}

export default onAudioChanged;