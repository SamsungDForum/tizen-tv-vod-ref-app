import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonVideoContents from "../../../../data/VideoContent.json";
import { refreshNavigationSection } from "../Contents/AssetView/Navigation";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import { navKeys } from "./../navigation";
import { isContentValid } from "./ContentValidator";
import { getFilteredList, useSelectedFilters, filterBy } from "./ContentFilters";
import { FiltersPanel, getFilterHandlers } from "./ContentFilters/FiltersPanel";
import LoadingStateIndicator from "../../../LoadingStateIndicator";
import "./ContentsWindow.scss";
import { FilterLabels } from "./ContentFilters/FiltersSlice";
import { FilterEnums } from "./ContentFilters/FiltersSlice";
import { loadFavouriteClips } from "./AssetView/FavouriteClipsSlice";
import { dispatch } from "../../../../reduxStore/store";
import Content from "./AssetView/SwiperAsset/Content";
import { tabsEnum } from "../../NavigationTabSlice";
import { setChannelList } from "../../../ChannelZapping/ChannelZappingSlice";
import toast from "react-hot-toast";

function onMount() {
  navKeys.initialize((evt) => navKeys.onKeyEvent(evt));
  return function onUnmount() {
    navKeys.destroy((evt) => navKeys.onKeyEvent(evt));
  };
}

export default function ContentsWindow({ customContent, currentPlayer, setDroppedContent, droppedContent }) {
  const defaultCustom = [{ title: "", list: [] }];
  const [customPlaylist, setCustomPlaylist] = useState(defaultCustom);
  const currentFilters = useSelectedFilters();
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  const media = useSelector((state) => state.playAsset.value.media);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const playbackSettings = useSelector((state) => state.setting);
  const previewState = useSelector((state) => state.PreviewLoading.value.loadingState);
  const {
    source: { current: currPlayer },
  } = playbackSettings;

  const customAllContent = useSelector((state) => state.CustomCommon.myCustomCommon);
  const favClips = useSelector((state) => state.FavouriteClips.myClips);
  const isCustomCommon = useSelector((state) => state.CustomCommon.isCustomCommon);
  const newClipsState = customAllContent ? JSON.stringify(favClips) : null;
  const [commonClipList, setCommonClipList] = useState(CommonVideoContents);

  useEffect(() => {
    if (customAllContent.length !== 0 && isCustomCommon) {
      setCommonClipList(customAllContent);
    } else {
      setCommonClipList(CommonVideoContents);
    }
  }, [isCustomCommon, customAllContent]);

  useEffect(onMount, []);

  useEffect(async () => {
    if (!customContent) {
      return;
    }
    let content = null;
    if (typeof tizen !== "undefined") {
      content = newClipsState;
    } else {
      if (droppedContent !== null) {
        dispatch(loadFavouriteClips(droppedContent));
        setDroppedContent(null);
      }
      content = droppedContent === null ? newClipsState : droppedContent;
      if (content === null) {
        return;
      }

      const isValid = isContentValid(content);
      if (!isValid.success) {
        toast.success(isValid.message, {
          duration: 3000,
        });
      } else {
        if (favClips.length > 0) {
          toast.success(isValid.message, {
            style: {
              maxWidth: "500px",
            },
          });
        }
      }
    }

    let customFilteredData = getFilteredContents(JSON.parse(content));
    setCustomPlaylist(customFilteredData);
  }, [droppedContent, currentFilters, newClipsState]);

  useEffect(() => {
    refreshNavigationSection();
  }, [customPlaylist, curNavigationTab, currentFilters]);

  let commonPlayList = null;
  if (customContent !== true) {
    commonPlayList = getFilteredContents(commonClipList);
  }

  useEffect(() => {
    commonPlayList = getFilteredContents(commonClipList);
  }, [currentFilters]);

  function getFilteredContents(allContents) {
    const filterHandlers = getFilterHandlers({
      manifestValue: currentFilters[filterBy.manifest],
      drmValue: currentFilters[filterBy.drm],
      containerValue: currentFilters[filterBy.container],
      srcValue: currentFilters[filterBy.source],
    });
    return getFilteredList(filterHandlers, currentPlayer, allContents);
  }

  useEffect(() => {
    const results = Object.keys(currentFilters).map((filterType) => {
      const matchedValue = currentFilters[filterType];
      const matchedLabel =
        FilterLabels[filterType][
          Object.keys(FilterEnums[filterType]).find((key) => FilterEnums[filterType][key] === matchedValue)
        ];
      return {
        matchedLabel: matchedLabel,
      };
    });
    setAppliedFilters(results);
  }, [currentFilters]);

  const currentRowID = useSelector((state) => state.ChannelZapping.currentRowID);

  useEffect(() => {
    if (curNavigationTab === tabsEnum.allClips) {
      dispatch(setChannelList(customContent ? customPlaylist[currentRowID] : commonPlayList[currentRowID]));
    } else if (curNavigationTab === tabsEnum.favoriteClips) {
      if (customPlaylist[currentRowID]?.list.length > 0) {
        dispatch(setChannelList(customPlaylist[currentRowID]));
      }
    }
  }, [curNavigationTab, currentFilters, customContent, customPlaylist, commonClipList, currentRowID]);

  return (
    <>
      {appliedFilters !== null && (
        <div className="applied-filters">
          <div className="active-filters-box">{curNavigationTab}</div>
          {currPlayer ? <div className="active-filters-box">{currPlayer.label}</div> : null}
          {appliedFilters
            .filter((item) => item.matchedLabel !== "All")
            .map((item, index) => (
              <div className="active-filters-box" key={index}>
                {item.matchedLabel}
              </div>
            ))}
          <LoadingStateIndicator state={previewState} text={"Setting Dynamic Preview"} />
        </div>
      )}

      {customContent === true && typeof tizen === "undefined" ? (
        <DragAndDrop onSuccessHandler={setDroppedContent} onErrorHandler={toast.error} />
      ) : null}

      <div
        className="content-area"
        style={{
          height: curNavigationTab === tabsEnum.allClips ? "48em" : typeof tizen !== "undefined" ? "48em" : "40em",
        }}
      >
        <Content
          curNavigationTab={curNavigationTab}
          clickedVideoId={media?.id}
          customContent={customContent}
          child={customContent ? customPlaylist : commonPlayList}
        />
      </div>
    </>
  );
}