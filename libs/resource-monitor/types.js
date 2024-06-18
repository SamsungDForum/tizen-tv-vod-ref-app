/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @typedef MemoryInfo
 * @property {number} totalJSHeapSize
 * @property {number} usedJSHeapSize
 * @property {number} jsHeapSizeLimit
 */

/**
 * @typedef TizenWebApplicationInfo
 * @property {number} cpuUsage
 * @property {number} memoryUsage
 */

/**
 * @typedef MemoryAttribution
 * @property {object[]} attribution
 * @property {number} bytes
 * @property {string[]} types
 */

/**
 * @typedef MemoryBreakdownInfo
 * @property {MemoryAttribution[]} breakdown
 * @property {number} bytes
 */
