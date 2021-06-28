'use strict';

const { internalModuleReadJSON } = require('./node-internal-fs');
const { toNamespacedPath } = require('path');

const cache = new Map();

function read(jsonPath) {
  if (cache.has(jsonPath)) {
    return cache.get(jsonPath);
  }

  const [string, containsKeys] = internalModuleReadJSON(toNamespacedPath(jsonPath));
  const result = { string, containsKeys };
  cache.set(jsonPath, result);
  return result;
}

module.exports = { read };
