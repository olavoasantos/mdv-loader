const yaml = require('js-yaml');
const matchAll = require('./matchAll');

const YAML_REGEX = /---([a-z]+)?\n([^-]*)---/gm;

module.exports = (raw) => {
  const config = matchAll(YAML_REGEX, raw).reduce((config, match) => {
    return match[1]
      ? { ...config, [match[1]]: yaml.load(match[2]) }
      : { ...config, ...yaml.load(match[2]) };
  }, {});

  return { raw: raw.replace(YAML_REGEX, ''), config };
}
