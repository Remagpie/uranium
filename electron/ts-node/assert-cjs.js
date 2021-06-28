const path = require("path");
const packageJsonReader = require("./package-json-reader");

module.exports = function assertScriptCanLoadAsCJSImpl(filename) {
  const pkg = readPackageScope(filename);
  // Function require shouldn't be used in ES modules.
  if (pkg && pkg.data && pkg.data.type === 'module') {
    const parentPath = module.parent && module.parent.filename;
    const packageJsonPath = path.resolve(pkg.path, 'package.json');
    throw createErrRequireEsm(filename, parentPath, packageJsonPath);
  }
};

// Copied from https://github.com/nodejs/node/blob/2d5d77306f6dff9110c1f77fefab25f973415770/lib/internal/modules/cjs/loader.js#L285-L301
function readPackageScope(checkPath) {
  const rootSeparatorIndex = checkPath.indexOf(path.sep);
  let separatorIndex;
  while (
    (separatorIndex = checkPath.lastIndexOf(path.sep)) > rootSeparatorIndex
  ) {
    checkPath = checkPath.slice(0, separatorIndex);
    if (checkPath.endsWith(path.sep + 'node_modules'))
      return false;
    const pjson = readPackage(checkPath);
    if (pjson) return {
      path: checkPath,
      data: pjson
    };
  }
  return false;
}

const packageJsonCache = new Map();

// Copied from https://github.com/nodejs/node/blob/v15.3.0/lib/internal/modules/cjs/loader.js#L275-L304
function readPackage(requestPath) {
  const jsonPath = path.resolve(requestPath, 'package.json');

  const existing = packageJsonCache.get(jsonPath);
  if (existing !== undefined) return existing;

  const result = packageJsonReader.read(jsonPath);
  const json = result.containsKeys === false ? '{}' : result.string;
  if (json === undefined) {
    packageJsonCache.set(jsonPath, false);
    return false;
  }

  try {
    const parsed = JSON.parse(json);
    const filtered = {
      name: parsed.name,
      main: parsed.main,
      exports: parsed.exports,
      imports: parsed.imports,
      type: parsed.type
    };
    packageJsonCache.set(jsonPath, filtered);
    return filtered;
  } catch (e) {
    e.path = jsonPath;
    e.message = 'Error parsing ' + jsonPath + ': ' + e.message;
    throw e;
  }
}
