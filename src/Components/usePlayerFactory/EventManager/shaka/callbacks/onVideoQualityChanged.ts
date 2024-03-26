import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = { [key: string]: any };

function onVideoQualityChanged(event: Event) {
  const { oldTrack, newTrack } = event;
  const { width, height, mimeType, videoId } = newTrack;
  const { videoId: oldVideoId } = oldTrack;

  if (videoId !== oldVideoId) {
    const current = `${mimeType.split('/')[1]} ${width} x ${height}`;
    videoQualityDispatch({ current, list: null});
  }
}

export default onVideoQualityChanged;