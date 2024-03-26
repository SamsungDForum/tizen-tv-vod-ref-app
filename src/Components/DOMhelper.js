import yesNoButtonsStyles from "./ConfirmationModal/YesNoButtons.module.scss";
import tabWorkspaceStyles from "./WorkTabs/TabWorkspace.module.scss";
import playerWindowStyles from "./PlayerWindow/PlayerWindow.module.scss";

export const domRef = {
  getVideoPlayerFullscreenControl() {
    return document.getElementsByClassName("video-player-fullscreen-control")[0];
  },

  getDialogButtonNo() {
    return document.getElementsByClassName(yesNoButtonsStyles.dialogButtonNo)[0];
  },

  getDialogButtonYes() {
    return document.getElementsByClassName(yesNoButtonsStyles.dialogButtonYes)[0];
  },

  getTabsWorkspace() {
    return document.getElementsByClassName(tabWorkspaceStyles.tabWorkspace)[0];
  },

  getPlayerWindow() {
    return document.getElementsByClassName(playerWindowStyles.topPlayerWindow)[0];
  },

  getAssetView() {
    return document.getElementsByClassName("asset-view")[0];
  },

  getVideoPlayerPauseControl() {
    return document.getElementsByClassName("video-player-pause-control")[0];
  },

  getVideoPlayerPlayControl() {
    return document.getElementsByClassName("video-player-play-control")[0];
  },

  getViewPickerButton() {
    return document.getElementById("menubar-view-switch-refocus");
  },

  getPlayerSelectButton() {
    return document.getElementById("playerselect-refocus");
  },

  getFilteringOptionsContainer() {
    return document.getElementsByClassName("filtering-options-container")[0];
  },

  getVideoPlayerSettingsPanelControl() {
    return document.getElementsByClassName("video-player-settings-panel-control")[0];
  },
};
