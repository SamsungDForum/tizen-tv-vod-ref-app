/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

declare module "redux-states" {
  export type TabsEnum =
    | "All Clips"
    | "Favorite Clips"
    | "Logs Messages"
    | "Advanced";

  export interface NavigationTabState {
    value: TabsEnum;
  }
}
