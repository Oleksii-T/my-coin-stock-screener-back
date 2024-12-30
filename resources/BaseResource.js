class BaseResource {
  constructor(data) {
    this.data = data;
  }

  /**
   * Transform the data (override in child classes).
   */
  toJSON() {
    return this.data;
  }

  /**
   * Transform a single resource.
   */
  static single(data) {
    return new this(data).toJSON();
  }

  /**
   * Transform a collection of resources.
   */
  static collection(dataArray) {
    return dataArray.map(item => new this(item).toJSON());
  }
}

module.exports = BaseResource;
