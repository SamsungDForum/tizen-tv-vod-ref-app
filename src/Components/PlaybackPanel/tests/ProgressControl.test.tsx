/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { getAppStore } from "../../../reduxStore/store";
import ProgressControl from "../progressBar/ProgressControl";

describe("src/Components/PlaybackPanel/tests/ProgressControl.test.tsx", () => {
  describe("displaying ProgressControl component", () => {
    it("should set progress max value equal to video.duration", () => {
      const video = document.createElement("video");
      Object.defineProperty(video, "duration", { value: 10 });
      const { container } = render(
        <Provider store={getAppStore()}>
          <ProgressControl video={video} tabIndex={0} />
        </Provider>
      );

      fireEvent(video, new Event("loadedmetadata"));

      const progress = container.querySelector("progress");
      expect(progress?.max).toEqual(video.duration);
    });

    it("should not set progress max value", () => {
      const video = document.createElement("video");
      Object.defineProperty(video, "duration", { value: NaN });
      const { container } = render(
        <Provider store={getAppStore()}>
          <ProgressControl video={video} tabIndex={0} />
        </Provider>
      );
      fireEvent(video, new Event("loadedmetadata"));

      const progress = container.querySelector("progress");
      expect(progress?.max).toEqual(1); // 1 is default progress.max value
    });
  });
});
