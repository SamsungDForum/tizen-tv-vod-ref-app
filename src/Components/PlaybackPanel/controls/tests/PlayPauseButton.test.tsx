import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { getAppStore } from "../../../../reduxStore/store";
import { playbackHandlers } from "../../PlaybackPanel";
import PlayPauseButton from "../PlayPauseButton";

describe("src/Components/PlaybackPanel/controls/tests/PlayPauseButton.test.tsx", () => {
  const pbProps = { playerRef: { current: null }, subtitleText: "", setSubtitleText: vi.fn() };
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
