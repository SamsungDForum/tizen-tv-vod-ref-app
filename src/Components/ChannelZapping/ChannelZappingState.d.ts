/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare module "redux-states" {
  export interface ChannelZappingState {
    channelID: number;
    channelList: {
      title: 'All' | 'Subtitles' | 'Multiple Audio' | '4K' | 'Live' | 'DRM';
      list: Array<number>;
    };
    currentRowID: number;
  }
}