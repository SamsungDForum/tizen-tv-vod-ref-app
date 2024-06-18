/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const dataTypeEnum = {
  NUMBER: "[object Number]",
  STRING: "[object String]",
  ARRAY: "[object Array]",
  OBJECT: "[object Object]",
  BOOLEAN: "[object Boolean]",
};

const videoContentJsonSchema = {
    id: dataTypeEnum.NUMBER,
    name: dataTypeEnum.STRING,
    url: dataTypeEnum.STRING,
    widthResolution: dataTypeEnum.ARRAY,
}

function constructSchema(videoArray) {
  function getObjectSchema(obj) {
      function getDataType(x) {
        return Object.prototype.toString.call(x);
      }

    const result = { };
    for(const key in obj) {
      result[key] = getDataType(obj[key]);
    }
    
    return result;
  }

  const result = [];
  videoArray.forEach(video => result.push(getObjectSchema(video)));

  return result;
}

function getNonMutualKeys(obj, schema) {
  const objKeys = Object.keys(obj);
  const schemaKeys = Object.keys(schema);

  const result = [];
 
  if(objKeys.length >= schemaKeys.length) {
    objKeys.forEach(x => !schemaKeys.includes(x) ? result.push(x) : null);
  } else {
    schemaKeys.forEach(x => !objKeys.includes(x) ? result.push(x) : null);
  }

  return result;
}

function checkRequiredKeys(json, schema) {
  const requiredKeys = Object.keys(schema);
  
  let errorMessage = "";
  const areRequiredKeysPresent = requiredKeys.every(key => {
    const list = json.filter(videoItem => videoItem.hasOwnProperty(key) === false);

    if (list.length === 0) {
        return true;
    } else {
      errorMessage = `VideoContent.json item missing required keys: ${getNonMutualKeys(list[0], schema).toString().replace(/,/g, ", ")}`;
      return false;
    }
  });

  return {
    success: areRequiredKeysPresent,
    error: errorMessage
  };
}

function checkDataTypes(json, schema) {
  const jsonSchema = constructSchema(json);

  let errorMessage = "";
  let areAllTypesProper = true;
  let counter = 0;
  for(const [key, value] of Object.entries(schema)) {
    if(!areAllTypesProper) {
      break;
    }

    counter = 0;
    jsonSchema.forEach(videoItem => {
      counter++;
      if(videoItem[key] !== value) {
        errorMessage = `Object ${counter} - ${key}: ${videoItem[key]} but must be ${schema[key]} - ${key} : ${json[counter - 1][key]}`;
        areAllTypesProper = false;
      }
    });
  }

  return {
    success: areAllTypesProper,
    error: errorMessage
  };
}

function matchJsonSchema(json, schema = videoContentJsonSchema) {
  if (typeof json === "string") {
    json = JSON.parse(json);
  }

  const areRequiredKeys = checkRequiredKeys(json, schema);
  const areDataTypes = checkDataTypes(json, schema);

  const result = {
    success: areRequiredKeys.success && areDataTypes.success,
    error: areRequiredKeys.success ? areDataTypes.error : areRequiredKeys.error
  }

  return result;
}

export { matchJsonSchema, constructSchema, getNonMutualKeys, checkRequiredKeys, checkDataTypes, dataTypeEnum };