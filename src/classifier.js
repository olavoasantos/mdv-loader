const { CODE_BLOCK_REGEX, IMPORT_REGEX } = require('./constants');

module.exports = (raw) => raw.split('\n').reduce((nodes, line) => {
  if (IMPORT_REGEX.test(line) && !nodes.isCodeBlock) {
    nodes.imports.push(line);
  } else {
    if (CODE_BLOCK_REGEX.test(line)) {
      nodes.isCodeBlock = !nodes.isCodeBlock;
    }
    nodes.markdown.push(line);
  }

  return nodes;
}, { imports: [], markdown: [], isCodeBlock: false });