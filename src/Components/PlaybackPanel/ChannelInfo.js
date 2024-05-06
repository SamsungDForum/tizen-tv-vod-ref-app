import React from "react";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";

const ChannelInfo = () => {
  const allowFloating = reqTizenVersion(4);
  const isVideoFullScreenOn = useTypedSelector(state => state.VideoFullScreen.value);
  const media = useTypedSelector(state => state.playAsset.value.media);
  const data = useTypedSelector(state => state.ChannelZapping.channelList);
  const channelId = useTypedSelector(state => state.ChannelZapping.channelID);
  const isOverlayVisible = useTypedSelector(state => state.OverlayVisible.value);

  return (
    <div
      className={
        (isVideoFullScreenOn ? "channel-info" : allowFloating ? "channel-info-floating" : null) +
        (isOverlayVisible && media?.id !== undefined ? "" : " hide")
      }
    >
      <div className="row-title">
        <p>Band:</p> <span>{data?.title}</span>
      </div>
      <div className="one-of">
        <p>Channel:</p>
        <span>
          {channelId + 1} / {data?.list?.length}
        </span>
      </div>
    </div>
  );
};

export default ChannelInfo;
