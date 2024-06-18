/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { videoQuality as videoQualityDispatch } from "../../../utils/setting";

type Event = Parameters<bitmovin.Events.VideoQualityChangedCallback>[0];

function onVideoQualityChanged(event: Event) {
  const { width, height } = event.targetQuality;
  videoQualityDispatch({ current: `${width} x ${height}`, list: null });
}

export default onVideoQualityChanged;