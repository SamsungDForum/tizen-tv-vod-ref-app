import { onAudioChanged, onAudioListLoaded, onSubtitleChanged, onSubtitleListLoaded, onVideoQualityChanged, onVideoQualityListLoaded, onVideoTrackChanged } from './callbacks';

class DashjsEventManager {
  private constructor() {}

  static register(player: dashjs.MediaPlayerClass): void {
    player.on('allTextTracksAdded', event => onSubtitleListLoaded(event, player));
    player.on('playbackMetaDataLoaded', event => onAudioListLoaded(event, player));
    player.on('streamInitialized', () => onVideoQualityListLoaded(player));
    player.on('qualityChangeRendered', event => onSubtitleChanged(event, player));
    player.on('trackChangeRendered', event => onAudioChanged(event));
    player.on('trackChangeRendered', event => onVideoTrackChanged(event, player));
    player.on('qualityChangeRendered', event => onVideoQualityChanged(event, player));
  }
}

export { DashjsEventManager };