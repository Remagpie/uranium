const sourceMapSupport = require('source-map-support');
const ts = require("typescript");
const {BaseError} = require("make-error");
const util = require("util");

const filename = require("../filename");
const tsconfig = require("../../tsconfig.json");

const normalizeSlashes = require("./normalize-slash");
const updateOutput = require("./update-output");

class TSError extends BaseError {
  name = 'TSError';

  constructor(diagnosticText, diagnosticCodes) {
    super(`⨯ Unable to compile TypeScript:\n${diagnosticText}`);
  }

  /**
   * @internal
   */
  [util.inspect.custom]() {
    return this.diagnosticText;
  }
}

const rawConfig = {
  files: [],
  include: [],
  compilerOptions: {
    ...tsconfig.compilerOptions,
    sourceMap: true,
    inlineSourceMap: false,
    inlineSources: true,
    declaration: false,
    noEmit: false,
    outDir: '.ts-node',
  },
};

const config = ts.parseJsonConfigFileContent(rawConfig, ts.sys, filename.root);
delete config.options.out;
delete config.options.outFile;
delete config.options.composite;
delete config.options.declarationDir;
delete config.options.declarationMap;
delete config.options.emitDeclarationOnly;

const ignoreDiagnostics = [
  6059, // "'rootDir' is expected to contain all source files."
  18002, // "The 'files' list in config file is empty."
  18003, // "No inputs were found in config file."
];

const configDiagnosticList = filterDiagnostics(config.errors, ignoreDiagnostics);
const cache = new Map();

const diagnosticHost = {
  getNewLine: () => ts.sys.newLine,
  getCurrentDirectory: () => filename.root,
  getCanonicalFileName: ts.sys.useCaseSensitiveFileNames
    ? (x) => x
    : (x) => x.toLowerCase(),
};

// Install source map support and read from memory cache.
sourceMapSupport.install({
  environment: "node",
  retrieveFile(pathOrUrl) {
    // If it's a file URL, convert to local path
    // Note: fileURLToPath does not exist on early node v10
    // I could not find a way to handle non-URLs except to swallow an error
    const path = normalizeSlashes(pathOrUrl);
    return cache.get(path) || '';
  },
});

function createTSError(diagnostics) {
  const diagnosticText = ts.formatDiagnostics(diagnostics, diagnosticHost);
  const diagnosticCodes = diagnostics.map((x) => x.code);
  return new TSError(diagnosticText, diagnosticCodes);
}

// Render the configuration errors.
if (configDiagnosticList.length) {
  throw createTSError(configDiagnosticList);
}

// Create a simple TypeScript compiler proxy.
module.exports = function compile(code, name) {
  const normalizedFileName = normalizeSlashes(name);
  const result = ts.transpileModule(code, {
    normalizedFileName,
    compilerOptions: config.options,
    reportDiagnostics: true,
  });

  const diagnosticList = filterDiagnostics(
    result.diagnostics || [],
    ignoreDiagnostics
  );
  if (diagnosticList.length) {
    throw createTSError(diagnosticList);
  }

  const output = updateOutput(result.outputText, normalizedFileName, result.sourceMapText);
  cache.set(normalizedFileName, output);
  return output;
}

function filterDiagnostics(diagnostics, ignore) {
  return diagnostics.filter((x) => !ignore.includes(x.code));
}
