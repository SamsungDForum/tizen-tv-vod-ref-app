import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";

const ChannelInfo = () => {
  const allowFloating = reqTizenVersion(4);
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const media = useSelector((state) => state.playAsset.value.media);
  const data = useSelector((state) => state.ChannelZapping.channelList);
  const channelId = useSelector((state) => state.ChannelZapping.channelID);
  const isOverlayVisible = useSelector((state) => state.OverlayVisible.value);

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
