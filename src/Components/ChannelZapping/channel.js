import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../../reduxStore/store";
import { setChannelID } from "./ChannelZappingSlice";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { KeyName, getKey } from "../KeyEvents";
import { debounce } from "lodash";
const channel = () => {
  const isVideoFullScreenOn = useSelector((state) => state.VideoFullScreen.value);
  const media = useSelector((state) => state.playAsset.value.media);

  const channelId = useSelector((state) => state.ChannelZapping.channelID);
  const data = useSelector((state) => state.ChannelZapping.channelList);

  React.useEffect(() => {
    const playerWindow = document.getElementById("top-player-window");

    const handleKeyDown = (e) => {
      const key = getKey(e);
      const index = data?.list?.findIndex((item) => item?.id === media?.id);

      if (index !== -1) {
        if (key === KeyName.CHANNEL_DOWN) {
          if (channelId === 0) {
            return;
          } else {
            dispatch(setChannelID(channelId - 1));
          }
        } else if (key === KeyName.CHANNEL_UP) {
          if (channelId === data?.list?.length - 1) {
            return;
          } else {
            dispatch(setChannelID(channelId + 1));
          }
        }
      }
    };

    playerWindow?.addEventListener("keydown", handleKeyDown);

    return () => {
      playerWindow?.removeEventListener("keydown", handleKeyDown);
    };
  }, [channelId, media?.id]);

  React.useEffect(() => {
    const getData = debounce(() => {
      if (data[channelId]?.list?.id !== media?.id) {
        setMedia(data?.list[channelId]);
      }
    }, 500);

    getData();

    return () => getData.cancel();
  }, [channelId]);
};

export default channel;
