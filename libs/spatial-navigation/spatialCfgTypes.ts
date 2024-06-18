/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type SpatialCfg = {
    selector: string;
    straightOnly: boolean;
    straightOverlapThreshold: number;
    rememberSource: boolean;
    disabled: boolean;
    defaultElement: string;    
    enterTo: string;          
    leaveFor: null | Object;             
    restrict: string;
    tabIndexIgnoreList:string;
    navigableFilter: null | Object;
  }