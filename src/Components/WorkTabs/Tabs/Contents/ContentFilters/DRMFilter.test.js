import { FilterEnums } from "./FiltersSlice";
import { createDRMFilter } from "./ContentFilters";
import { it, expect, describe } from "vitest";

describe("function createDRMFilter", () => {
  const dataSet = [

    {
      requiresAuth: true,
      drmType: undefined,
    },
    {
      requiresAuth: false,
      drmType: undefined,
    },
    {
      requiresAuth: true,
      drmType: "com.widevine.alpha",
    },
    {
      requiresAuth: false,
      drmType: "com.widevine.alpha",
    },
    {
      requiresAuth: true,
      drmType: "com.microsoft.playready",
    },
    {
      requiresAuth: false,
      drmType: "com.microsoft.playready",
    },
    {
      requiresAuth: true,
      drmType: "org.w3.clearkey",
    },
    {
      requiresAuth: false,
      drmType: "org.w3.clearkey",
    },
  ];

  const getDRMVideos = function (DRMJsonType) {
    return dataSet.filter((x) => {
      if (x.drmType === DRMJsonType) {
        return true;
      } else {
        return false;
      }
    });
  };

  it("should return all videos when DRMFilter.value is set to ALL", () => {
    const filterFunction = createDRMFilter(FilterEnums.DRM.ALL);

    const result = dataSet.filter(filterFunction);
    const allVideos = dataSet;

    expect(result).toStrictEqual(allVideos);
  });

  it("should return Playready videos when DRMFilter.value is set to Playready", () => {
    const filterFunction = createDRMFilter(FilterEnums.DRM.Playready);

    const result = dataSet.filter(filterFunction);
    const playreadyVideos = getDRMVideos(FilterEnums.DRM.Playready);

    expect(result).toStrictEqual(playreadyVideos);
  });

  it("should return Clearkey videos when DRMFilter.value is set to Clearkey", () => {
    const filterFunction = createDRMFilter(FilterEnums.DRM.Clearkey);

    const result = dataSet.filter(filterFunction);
    const clearkeyVideos = getDRMVideos(FilterEnums.DRM.Clearkey);

    expect(result).toStrictEqual(clearkeyVideos);
  });

  it("should return Widevine videos when DRMFilter.value is set to Widevine", () => {
    const filterFunction = createDRMFilter(FilterEnums.DRM.Widevine);

    const result = dataSet.filter(filterFunction);
    const widevineVideos = getDRMVideos(FilterEnums.DRM.Widevine);

    expect(result).toStrictEqual(widevineVideos);
  });

  it("should return videos whose requiresAuth is false when DRMFilter.value is set to NONE", () => {
    const filterFunction = createDRMFilter(FilterEnums.DRM.NONE);

    const result = dataSet.filter(filterFunction);
    const noneVideos = dataSet.filter((x) => !x.requiresAuth);

    expect(result).toStrictEqual(noneVideos);
  });
});
