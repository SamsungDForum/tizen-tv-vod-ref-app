import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, expect, vi, describe } from "vitest";
import { Provider } from "react-redux";
import ButtonPanel from "./ButtonPanel";
import "@testing-library/jest-dom";

describe("component ButtonPanel", () => {
    const callback = vi.fn();
    const inputValues = {
      optionLabel: "Test Option Label",
      clickCallback: callback,
      label: "Test Label"
    }
 
   it("should display the label passed as parameter as the button's name", () => {
    render(<ButtonPanel optionLabel={inputValues.optionLabel}
                        clickCallback={inputValues.clickCallback}
                        label={inputValues.label}/>);

    const btn = screen.getByRole("button", { name:  inputValues.label } );

    expect(btn).toBeInTheDocument(); 
  });

  it("should call clickCallback function one time when user clicks", () => {
    render(<ButtonPanel optionLabel={inputValues.optionLabel}
                        clickCallback={inputValues.clickCallback}
                        label={inputValues.label}/>);

    const btn = screen.getByRole("button", { name: inputValues.label });
    fireEvent.click(btn);

    expect(callback.callCount).toEqual(1); 
  });
});