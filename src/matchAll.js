module.exports = (regex, str) => {
  let match;
  let results = [];
  do {
      match = regex.exec(str);
      if (match) {
          results.push(match);
      }
  } while (match);

  return results;
};
