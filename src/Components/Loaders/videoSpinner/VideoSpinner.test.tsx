/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import VideoSpinner from "./VideoSpinner";
import styles from "./VideoSpinner.module.scss";

describe("src/Components/PlaybackPanel/videoSpinner/VideoSpinner.test.tsx", () => {
  const video = document.createElement("video");
  it("should display loading spinner when video is in waiting state", () => {
    // Arrange section
    video.src = "testVideo.mp4";
    const { getByTestId } = render(<VideoSpinner video={video} />);

    // Act section
    fireEvent(video, new Event("waiting"));

    // Assert section
    const spinner = getByTestId("video-spinner");
    expect(spinner).toHaveClass(styles.loadingShow);
  });
  it("should hide loading spinner when video timeupdate has been changed", () => {
    // Arrange section
    video.src = "testVideo.mp4";
    const { getByTestId } = render(<VideoSpinner video={video} />);

    // Act section
    fireEvent(video, new Event("timeupdate"));

    // Assert section
    const spinner = getByTestId("video-spinner");
    expect(spinner).toHaveClass(styles.loadingHide);
  });
  it("should hide loading spinner when video src is empty", () => {
    // Arrange section
    video.src = "";
    const { getByTestId } = render(<VideoSpinner video={video} />);

    // Assert section
    const spinner = getByTestId("video-spinner");
    expect(spinner).toHaveClass(styles.loadingHide);
  });

  it("should display VideoSpinner", () => {
    // Arrange section
    const { getByTestId } = render(<VideoSpinner video={video} />);

    // Assert section
    const spinner = getByTestId("video-spinner");
    expect(spinner).toBeInTheDocument();
  });
  it("should NOT display VideoSpinner", () => {
    // Arrange section
    const { queryByTestId } = render(<VideoSpinner video={null} />);

    // Assert section
    const spinner = queryByTestId("video-spinner");
    expect(spinner).not.toBeInTheDocument();
  });
});
