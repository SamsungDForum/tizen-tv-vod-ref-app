import { subtitle as subtitleDispatch } from '../../../utils/setting';

function onSubtitleChanged(player: shaka.ShakaInstance): void {
  subtitleDispatch({ current: player.currentTextLanguage_ , list: null })
}

export default onSubtitleChanged;