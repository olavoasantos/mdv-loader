const { ORIGIN_INDEPENDENT_URL } = require('./constants');

const escape = html => html.replace(/`/g, '&quot;');

const unescape = html => html
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

const rtrim = (str, c, invert) => {
  if (str.length === 0) {
    return '';
  }

  let suffLen = 0;
  while (suffLen < str.length) {
    const currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen += 1;
    } else if (currChar !== c && invert) {
      suffLen += 1;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
};

const resolveUrl = (base, href, baseUrls = {}) => {
  if (!baseUrls[` ${base}`]) {
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[` ${base}`] = `${base}/`;
    } else {
      baseUrls[` ${base}`] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[` ${base}`];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  }
  return base + href;
};

const cleanUrl = (sanitize, base, href, options = {}) => {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !ORIGIN_INDEPENDENT_URL.test(href)) {
    href = resolveUrl(base, href, options);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
};

module.exports.escape = escape;
module.exports.unescape = unescape;
module.exports.cleanUrl = cleanUrl;
module.exports.resolveUrl = resolveUrl;
