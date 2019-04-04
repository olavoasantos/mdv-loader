module.exports.CODE_BLOCK_REGEX = /^```/;
module.exports.ORIGIN_INDEPENDENT_URL = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
module.exports.IMPORT_REGEX = /^import(?:["'\s]*([\w*{}\n\r\t, ]+)\s+from)?\s+[\'"]([^"\']+)["\'].*;?$/gm;
module.exports.DEFAULT_OPTIONS = {
  classes: {},
  baseUrls: {},
};
