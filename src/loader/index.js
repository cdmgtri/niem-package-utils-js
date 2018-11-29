
const JSZip = require("jszip");

class NIEMPackageLoader {

  /**
   * Async constructor that loads the given zip file blob into a JSZip object.
   *
   * @param {Blob} zipFile
   */
  constructor(zipFile) {

    return ( async () => {
      this.zip = await JSZip.loadAsync(zipFile);
      return this;
    })();

  }

  /**
   * Extracts package metadata into a NIEM model object.
   * @abstract
   * @returns {NIEMModel}
   */
  async extractMetadata() {
  }

}

module.exports = NIEMPackageLoader;
