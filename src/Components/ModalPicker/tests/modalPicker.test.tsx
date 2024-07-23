/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import { it, vi, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalPicker from "../ModalPicker";
import overlayStyles from "../styles/Overlay.module.scss";

import styledButtonStyles from "../styles/StyledButton.module.scss";
import menuStyles from "../styles/Menu.module.scss";
import { Provider } from "react-redux";
import { getAppStore } from "../../../reduxStore/store";

describe("src/Components/ModalPicker", () => {
  const arrowIcon = " ▸";
  const initialLabel = "Main";
  const dataVariants = {
    emptyArray: [],
    stringArray: ["category1", "category2"],
    objectArray: [
      {
        category: "category1",
        options: ["option1", "option2", "option3"],
      },
      {
        category: "category2",
        options: ["1option", "2option"],
      },
    ],
    mixedArray: [
      {
        category: "category1",
        options: ["option1", "option2", "option3"],
      },
      "category2",
    ],
  };

  describe("rendering with different data options", () => {
    it("should render with a `data` prop being an empty array", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });

      expect(mainBtn).toBeInTheDocument();
    });

    it("should render with a `data` prop being an array with strings", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);

      dataVariants.stringArray.forEach((option) => {
        const optionBtn = screen.getByRole("button", { name: option });
        expect(optionBtn).toBeInTheDocument();
      });
    });

    it("should render with a `data` prop being an array with ModalPickerData", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.objectArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);

      dataVariants.objectArray.forEach((object) => {
        const categoryBtn = screen.getByRole("button", {
          name:
            object.category + `${typeof object !== "string" ? arrowIcon : ""}`,
        });
        fireEvent.click(categoryBtn);
        expect(categoryBtn).toBeInTheDocument();
        object.options.forEach((option) => {
          const optionBtn = screen.getByRole("button", { name: option });
          expect(optionBtn).toBeInTheDocument();
        });
      });
    });

    it("should render with a `data` prop being an array with ModalPickerData and string", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.mixedArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);

      dataVariants.mixedArray.forEach((object) => {
        let categoryBtn: HTMLElement;
        if (typeof object === "string") {
          categoryBtn = screen.getByRole("button", { name: object });
          expect(categoryBtn).toBeInTheDocument();
        } else {
          categoryBtn = screen.getByRole("button", {
            name:
              object.category +
              `${typeof object !== "string" ? arrowIcon : ""}`,
          });
          fireEvent.click(categoryBtn);
          object.options.forEach((option) => {
            const optionBtn = screen.getByRole("button", { name: option });
            expect(optionBtn).toBeInTheDocument();
          });
        }
      });
    });
  });

  describe("main button text needs to be equal to the chosen option", () => {
    it("should  have the right option be displayed as chosen when data is a string", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      const targetOption = screen.getByRole("button", {
        name: dataVariants.stringArray[1],
      });
      fireEvent.click(targetOption);

      expect(mainBtn.textContent).toBe(dataVariants.stringArray[1]);
    });

    it("should have the right option be displayed as chosen when data is a ModalPickerData", () => {
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.objectArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      const targetCategory = screen.getByRole("button", {
        name:
          dataVariants.objectArray[1].category +
          `${typeof dataVariants.objectArray[1] !== "string" ? arrowIcon : ""}`,
      });
      fireEvent.click(targetCategory);
      const targetOption = screen.getByRole("button", {
        name: dataVariants.objectArray[1].options[1],
      });
      fireEvent.click(targetOption);

      expect(mainBtn.textContent).toBe(
        `${dataVariants.objectArray[1].category} ${dataVariants.objectArray[1].options[1]}`
      );
    });
  });

  describe("<Overlay /> testing", () => {
    it("should render <Overlay /> when mainBtn is expanded", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      const overlay = container.getElementsByClassName(
        overlayStyles.overlay
      )[0];

      expect(overlay).toBeInTheDocument();
    });

    it("should hide <Overlay /> after collapsing mainBtn", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      fireEvent.click(mainBtn);

      const overlayElements = container.getElementsByClassName(
        overlayStyles.overlay
      );

      expect(overlayElements.length).toEqual(0);
    });

    it("should not render <Overlay /> right after rendering <ModalPicker />", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const overlayElements = container.getElementsByClassName(
        overlayStyles.overlay
      );

      expect(overlayElements.length).toEqual(0);
    });

    it("should not render <Overlay /> onClick when a `data` prop is an empty array", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker data={[]} initialLabel={initialLabel} />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);

      const overlayElements = container.getElementsByClassName(
        overlayStyles.overlay
      );

      expect(overlayElements.length).toEqual(0);
    });
  });

  describe("callbacks should be run correct number of times", () => {
    it("should run onExpandCallback one time", () => {
      const callback = vi.fn(() => true);
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
            onExpandCallback={callback}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should run onCollapseCallback one time", () => {
      const callback = vi.fn(() => true);
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
            onCollapseCallback={callback}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      const targetOption = screen.getByRole("button", {
        name: dataVariants.stringArray[1],
      });
      fireEvent.click(targetOption);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should run onSelectCallback one time", () => {
      const callback = vi.fn(() => true);
      render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.stringArray}
            initialLabel={initialLabel}
            onSelectCallback={callback}
          />
        </Provider>
      );

      const mainBtn = screen.getByRole("button", { name: initialLabel });
      fireEvent.click(mainBtn);
      const targetOption = screen.getByRole("button", {
        name: dataVariants.stringArray[1],
      });
      fireEvent.click(targetOption);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe("<span class=`iconWithName` /> should always be in the DOM", () => {
    it("shoud have <span /> in the DOM when `label` prop is undefined", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const span = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].firstChild;

      expect(span).toBeInTheDocument();
      expect(span).toHaveClass(styledButtonStyles.iconWithName);
    });

    it("should have <span /> in the DOM when `label` prop is passed", () => {
      const labelProp = "Label To The Left Of Main Button";
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
            label={labelProp}
          />
        </Provider>
      );

      const span = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].firstChild;

      expect(span).toBeInTheDocument();
      expect(span).toHaveClass(styledButtonStyles.iconWithName);
    });

    it("should have labelProp text when `label` prop is passed", () => {
      const labelProp = "Label To The Left Of Main Button";
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
            label={labelProp}
          />
        </Provider>
      );

      const spanText = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].firstChild;

      expect(spanText).toBeInTheDocument();
      expect(spanText).toHaveTextContent(labelProp);
    });
  });

  describe("<span class=`smallGrayText` /> should always be in the DOM", () => {
    it("shoud have <span /> in the DOM when `initialLabel` prop is empty string", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker data={dataVariants.emptyArray} initialLabel={""} />
        </Provider>
      );

      const span = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].children[1];

      expect(span).toBe(undefined);
    });

    it("should have <span /> in the DOM when `initialLabel` prop is passed", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const span = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].children[1];

      expect(span).toBeInTheDocument();
      expect(span).toHaveClass(styledButtonStyles.smallGrayText);
    });

    it("should have initialLabel text when `initialLabel` prop is passed", () => {
      const { container } = render(
        <Provider store={getAppStore()}>
          <ModalPicker
            data={dataVariants.emptyArray}
            initialLabel={initialLabel}
          />
        </Provider>
      );

      const spanText = container.getElementsByClassName(
        styledButtonStyles.styledButton
      )[0].children[1];

      expect(spanText).toBeInTheDocument();
      expect(spanText).toHaveTextContent(initialLabel);
    });
  });

  it("should not expand when there is only one option which is already chosen", () => {
    const initialData = ["Option"];
    const { container } = render(
      <Provider store={getAppStore()}>
        <ModalPicker data={initialData} initialLabel={initialData[0]} />
      </Provider>
    );

    const mainBtn = container.getElementsByClassName(
      styledButtonStyles.styledButton
    )[0];
    fireEvent.click(mainBtn);
    const menuDiv = container.getElementsByClassName(menuStyles.menu);

    expect(menuDiv.length).toEqual(0);
  });
});
