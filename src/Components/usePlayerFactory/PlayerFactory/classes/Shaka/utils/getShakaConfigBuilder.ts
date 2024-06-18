/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { playerConfig } from "../../../../../../../configs/player/shaka";
import configBuilder from "../../../../../../../libs/config-builder/shaka/builder";

const getShakaConfigBuilder = () => configBuilder(playerConfig);

export { getShakaConfigBuilder };