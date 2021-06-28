const path = require("path");

module.exports = function updateOutput(outputText, fileName, sourceMap) {
  const base64Map = Buffer.from(
    updateSourceMap(sourceMap, fileName),
    'utf8'
  ).toString('base64');
  const sourceMapContent = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${base64Map}`;
  // Expected form: `//# sourceMappingURL=foo bar.js.map` or `//# sourceMappingURL=foo%20bar.js.map` for input file "foo bar.tsx"
  // Percent-encoding behavior added in TS 4.1.1: https://github.com/microsoft/TypeScript/issues/40951
  const prefix = '//# sourceMappingURL=';
  const prefixLength = prefix.length;
  const baseName = /*foo.tsx*/ path.basename(fileName);
  const extName = /*.tsx*/ path.extname(fileName);
  const extension = ".js";
  const sourcemapFilename =
    baseName.slice(0, -extName.length) + extension + '.map';
  const sourceMapLengthWithoutPercentEncoding =
    prefixLength + sourcemapFilename.length;
  /*
   * Only rewrite if existing directive exists at the location we expect, to support:
   *   a) compilers that do not append a sourcemap directive
   *   b) situations where we did the math wrong
   *     Not ideal, but appending our sourcemap *after* a pre-existing sourcemap still overrides, so the end-user is happy.
   */
  if (
    outputText.substr(-sourceMapLengthWithoutPercentEncoding, prefixLength) ===
    prefix
  ) {
    return (
      outputText.slice(0, -sourceMapLengthWithoutPercentEncoding) +
      sourceMapContent
    );
  }
  // If anyone asks why we're not using URL, the URL equivalent is: `u = new URL('http://d'); u.pathname = "/" + sourcemapFilename; return u.pathname.slice(1);
  const sourceMapLengthWithPercentEncoding = prefixLength + encodeURI(sourcemapFilename).length;
  if (
    outputText.substr(-sourceMapLengthWithPercentEncoding, prefixLength) ===
    prefix
  ) {
    return (
      outputText.slice(0, -sourceMapLengthWithPercentEncoding) +
      sourceMapContent
    );
  }

  return `${outputText}\n${sourceMapContent}`;
}

function updateSourceMap(sourceMapText, fileName) {
  const sourceMap = JSON.parse(sourceMapText);
  sourceMap.file = fileName;
  sourceMap.sources = [fileName];
  delete sourceMap.sourceRoot;
  return JSON.stringify(sourceMap);
}
