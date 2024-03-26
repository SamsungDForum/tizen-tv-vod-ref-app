type Event = { [key: string]: any };

function onVideoTrackChanged(event: Event, player: dashjs.MediaPlayerClass) {
  const { mediaType, newMediaInfo } = event;
  if(mediaType === 'video') {
    const { requiredQualityIndex } = newMediaInfo;
    const index = typeof requiredQualityIndex === 'number' ? requiredQualityIndex : 0;
    player.setQualityFor('video', index, true);
  }
}

export default onVideoTrackChanged;