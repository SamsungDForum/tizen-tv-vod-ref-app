import React from "react";
import { dispatch } from "../../reduxStore/store.js";
import { useSelector } from "react-redux";
import { YesNoButtons } from "./YesNoButtons.js";
import { saveFavourites } from "../FavouriteClips/saveClipsToFile.js";
import { importFromUsb } from "../FavouriteClips/importFromUsb.js";
import { resetLogs } from "../WorkTabs/Tabs/Logs/log-source.js";
import { setNavigationTab } from "../WorkTabs/NavigationTabSlice.js";
import { clearFavouriteClip } from "../WorkTabs/Tabs/Contents/AssetView/FavouriteClipsSlice.js";
import { actionTypeConfirmation, showConfirmation } from "./ConfirmationModalSlice.js";
import { setCustomCommonList, toggleCustomCommon } from "../WorkTabs/Tabs/Contents/AssetView/CustomCommonSlice.js";
import { setIsLeftBarOpen } from "../LeftNavigationBar/LeftNavBarSlice.js";
import toast from "react-hot-toast";

export const handleConfirmation = (action) => {
  dispatch(actionTypeConfirmation(action));
  dispatch(showConfirmation(true));
};

const ConfirmationModal = () => {
  const favClips = useSelector((state) => state.FavouriteClips.myClips);
  const actionType = useSelector((state) => state.ModalSlice.actionType);
  const showConfirm = useSelector((state) => state.ModalSlice.showConfirm);

  const updateSwapState = () => (dispatch) => {
    dispatch(setIsLeftBarOpen(false));
    dispatch(setCustomCommonList());
    dispatch(toggleCustomCommon(true));
    dispatch(clearFavouriteClip());
    dispatch(setNavigationTab("All Clips"));
  };

  const updateInitialState = () => (dispatch) => {
    dispatch(setIsLeftBarOpen(false));
    dispatch(toggleCustomCommon(false));
    dispatch(setNavigationTab("All Clips"));
  };

  const onDialogYesActions = {
    clear: () => dispatch(clearFavouriteClip()),
    import: () => importFromUsb(),
    export: () => saveFavourites(favClips),
    swap: () => {
      dispatch(updateSwapState());
      toast.success(
        `Custom All Clips has been updated. \n Remember to set it again if you want to update Custom All Clips.`,
        {
          duration: 6000,
        }
      );
    },
    initial: () => dispatch(updateInitialState()),
    resetlogs: () => {
      setTimeout(() => {
        resetLogs();
      });
      console.log("Logs deleted");
    },
    exitapp: () => window.tizen?.application.getCurrentApplication().exit(),
  };

  const onDialogYes = () => {
    onDialogYesActions[actionType]();
    dispatch(showConfirmation(false));
  };

  const modalMessages = {
    clear: `Do you want to CLEAR favorite clips?`,
    import: `Do you want to IMPORT clips?`,
    export: `Do you want to EXPORT clips?`,
    swap: `Do you want to replace 'ALL Clips' with your current 'Favorite Clips'?`,
    initial: `Do you want to back to initial All Clips?`,
    resetlogs: `Do you want to delete all logs?`,
    exitapp: `Do You really want to exit the application?`,
  };

  const onDialogMessage = (actionType) => {
    return modalMessages[actionType];
  };

  const onDialogNo = () => {
    dispatch(showConfirmation(false));
  };

  const yesnobtn = function () {
    return (
      <YesNoButtons messageText={onDialogMessage(actionType)} onYesCallback={onDialogYes} onNoCallback={onDialogNo} />
    );
  };

  return <>{showConfirm && yesnobtn()}</>;
};

export default ConfirmationModal;
