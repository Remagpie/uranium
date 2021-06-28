const path = require("path");

const filename = require("../filename.js");

const assertScriptCanLoadAsCJS = require("./assert-cjs");
const normalizeSlashes = require("./normalize-slash");

const compile = require("./create");

const jsHandler = require.extensions['.js'];
for (const ext of [".ts", ".tsx", ".js", ".jsx"]) {
  require.extensions[ext] = (module, name) => {
    const relname = path.relative(filename.root, name);
    const normalized = normalizeSlashes(relname);

    if (new RegExp('(^|/)node_modules/').test(normalized)) {
      return jsHandler(module, name);
    }

    assertScriptCanLoadAsCJS(name);

    const _compile = module._compile.bind(module);
    module._compile = (code, name) => {
      const result = compile(code, name);
      return _compile(result, name);
    };

    return jsHandler(module, name);
  };
}
