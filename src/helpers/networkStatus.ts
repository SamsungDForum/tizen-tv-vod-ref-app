/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { useEffect, useState } from "react";

export const networkStatus = () => {
  if (typeof webapis == "undefined") return true;
  const [networkStatus, setNetworkStatus] = useState(true);

  function handleNetworkChange(value: number) {
    if (value == webapis.network.NetworkState.GATEWAY_DISCONNECTED) {
      console.log("NETWORK PROBLEMS");
      setNetworkStatus(false);
    } else if (value == webapis.network.NetworkState.GATEWAY_CONNECTED) {
      console.log("NETWORK CONNECTED");
      setNetworkStatus(true);
    }
  }

  useEffect(() => {
    const listenerId = webapis.network?.addNetworkStateChangeListener(handleNetworkChange);

    return () => {
      webapis.network?.removeNetworkStateChangeListener(listenerId);
    };
  }, []);

  return networkStatus;
};
