import { dispatch } from "../../../reduxStore/store";
import { useTypedSelector } from "../../../reduxStore/useTypedSelector";
import { setMedia } from "../../usePlayerFactory/utils/playAsset";
import { setVideoFullScreenOn } from "../VideoFullScreenSlice";

type PlaybackHandlerProps = {
  setSubtitleText: React.Dispatch<React.SetStateAction<string>>;
  subtitleText: string;
  video: HTMLVideoElement;
};

export function playbackHandlers({ setSubtitleText, subtitleText, video }: PlaybackHandlerProps) {
  return {
    onPlayPauseClick: () => videoController.playPause(video),
    onRewindClick: () => videoController.rewind(video),
    onFastForwardClick: () => videoController.forward(video),
    onRestartClick: () => videoController.restart(video),
    onSetSubtitlesClick: () => setSubtitleText(renderSubtitleText(subtitleText)),
    onSubtitleTextUpdate: (text: string) => setSubtitleText(text),
    onHandleAbort: () => {
      videoController.abort(video);
      dispatch(setVideoFullScreenOn(false));
      setMedia(undefined);
    },
  };
}

export const videoController = {
  play: (video: HTMLVideoElement) => video.play(),
  pause: (video: HTMLVideoElement) => video.pause(),
  rewind: (video: HTMLVideoElement) => (video.currentTime = Math.floor(video.currentTime) - 10),
  forward: (video: HTMLVideoElement) => (video.currentTime = Math.floor(video.currentTime) + 10),
  playPause: (video: HTMLVideoElement) => (video.paused ? video.play() : video.pause()),
  restart: (video: HTMLVideoElement) => {
    video.currentTime = 0;
    video.play();
  },
  abort: (video: HTMLVideoElement) => {
    video.currentTime = 0;
    video.pause();
  },
};

function renderSubtitleText(subtitleText: string) {
  const subtitleOption = useTypedSelector((state) => state.setting.subtitle);
  return subtitleOption.current !== "off" ? subtitleText : "";
}
