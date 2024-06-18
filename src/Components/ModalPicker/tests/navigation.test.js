/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { it, expect, describe, vi } from "vitest";
import { getDatasetKey, getDatasetSelector, getNavTag } from "../utilities/navigation";

describe("function getDatasetKey", () => {
  const input = "filter-option-list-container";

  it("should add 'modal-picker-' to the argument", () => {
    const result = getDatasetKey(input);
    const expectedResult = `modal-picker-${input}`;

    expect(result).toBe(expectedResult);
  });

  it("should remove all special characters except '-' from the argument", () => {
    const input1 = "!@#$%^&*filter-con(%#%)_+%)tainer";
    const input2 = "data-1";
    const input3 = input;
    const expectedResult1 = `modal-picker-filter-container`;
    const expectedResult2 = `modal-picker-${input2}`;
    const expectedResult3 = `modal-picker-${input3}`;

    const result1 = getDatasetKey(input1);
    const result2 = getDatasetKey(input2);
    const result3 = getDatasetKey(input3);

    expect(result1).toBe(expectedResult1);
    expect(result2).toBe(expectedResult2);
    expect(result3).toBe(expectedResult3);
  });

  it("should transform the argument to lower case", () => {
    const input = "FILTER-test-TeSt";
    const expectedResult = `modal-picker-${input.toLowerCase()}`;

    const result = getDatasetKey(input);

    expect(result).toBe(expectedResult);
  });

  it("should inform the developer if the argument passed is 'not clean'", () => {
    const consoleSpy = vi.spyOn(console, "assert").mockImplementationOnce(() => {});
    const input1 = "!@#$%^&*filter-con(%#%)_+%)tainer";
    const input2 = "-test";

    getDatasetKey(input1);
    getDatasetKey(input2);

    expect(consoleSpy).toBeCalledWith(false, 'ModalPicker', 'getDatasetKey', "data-{id} ribald chars:", `'${input1}' -> 'filter-container'`);
    expect(consoleSpy).toBeCalledWith(false, 'ModalPicker', 'getDatasetKey', "data-{id} ribald chars:", `'${input2}' -> 'test'`);
  });
});

describe("function getNavTag", () => {
  const input = "test";

  it("should return an object with two keys", () => {
    const result = getNavTag(input);
    const keyCount = Object.keys(result).length;
    const expectedKeyCount = 2;

    expect(typeof(result)).toBe("object");
    expect(keyCount).toBe(expectedKeyCount);
  });

  it("should return an object with tabIndex set to -1", () => {
    const result = getNavTag(input);
    
    expect(result.tabIndex).toBe(-1);
  });

  it("should return an object with `data-modal-picker-${arg} set to true", () => {
    const result = getNavTag(input);

    expect(result[`data-modal-picker-${input}`]).toBe(true);
  });
});

describe("function getDatasetSelector", () => {
  it("should return a string", () => {
    const input = "test";

    const result = getDatasetSelector(input);

    expect(typeof(result)).toBe("string");
  });

  it("should return '[data-${arg}]' where arg is the argument", () => {
    const input1 = 5;
    const input2 = "test-filter-container";
    const expectedResult1 = `[data-${input1}]`;
    const expectedResult2 = `[data-${input2}]`;

    const result1 = getDatasetSelector(input1);
    const result2 = getDatasetSelector(input2);

    expect(result1).toBe(expectedResult1);
    expect(result2).toBe(expectedResult2);
  });
});
