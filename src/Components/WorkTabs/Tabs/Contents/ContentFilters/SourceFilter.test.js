/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { FilterEnums } from "./FiltersSlice";
import { createSourceFilter } from "./ContentFilters";
import { it, expect, describe } from "vitest";

describe("function createSourceFilter", () => {
  const dataSet = [
    {
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      url: "http://dash.edgesuite.net/envivio/dashpr/clear/Manifest.mpd",
    },
    {
      url: "http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-manifest.mpd",
    },
    {
      url: "https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd",
    },
    {
      url: "https://amssamples.streaming.mediaservices.windows…e1/BigBuckBunny.ism/manifest(format=mpd-time-csf)",
    },
    {
      url: "https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd",
    },
    {
      url: "https://livesim.dashif.org/livesim-chunked/chunkdur_1/ato_7/testpic4_8s/Manifest300.mpd",
    },
    {
      url: "https://bitdash-a.akamaihd.net/content/MI201109210…4_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    },
    {
      url: "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd",
    },
    {
      url: "https://akamaibroadcasteruseast.akamaized.net/cmaf/live/657078/akasource/out.mpd",
    },
    {
      url: "https://cf-sf-video.wmspanel.com/local/raw/BigBuckBunny_320x180.mp4/manifest.mpd",
    },
    {
      url: "https://download.tsi.telecom-paristech.fr/gpac/DAS…ch/mp4-main-single/mp4-main-single-mpd-AV-NBS.mpd",
    },
    {
      url: "https://content.uplynk.com/847859273a4b4a81959d8fe…-EDCC-4035-8D4B-DC71760D43E9&pr.securitylevel=150",
    },
    {
      url: "https://test.playready.microsoft.com/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/manifest",
    },
    {
      url: "http://mirrors.ucr.ac.cr/blender/demo/movies/BBB/bbb_sunflower_1080p_30fps_normal.mp4",
    },
  ];

  const getSRCVideos = function (SRCJsonType) {
    return dataSet.filter((x) => {
      if (x.url.includes(SRCJsonType)) {
        return true;
      } else {
        return false;
      }
    });
  };

  it("should return all videos when SRCFilter.value is set to ALL", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.ALL);

    const result = dataSet.filter(filterFunction);
    const allVideos = dataSet;

    expect(result).toStrictEqual(allVideos);
  });

  it("should return Azure videos when SRCFilter.value is set to AZURE", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.AZURE);

    const result = dataSet.filter(filterFunction);
    const azureVideos = getSRCVideos(FilterEnums.SRC.AZURE);

    expect(result).toStrictEqual(azureVideos);
  });

  it("should return Akamai videos when SRCFilter.value is set to AKAMAI", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.AKAMAI);

    const result = dataSet.filter(filterFunction);
    const akamaiVideos = getSRCVideos(FilterEnums.SRC.AKAMAI);

    expect(result).toStrictEqual(akamaiVideos);
  });

  it("should return DASH-IF videos when SRCFilter.value is set to DASH_IF", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.DASH_IF);

    const result = dataSet.filter(filterFunction);
    const dashifVideos = getSRCVideos(FilterEnums.SRC.DASH_IF);

    expect(result).toStrictEqual(dashifVideos);
  });

  it("should return Telecom Paris videos when SRCFilter.value is set to PARIS", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.PARIS);

    const result = dataSet.filter(filterFunction);
    const parisVideos = getSRCVideos(FilterEnums.SRC.PARIS);

    expect(result).toStrictEqual(parisVideos);
  });

  it("should return Verizon videos when SRCFilter.value is set to VERIZON", () => {
    const filterFunction = createSourceFilter(FilterEnums.SRC.VERIZON);

    const result = dataSet.filter(filterFunction);
    const verizonVideos = getSRCVideos(FilterEnums.SRC.VERIZON);

    expect(result).toStrictEqual(verizonVideos);
  });
});
