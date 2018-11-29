
let convert = require("xml-js");

let NIEMPackageLoader = require("../index");

let { NIEMModel } = require("niem-model-schema");


/**
 * Specialized utilities based on version 1.0 of the MPD specification.
 *
 * @todo Test IEPD might be pre MPD 1.0 specification.  Find out label.
 */
class NIEMPackageLoader_1_0 extends NIEMPackageLoader {

  /**
   * Extracts fields from the IEPD metadata.xml file and returns them as a
   * NIEM model object.
   *
   * @returns {NIEMModel}
   */
  async extractMetadata() {
    let metadataFile = this.zip.file(/metadata.xml$/)[0];

    if (metadataFile) {
      let xmlString = await metadataFile.async("text");
      return loadMetadataObject(xmlString);
    }

    return;
  }
}

/**
 * @returns {NIEMModel}
 */
function loadMetadataObject(xmlString) {

  /** @type {NIEMModel} */
  let model = {};

  // Convert the XML metadata file string into a JSON object for processing.
  let json = convert.xml2js(xmlString, {compact: true});

  if (!json || !json.Metadata) {
    console.log("Metadata file not found.");
    return;
  }

  let metadata = json.Metadata;

  // Load model-related fields from metadata.
  model.name = metadata.Name._text;
  model.summary = metadata.Summary._text;
  model.description = metadata.Description._text;
  model.kind = "IEPD";
  model.source = getSource(metadata.AuthoritativeSource.Organization);
  model.contactInfo = getContactInfo(metadata.AuthoritativeSource.PointOfContact);
  model.website = metadata.URL._text;
  model.versions = [{}];

  // Load version-related fields from metadata.
  let version = model.versions[0];
  version.version = metadata.Version._text;
  version.baseNIEM = metadata.NIEMVersion._text;
  version.modelName = model.name;
  version.uri = metadata.URI._text;

  delete metadata.AuthoritativeSource;

  version.more = getMore(metadata);

  return model;
}

/**
 * Compresses the metadata complex authoritative source info into a single multi-line string.
 */
function getSource(json) {
  let str = "";
  str += appendField(json.Name);
  str += appendField(json.Address1);
  str += appendField(json.Address2);
  str += appendField(json.City, false);
  str += appendField(json.State, false);
  str += appendField(json.Zip);
  str += appendField(json.Country);
  str += appendField(json.URL);
  return str;
}

/**
 * Compresses the metadata complex contact information into a single multi-line string.
 */
function getContactInfo(json) {
  let str = "";
  str += appendField(json.Name);
  str += appendField(json.Address1);
  str += appendField(json.Address2);
  str += appendField(json.City, false);
  str += appendField(json.State, false);
  str += appendField(json.Zip);
  str += appendField(json.Country);
  str += appendField(json.Phone);
  str += appendField(json.Fax);
  str += appendField(json.Email);
  return str;
}

/**
 * Returns the text value from the XML-as-JSON object, followed by a space or a newline.
 */
function appendField(json, newLine=true) {
  if (json._text) {
    return json._text + (newLine ? " \n " : " ");
  }
  return "";
}

/**
 * Converts the given XML->JSON representation from

 * "key": {
 *   _text: "value"
 * }

 * to "key": "value".
 */
function getMore(json) {

  let convertedJSON = {};

  for (let key in json) {
    convertedJSON[key] = json[key]._text;
  }

  return convertedJSON;
}

module.exports = NIEMPackageLoader_1_0;
