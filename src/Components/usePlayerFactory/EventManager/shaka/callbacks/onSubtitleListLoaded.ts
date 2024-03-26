import { subtitle as subtitleDispatch } from "../../../utils/setting";

function onSubtitleListLoaded(player: shaka.ShakaInstance) {
  const list =  player.getTextLanguagesAndRoles()
    .map(item => item.language);

  subtitleDispatch({ current: 'off', list });
}

export default onSubtitleListLoaded;