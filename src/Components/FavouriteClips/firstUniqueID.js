export function firstUniqueID(array) {
  const uniqueObjects = {};

  for (const obj of JSON.parse(array)) {
    const id = obj.id;

    if (!uniqueObjects[id]) {
      uniqueObjects[id] = obj;
    }
  }
  const uniqueObjectsArray = Object.values(uniqueObjects);
  return uniqueObjectsArray;
}
