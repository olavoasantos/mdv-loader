const { getOptions } = require("loader-utils");
const jsxRenderer = require("./src/jsxRenderer");
const extractImports = require("./src/extractImports");
const renderComponent = require('./src/renderComponent');
const extractConfigFrom = require("./src/extractConfigFrom");
const { DEFAULT_OPTIONS } = require("./src/constants");


module.exports = function(content) {
  const options = Object.assign(DEFAULT_OPTIONS, getOptions(this));

  try {
    const { raw, config } = extractConfigFrom(content);
    const { markdown, imports } = extractImports(raw);

    const jsx = jsxRenderer.render(markdown, options);

    return renderComponent(jsx, imports, { ...options.container, config });
  } catch (err) {
    throw new Error(`[mdv-loader] ${err.message}`);
  }
};
