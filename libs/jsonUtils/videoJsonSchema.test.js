/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { it, expect, describe } from "vitest";
import { checkDataTypes, checkRequiredKeys, constructSchema, dataTypeEnum, getNonMutualKeys, matchJsonSchema } from "./videoJsonSchema";

describe("constructSchema function", () => {
  it("should return an array of objects containing keys and the types of their values", () => {
    const initialInput = [
        { id: 1, name: "Shrek", extraData: { DRM: "Apple" } },
        { id: 2, name: "Thor", languages: ["EN", "PL"] },
        { id: 3, audio: true, extraData: { DRM: "Apple" } }
    ];

    const result = constructSchema(initialInput);

    const expectedResult = [
        { id: dataTypeEnum.NUMBER, name: dataTypeEnum.STRING, extraData: dataTypeEnum.OBJECT },
        { id: dataTypeEnum.NUMBER, name: dataTypeEnum.STRING, languages: dataTypeEnum.ARRAY },
        { id: dataTypeEnum.NUMBER, audio: dataTypeEnum.BOOLEAN, extraData: dataTypeEnum.OBJECT }
    ];

    expect(result).toEqual(expectedResult);
  });
});

describe("getNonMutualKeys function", () => {
    it("should return an array with the keys not present in both objects", () => {
        const object1 = {
            id: 1,
            name: "Shrek",
            languages: ["EN", "PL"]
        };
        const object2 = {
            id: 2
        };

        const result1 = getNonMutualKeys(object1, object2).sort();
        const result2 = getNonMutualKeys(object2, object1).sort();

        const expectedResult = ["languages", "name"].sort();
        expect(result1).toEqual(expectedResult);
        expect(result2).toEqual(expectedResult);
    });
});

describe("checkRequiredKeys function", () => {
    const schema = {
        id: dataTypeEnum.NUMBER,
        name: dataTypeEnum.STRING 
    };

    const input = [
        { id: 3, name: "Shrek", languages: ["EN", "PL"] },
        { id: 4, name: "Sintel" }
    ];

    it("should return true if every object in an array contains the schema keys", () => {

        const result = checkRequiredKeys(input, schema);

        expect(result.success).toBe(true);
    });

    it("should return false if not every object in an array contains the schema keys", () => {
        const input = [
          { id: 3, name: "Shrek", languages: ["EN", "PL"] },
          { age: 4, name: "Sintel" }
        ];

        const result = checkRequiredKeys(input, schema);

        expect(result.success).toBe(false);
    });
});

describe("checkDataTypes function", () => {
  const schema = {
    id: dataTypeEnum.NUMBER,
    name: dataTypeEnum.STRING
  };

  it("should return true if the data types of every object match the scheme", () => {
    const input = [ 
      { "id": 2, "name": "Shrek" },
      { "id": 3, "name": "Madagascar" },
      { "id": 4, "name": "Google Car" }
    ];
    
    const result = checkDataTypes(input, schema);

    expect(result.success).toBe(true);
  });

    it("should return false if some data type of an object doesn't match the scheme", () => {
    const input = [ 
      { "id": 2, "name": "Shrek" },
      { "id": "FF", "name": "Madagascar" },
      { "id": 4, "name": "Google Car" }
    ];

        const result = checkDataTypes(input, schema);

    expect(result.success).toBe(false);
  });

});

describe("matchJsonSchema function", () => {
    const schema = {
    id: dataTypeEnum.NUMBER,
    name: dataTypeEnum.STRING
  };

  it("should set success to false and say which keys are missing if json doesn't have the required keys", () => {
    const input1 = [ { id: 1 } ];
    const input2 = [ { name: "Madagascar" } ];
    const input3 = [ { audio: ["EN", "PL" ]} ];

    const result1 = matchJsonSchema(input1, schema);
    const result2 = matchJsonSchema(input2, schema);
    const result3 = matchJsonSchema(input3, schema);

    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
    expect(result3.success).toBe(false);
    expect(result1.error).toContain("missing required keys: name");
    expect(result2.error).toContain("missing required keys: id");
    expect(result3.error).toContain("missing required keys: id, name");
  });

  it("should set success to false and say what should be changed if the required keys are not of the expected data type", () => {
    const input1 = [ { id: "Shrek", name: "Shrek"} ];
    const input2 = [ { id: 1, name: 2 }];

    const result1 = matchJsonSchema(input1, schema);
    const result2 = matchJsonSchema(input2, schema);

    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
    expect(result1.error).toContain("but must be [object Number] - id : Shrek");
    expect(result2.error).toContain("but must be [object String] - name : 2");
  });

  it("should set success to true if the required keys are present and of the expected data type", () => {
    const input1 = [ { id: 1, name: "Madagascar" } ];
    const input2 = [ { id: 2, name: "Shrek", audio: ["EN", "PL"] }];

    const result1 = matchJsonSchema(input1, schema);
    const result2 = matchJsonSchema(input2, schema);

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });

});