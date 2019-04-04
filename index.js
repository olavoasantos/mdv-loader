const { getOptions } = require("loader-utils");
const mdvRenderer = require('./mdvRenderer');
const { DEFAULT_OPTIONS } = require("./src/constants");


module.exports = function(content) {
  const options = Object.assign(DEFAULT_OPTIONS, getOptions(this));

  try {
    return mdvRenderer(content, options);
  } catch (err) {
    throw new Error(`[mdv-loader] ${err.message}`);
  }
};
