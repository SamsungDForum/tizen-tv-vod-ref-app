/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FilterEnums } from "./FiltersSlice";
import {  createContainerFilter  } from "./ContentFilters";
import { it, expect, describe } from "vitest";

describe("function createContainerFilter", () => {
    const dataSet = [
      {
        container: "WEBM",
      },
      {
        container: "MP4",
      },
      {
        container: "Containerless",
      },
      {
        container: ["MP4", "WEBM"],
      },
      {
        withoutContainer: true,
      },
    ];

    const getContainerVideos = function(ContainerType) {
      return dataSet.filter(x => {
        if (x.container?.includes(ContainerType)) {
          return true;
        } else {
          return false;
        }
      });
    };

    it("should return all videos when ContainerFilter.value is set to ALL", () => {
      const filterFunction = createContainerFilter(FilterEnums.Container.ALL);

      const result = dataSet.filter(filterFunction);
      const allVideos = dataSet;

      expect(result).toStrictEqual(allVideos);
    });

    it("should return Containerless videos when ContainerFilter.value is set to Containerless", () => {
      const filterFunction = createContainerFilter(FilterEnums.Container.Containerless);

      const result = dataSet.filter(filterFunction);
      const containerlessVideos = getContainerVideos(FilterEnums.Container.Containerless);

      expect(result).toStrictEqual(containerlessVideos);
    });

    it("should return MP4 videos when ContainerFilter.value is set to MP4", () => {
      const filterFunction = createContainerFilter(FilterEnums.Container.MP4);

      const result = dataSet.filter(filterFunction);
      const mp4Videos = getContainerVideos(FilterEnums.Container.MP4);

      expect(result).toStrictEqual(mp4Videos);
    });

    it("should return WEBM videos when ContainerFilter.value is set to WEBM", () => {
      const filterFunction = createContainerFilter(FilterEnums.Container.WEBM);

      const result = dataSet.filter(filterFunction);
      const webmVideos = getContainerVideos(FilterEnums.Container.WEBM);

      expect(result).toStrictEqual(webmVideos);
    });
  });
