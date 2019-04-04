const jsxRenderer = require("./src/jsxRenderer");
const extractImports = require("./src/extractImports");
const renderComponent = require('./src/renderComponent');
const extractConfigFrom = require("./src/extractConfigFrom");

module.exports = (content, options = {}) => {
  const { raw, config } = extractConfigFrom(content);
  const { markdown, imports } = extractImports(raw);

  const jsx = jsxRenderer.render(markdown, options);

  return renderComponent(jsx, imports, { ...options.container, config });
};
