/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { getAppStore } from "../../../reduxStore/store";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./LoadingSpinner.module.scss";
import { getNullableVideoElement } from "../../usePlayerFactory/PlayerFactory/classes/utils/getVideoElement";

describe("src/Components/PlaybackPanel/loadingSpinner/LoadingSpinner.test.tsx", () => {
  const video = getNullableVideoElement();
  it("should show spinner styling", () => {
    const { container } = render(
      <Provider store={getAppStore()}>
        <LoadingSpinner video={video} />
      </Provider>
    );

    const isShowLoading = container.getElementsByClassName(styles.loadingShow)[0];
    expect(isShowLoading).toBeInTheDocument();
  });

  it("should hide spinner styling", () => {
    const { container } = render(
      <Provider store={getAppStore()}>
        <LoadingSpinner video={video} />
      </Provider>
    );

    const isShowLoading = container.getElementsByClassName(styles.loadingHide)[0];
    expect(isShowLoading).toBeInTheDocument();
  });
});
