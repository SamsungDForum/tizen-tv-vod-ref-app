/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FilterEnums } from "./FiltersSlice";
import { createManifestFilter } from "./ContentFilters";
import { it, expect, describe } from "vitest";

describe("function createManifestFilter", () => {
  const dataSet = [
    {
      manifest: "DASH",
    },
    {
      manifest: "HLS",
    },
    {
      manifest: "MSS",
    },
    {
      withoutManifest: true,
    },
  ];

  const getManifestVideos = function (ManifestType) {
    return dataSet.filter((x) => {
      if (x.manifest?.includes(ManifestType)) {
        return true;
      } else {
        return false;
      }
    });
  };

  it("should return all videos when ManifestFilter.value is set to ALL", () => {
    const filterFunction = createManifestFilter(FilterEnums.Manifest.ALL);

    const result = dataSet.filter(filterFunction);
    const allVideos = dataSet;

    expect(result).toStrictEqual(allVideos);
  });

  it("should return DASH videos when ManifestFilter.value is set to DASH", () => {
    const filterFunction = createManifestFilter(FilterEnums.Manifest.DASH);

    const result = dataSet.filter(filterFunction);
    const dashVideos = getManifestVideos(FilterEnums.Manifest.DASH);

    expect(result).toStrictEqual(dashVideos);
  });

  it("should return HLS videos when ManifestFilter.value is set to HLS", () => {
    const filterFunction = createManifestFilter(FilterEnums.Manifest.HLS);

    const result = dataSet.filter(filterFunction);
    const hlsVideos = getManifestVideos(FilterEnums.Manifest.HLS);

    expect(result).toStrictEqual(hlsVideos);
  });

  it("should return MSS videos when ManifestFilter.value is set to MSS", () => {
    const filterFunction = createManifestFilter(FilterEnums.Manifest.MSS);

    const result = dataSet.filter(filterFunction);
    const mssVideos = getManifestVideos(FilterEnums.Manifest.MSS);

    expect(result).toStrictEqual(mssVideos);
  });
});
