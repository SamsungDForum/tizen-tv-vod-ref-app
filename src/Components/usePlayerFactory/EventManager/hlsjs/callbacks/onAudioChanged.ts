import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioChanged(event: Event) {
  const { lang } = event;

  audioDispatch({ current: lang, list: null});
}

export default onAudioChanged;