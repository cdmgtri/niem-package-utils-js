
const JSZip = require("jszip");

class NIEMPackageLoader {

  /**
   * @param {Blob} zipFile
   */
  constructor(zipFile) {
    this.input = zipFile;

    /** @type {JSZip} */
    this.zip;
  }

  async load() {
    this.zip = await JSZip.loadAsync(this.input);
  }

  /**
   * Extracts package metadata into a NIEM model object.
   * @abstract
   */
  async extractMetadata() {
  }

}

module.exports = NIEMPackageLoader;
