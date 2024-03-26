import React from "react";
import { WarningSvgIcon } from "../../../../../helpers/SvgIcons";
import { useSelector } from "react-redux";
import { tabsEnum } from "../../../NavigationTabSlice";

const AssetWarningDisplay = () => {
  const curNavigationTab = useSelector((state) => state.navigationTab.value);
  const favClips = useSelector((state) => state.FavouriteClips.myClips);
  const isLeftBarOpen = useSelector((state) => state.LeftNavBar.isOpen);

  return (
    <section className={`no-filters-area ${isLeftBarOpen ? "center-when-open-bar" : "centered"}`}>
      <div className="not-found-image">
        <WarningSvgIcon />
      </div>
      <h2>No results!</h2>

      <div className="warning-info">
        {(() => {
          switch (curNavigationTab) {
            case tabsEnum.allClips:
              return <p>Try to remove few filters!</p>;
            case tabsEnum.favoriteClips:
              if (favClips.length > 0) {
                return <p>Try to remove few filters!</p>;
              } else {
                return (
                  <>
                    <h3>Import or add clips to favorites</h3>
                    <div className="how-to-add">
                      <h4> To add clip as favorite focus clip and: </h4>
                      <p>
                        - press<span className={"red-button"}> RED</span> button on remote control
                      </p>
                      <p>- press F on PC</p>
                      <p>- hold ENTER</p>
                      <p>- enable QuickEdit and press ENTER</p>
                    </div>
                  </>
                );
              }
          }
        })()}
      </div>
    </section>
  );
};

export default AssetWarningDisplay;
