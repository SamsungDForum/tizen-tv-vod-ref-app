import { audio as audioDispatch } from "../../../utils/setting";

function onAudioListLoaded(player: shaka.ShakaInstance) {
  audioDispatch({ current: 'default', list: player.getAudioLanguages() });
}

export default onAudioListLoaded;