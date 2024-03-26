function isExpectedData(data: any): boolean {
  if(Array.isArray(data)) {
    if(data.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  return false;
}

export default isExpectedData;