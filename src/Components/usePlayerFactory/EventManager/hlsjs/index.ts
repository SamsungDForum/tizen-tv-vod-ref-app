import { onAudioChanged, onAudioListLoaded, onSubtitleChanged, onSubtitleListLoaded, onVideoQualityChanged, onVideoQualityListLoaded } from "./callbacks";

class HlsjsEventManager {
  private constructor() {}

  static register(player: hlsjs.HlsjsInstance) {
    player.on('hlsAudioTracksUpdated', (_, event) => onAudioListLoaded(event)); 
    player.on('hlsSubtitleTracksUpdated', (_, event) => onSubtitleListLoaded(event));
    player.on('hlsManifestParsed', (_, event) => onVideoQualityListLoaded(event));
    player.on('hlsAudioTrackSwitched', (_, event) => onAudioChanged(event));
    player.on('hlsSubtitleTrackLoaded', (_, event) => onSubtitleChanged(event, player));
    player.on('hlsLevelSwitched', (_, event) => onVideoQualityChanged(event, player));
  }
}

export { HlsjsEventManager };