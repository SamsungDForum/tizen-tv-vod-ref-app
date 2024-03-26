type ModalPickerData = {
  category: string;
  options: Array<string>
}

type onSelectCallbackArgument = {
  category: string;
  option: string | null;
};

type VideoState = {
  VideoFullScreen: {
    value: boolean
  }
}

type LogOverState = {
  LogOverlayScreen: {
    showPlayerLogs: boolean
  }
}

export { ModalPickerData, onSelectCallbackArgument, VideoState, LogOverState };