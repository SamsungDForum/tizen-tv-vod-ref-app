/** Base class for resource implementation */
export class Resource {
  /** 
   * Base function reporting resource support status
   * @returns {boolean}
   */
  static isSupported() {
    return true;
  }

  /**
   * Base getter returning resource information
   * @return {any}
   */
  get info() {
    return undefined;
  }

  /** Base function requesting resource */
  request() {}
}
