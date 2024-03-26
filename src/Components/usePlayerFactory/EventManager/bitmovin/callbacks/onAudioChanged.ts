import { audio as audioDispatch } from "../../../utils/setting";

type Event = Parameters<bitmovin.Events.AudioChangedCallback>[0];

function onAudioChanged(event: Event) {
  const { id, lang } = event.targetAudio;
  const codecType = id
    .split('/')[1]
    .split('-')[0];

  audioDispatch({ current: `${codecType} ${lang}`, list: null });
}

export default onAudioChanged;