/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { dispatch } from "../../reduxStore/store";
import { setChannelID } from "./ChannelZappingSlice";
import { setMedia } from "../usePlayerFactory/utils/playAsset";
import { KeyName, getKey } from "../KeyEvents";
import { debounce } from "lodash";
import { useTypedSelector } from "../../reduxStore/useTypedSelector";
import { get } from "../../data/VideoContentProvider";

const channel = () => {
  const media = useTypedSelector((state) => state.playAsset.value.media);

  const channelId = useTypedSelector((state) => state.ChannelZapping.channelID);
  const data = useTypedSelector((state) => state.ChannelZapping.channelList);

  React.useEffect(() => {
    const playerWindow = document.getElementById("top-player-window");

    const handleKeyDown = (e) => {
      const key = getKey(e);
      const index = data?.list?.findIndex((id) => id === media?.id);

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
    // Prevent setting "null" media if channel list is not present. 
    if (data.list.length == 0) return;

    const getData = debounce(() => {
      if (data?.list[channelId] !== media?.id) {
        setMedia(get(data?.list[channelId]));
      }
    }, 500);

    getData();

    return () => getData.cancel();
  }, [channelId]);
};

export default channel;
