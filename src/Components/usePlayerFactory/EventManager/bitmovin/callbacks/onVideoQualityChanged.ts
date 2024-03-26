import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = Parameters<bitmovin.Events.VideoQualityChangedCallback>[0];

function onVideoQualityChanged(event: Event) {
  const { width, height } = event.targetQuality;
  videoQualityDispatch({ current: `${width} x ${height}`, list: null });
}

export default onVideoQualityChanged;