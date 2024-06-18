/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { PlayerType } from "./PlayerType";

type PlayerConfig = {
  id: number;
  trackId: number;
  label: string;
  type: PlayerType;
  version: string;
  args: {
    src: string;
  };
  isDefault: boolean;
};

export type { PlayerConfig };