/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { type Media } from '../Components/usePlayerFactory/utils/playAssetCurrentTypes';
import VideoContent from './VideoContent.json';

const map = new Map<number, Media>();
const indexMap = new Map<number, number>();
VideoContent.forEach(item => {
  map.set(item.id, item);
});
VideoContent.forEach((item, index) => {
  indexMap.set(item.id, index);
});

function get(id: number): Media | undefined {
  return map.get(id);
}

function findIndex(id: number): number | undefined {
  return indexMap.get(id);
}

export { get, findIndex };