/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { addElementToList } from "./FilteredList";
import { it, expect, describe, beforeEach } from "vitest";

describe("function addElementToList", () => {
  const list = [];
  const initialListSize = list.length;
  const elementTitle = "Title";
  const listOfVideos = [""];

  beforeEach(() => {
    while(list.length > 0) {
        list.pop();
    }
  });

  it("should add one element to the given list - first argument", () => {
    addElementToList(list, elementTitle, listOfVideos);
    const currentListSize = list.length;

    expect(currentListSize - initialListSize).toBe(1);
  });

  it("should have no return value", () => {
    const result = addElementToList(list, elementTitle, listOfVideos);

    expect(result).toBeUndefined();
  });

  it("should add an object with two properties named as title and list", () => {
    addElementToList(list, elementTitle, listOfVideos);

    expect(list[list.length - 1]).toHaveProperty('title');
    expect(list[list.length - 1]).toHaveProperty('list');
    expect(Object.keys(list[list.length - 1]).length).toBe(2);
  });

  it("should add an object to the list with the exact values provided as parameters", () => {
    addElementToList(list, elementTitle, listOfVideos);
    
    const resultingTitle = list[list.length - 1].title;
    const resultingList = list[list.length - 1].list;

    expect(resultingTitle).toBe(elementTitle);
    expect(resultingList).toStrictEqual(listOfVideos);
  });
});