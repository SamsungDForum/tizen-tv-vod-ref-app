/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { Provider } from "react-redux";
import ControlPanelButton from "../ControlPanelButton";
import { dispatch, getAppStore, getState } from "../../../../reduxStore/store";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { playbackHandlers } from "../../PlaybackPanel";
import { setVideoFullScreenOn } from "../../VideoFullScreenSlice";
import { RestartSvgIcon } from "../../../../helpers/SvgIcons";

describe("src/Components/PlaybackPanel/controls/tests/ControlPanelButton.test.tsx", () => {
  const pbProps = { playerRef: { current: null }, subtitleText: "", setSubtitleText: vi.fn() };
  it("should fire button and call onSubtitleTextUpdate", () => {
    const onSubtitleTextUpdate = vi.fn(() => playbackHandlers(pbProps).onSubtitleTextUpdate);
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onSubtitleTextUpdate} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onSubtitleTextUpdate).toHaveBeenCalledTimes(1);
  });

  it("should fire button and call onSetSubtitlesClick", () => {
    const onSetSubtitlesClick = vi.fn(() => playbackHandlers(pbProps).onSetSubtitlesClick);
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onSetSubtitlesClick} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onSetSubtitlesClick).toHaveBeenCalledTimes(1);
  });

  it("should fire button and call onRewindClick", () => {
    const onRewindClick = vi.fn(() => playbackHandlers(pbProps).onRewindClick);
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onRewindClick} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onRewindClick).toHaveBeenCalledTimes(1);
  });

  it("should fire button and call onFastForwardClick", () => {
    const onFastForwardClick = vi.fn(() => playbackHandlers(pbProps).onFastForwardClick);
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onFastForwardClick} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onFastForwardClick).toHaveBeenCalledTimes(1);
  });

  it("should fire button and call onRestartClick", () => {
    const onRestartClick = vi.fn(() => playbackHandlers(pbProps).onRestartClick);
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onRestartClick} />
      </Provider>
    );

    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onRestartClick).toHaveBeenCalledTimes(1);
  });

  it("should fire button and call onHandleAbort", () => {
    dispatch(setVideoFullScreenOn(true));
    const onHandleAbort = vi
      .fn(() => playbackHandlers(pbProps).onHandleAbort)
      .mockImplementation(() => dispatch(setVideoFullScreenOn(false)));
    render(
      <Provider store={getAppStore()}>
        <ControlPanelButton className="" icon={<RestartSvgIcon />} onClick={onHandleAbort} />
      </Provider>
    );
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(onHandleAbort).toHaveBeenCalledTimes(1);

    const videoFullscreen = getState().VideoFullScreen.value;
    expect(videoFullscreen).toBe(false);
  });
});
