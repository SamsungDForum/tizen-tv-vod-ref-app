/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect, useState } from "react";

export function useVideoLoadingState(video: HTMLVideoElement) {
  const [showLoading, setShowLoading] = useState(false);

  const setLoadingState = () => setShowLoading(true);
  const handleBind = () => {
    if (video?.readyState) setShowLoading(false);
  };

  useEffect(() => {
    video?.addEventListener("timeupdate", handleBind);
    video?.addEventListener("waiting", setLoadingState);
    if (video?.src === "") setShowLoading(false);

    return () => {
      video?.removeEventListener("timeupdate", handleBind);
      video?.removeEventListener("waiting", setLoadingState);
    };
  }, [video]);
  return showLoading;
}
