import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import { getAppStore } from "../../../reduxStore/store";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./LoadingSpinner.module.scss";

describe("src/Components/PlaybackPanel/loadingSpinner/LoadingSpinner.test.tsx", () => {
  it("should show spinner styling", () => {
    const { container } = render(
      <Provider store={getAppStore()}>
        <LoadingSpinner showLoading={true} setShowLoading={vi.fn()} terminateTimeout={500} />
      </Provider>
    );

    const isShowLoading = container.getElementsByClassName(styles.loadingShow)[0];
    expect(isShowLoading).toBeInTheDocument();
  });

  it("should hide spinner styling", () => {
    const { container } = render(
      <Provider store={getAppStore()}>
        <LoadingSpinner showLoading={false} setShowLoading={vi.fn()} terminateTimeout={500} />
      </Provider>
    );

    const isShowLoading = container.getElementsByClassName(styles.loadingHide)[0];
    expect(isShowLoading).toBeInTheDocument();
  });
});
