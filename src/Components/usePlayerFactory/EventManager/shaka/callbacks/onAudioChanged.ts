import { audio as audioDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onAudioChanged(event: Event) {
  const { oldTrack, newTrack } = event;
  const { language, audioId } = newTrack;
  const { audioId: oldAudioId } = oldTrack;

  if (audioId !== oldAudioId) {
    audioDispatch({ current: language, list: null }); 
  }
}

export default onAudioChanged;