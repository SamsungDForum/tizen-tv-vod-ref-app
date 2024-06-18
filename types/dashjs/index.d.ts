/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare namespace dashjs {
  export interface index {
    Debug(): SingletonFactory<Debug>;
    FactoryMaker: FactoryMaker;
    MediaPlayer(): Factory<MediaPlayerClass>;
    MediaPlayerFactory: {
      create: () => unknown;
      createAll: () => unknown;
    };
    MetricsReporting(): Factory<MetricsReporting>;
    Protection(): Factory<Protection>;
    Version: string;
    supportsMediaSource(): boolean;
  }
}
