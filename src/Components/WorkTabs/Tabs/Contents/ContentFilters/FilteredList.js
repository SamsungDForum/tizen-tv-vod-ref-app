function addElementToList(list, elementTitle, listOfVideos) {
  list.push({ title: elementTitle, list: listOfVideos });
}

function getFilteredList(filters, _currentPlayer, videoList) {
  let currentPlayer = _currentPlayer?.type ?? ""; // There may be no "current" player: i.e. during change
  let _curPlayerVideoList = videoList.filter(function (video) {
    let isPlayerSupported = true;

    if (video.excludedFrom?.includes(currentPlayer)) isPlayerSupported = false;

    return isPlayerSupported;
  });

  let parsedList = [];

  let searchedVideoList = _curPlayerVideoList;
  if (filters.length > 0) {
    filters.map((filterFunction) => {
      searchedVideoList = searchedVideoList.filter(filterFunction);
    });
    addElementToList(parsedList, "All", searchedVideoList);
  }

  ////standard filters for rows - below

  //hasSubtitles
  let subtitleVideoList = searchedVideoList.filter(function (video) {
    return video.subtitles?.length > 0;
  });
  addElementToList(parsedList, "Subtitles", subtitleVideoList);

  //mutipleAudios
  let audioVideoList = searchedVideoList.filter(function (video) {
    return video.audio?.length > 1;
  });
  addElementToList(parsedList, "Multiple audio", audioVideoList);

  //UHD
  let UHDVideoList = searchedVideoList.filter(function (video) {
    let isUHD = false;
    video.widthResolution.map((resolution) => {
      if (resolution >= 3840) isUHD = true;
    });

    return isUHD;
  });
  addElementToList(parsedList, "4K", UHDVideoList);

  //LiveStreams
  let liveVideoList = searchedVideoList.filter(function (video) {
    return video.live === true;
  });
  addElementToList(parsedList, "Live", liveVideoList);

  //DRM
  let drmVideoList = searchedVideoList.filter(function (video) {
    return video.requiresAuth === true;
  });
  addElementToList(parsedList, "DRM", drmVideoList);

  return parsedList;
}

export { getFilteredList, addElementToList };
