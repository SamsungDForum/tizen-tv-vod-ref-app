/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const PlayerType = ['shaka', 'bitmovin', 'hlsjs', 'dashjs'] as const;

type PlayerType = typeof PlayerType[number];

export type { PlayerType };