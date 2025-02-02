/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { getAppStore } from "../../../../reduxStore/store";
import { playbackHandlers } from "../../controls/playbackHandlers";
import PlayPauseButton from "../PlayPauseButton";
import { getVideoElement } from "../../../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";

describe("src/Components/PlaybackPanel/controls/tests/PlayPauseButton.test.tsx", () => {
  const pbProps = { video: getVideoElement(), subtitleText: "", setSubtitleText: vi.fn() };
  const onPlayPauseClick = vi.fn(() => playbackHandlers(pbProps).onPlayPauseClick);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fire button and change playIcon state", () => {
    render(
      <Provider store={getAppStore()}>
        <PlayPauseButton onClick={onPlayPauseClick} />
        <div id="elVideo" />
      </Provider>
    );
    const btn = screen.getByRole("button");
    fireEvent.click(btn);

    expect(onPlayPauseClick).toHaveBeenCalledTimes(1);

    expect(btn.classList.contains("video-player-play-control")).toBe(true);
  });
});
