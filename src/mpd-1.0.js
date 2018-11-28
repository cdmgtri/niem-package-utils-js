
const JSZip = require("jszip");


const apiObjects = require("../node_modules/niem-model-api-specification/jsdocs/index");

/**
 * Load model.json from the metadata.xml file in the zip.
 *
 * @export
 * @param {*} zipBinary - Binary of an IEPD or release zip file
 * @returns {Object}
 */
async function modelImporter(zipBinary) {

  let xml = "";

  JSZip
    .loadAsync(zipBinary)
    .then( zip => {
      // Find metadata.xml
      let metadata = zip.file(/metadata.xml$/)[0];

      console.log(metadata);
      metadata.async("text").then( data => console.log(data));

      return zip;
    })
    .catch( err => console.log(err) );


  // Unzip
  // metadata.xsd objects
  // Load metadata.xml
  // Load into model.json
  // Return object

  // model-schema.json => JS objects
}

/**
 * Given an XML string from metadata.xml, loads and returns a model.json object.
 *
 * @param {JSZip} zip
 * @returns {Object} - model.json
 */
function loadMetadata(zip) {
  let metadata = zip.file(/metadata.xml$/)[0];

  if (metadata) {
    metadata
      .async("text")
      .then( data => {
        xml
      })
  }
}

function loadModel(xml) {

}

/** @type {NIEMModel} */
let modelObj = {};

/** @type {NIEMModelResponse} */
let rsp = {}
// rsp.links.packages.properties.


module.exports = {
  modelImporter
};