const classifier = require('./classifier')

module.exports = (raw) => {
  const { markdown, imports } = classifier(raw);

  return {
    markdown: markdown.join('\n'),
    imports: imports.join('\n'),
  };
}
