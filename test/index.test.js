
let fs = require("fs");
let path = require("path");

let { NIEMPackageLoader } = require("../index");

jest.setTimeout(30000);

let filePath = path.join(__dirname,
  "../test/data/Individualized_Education_Program_(IEP).zip");
let zipBinary = fs.readFileSync(filePath);

test("metadata", async () => {
  let pkg = await new NIEMPackageLoader(zipBinary);
  let model = await pkg.extractMetadata();

  expect(model.name).toEqual("Individualized Education Program (IEP)");
  expect(model.versions[0].modelName).toEqual("Individualized Education Program (IEP)");
});
