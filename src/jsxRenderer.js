const marked = require("marked");
const { cleanUrl, escape, unescape } = require('./helpers');

class JsxRenderer extends marked.Renderer {
  getClassFor(tag) {
    const name = this.options.mdv.classes[tag];
    return name ? ` class="${name}"` : '';
  }

  render(contents, options) {
    this.options.mdv = options;

    const html = marked(contents, { renderer: this });

    return unescape(html);
  }

  blockquote(quote) {
    return `<blockquote>${quote}</blockquote>\n`;
  }

  heading(text, level, raw, slugger) {
    const className = this.getClassFor(`h${level}`);
    if (this.options.headerIds) {
      return `<h${level} id="${this.options.headerPrefix}${slugger.slug(raw)}"${className}>${text}</h${level}>\n`;
    }
    return `<h${level}${className}>${text}</h${level}>\n`;
  }

  hr() {
    const className = this.getClassFor('hr');
    return this.options.xhtml ? `<hr${className} />\n` : `<hr${className}>\n`;
  }

  list(body, ordered, start) {
    const className = this.getClassFor(ordered ? 'ol' : 'ul');
    const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return `<${type}${startatt}${className}>${body}</${type}${startatt}>\n`;
  }

  listitem(text) {
    const className = this.getClassFor('li');
    return `<li${className}>${text}</li>\n`;
  }

  checkbox(checked) {
    const checked = checked ? ' checked' : '';
    const className = this.getClassFor('checkbox');
    return `<input${checked}${className} disabled="" type="checkbox" />`;
  }

  paragraph(text) {
    const className = this.getClassFor('p');
    return `<p${className}>${text}</p>\n`;
  }

  table(header, body) {
    if (body) {
      const tableBodyClass = this.getClassFor('tbody');
      body = `<tbody${tableBodyClass}>${body}</tbody>`;
    }

    const tableClass = this.getClassFor('table');
    const tableHeadClass = this.getClassFor('thead');
    return `<table${tableClass}><thead${tableHeadClass}>${header}</thead>${body}</table>\n`;
  }

  tablerow(content) {
    const trClass = this.getClassFor('tr');
    return `<tr${trClass}>${content}</tr>\n`;
  }

  tablecell(content, flags) {
    const type = flags.header ? 'th' : 'td';
    const typeClass = this.getClassFor(type);
    const align = flags.align ? ` align="flags.align"` : '';
    return `<${type}${typeClass}${align}>${content}</${type}>\n`;
  }

  strong(text) {
    const className = this.getClassFor('strong');
    return `<strong${className}>${text}</strong>\n`;
  }

  em(text) {
    const className = this.getClassFor('em');
    return `<em${className}>${text}</em>\n`;
  }

  del(text) {
    const className = this.getClassFor('del');
    return `<del${className}>${text}</del>\n`;
  }

  link(href, title, text) {
    href = cleanUrl(
      this.options.sanitize,
      this.options.baseUrl,
      href,
      this.options.mdv.baseUrls,
    );
    if (href === null) {
      return text;
    }
    const url = ` href="${escape(href)}"`;
    const className = this.getClassFor('a');
    const titleTag = title ? ` title="${title}"` : '';
    return `<a${className}${url}${titleTag}>${text}</a>`;
  }

  image(href, title, text) {
    href = cleanUrl(
      this.options.sanitize,
      this.options.baseUrl,
      href,
      this.options.mdv.baseUrls,
    );
    if (href === null) {
      return text;
    }
    const alt = ` alt="${text}"`;
    const src = ` src="${escape(href)}"`;
    const className = this.getClassFor('a');
    const titleTag = title ? ` title="${title}"` : '';
    return `<img${className}${src}${alt}${titleTag} />`;
  }

  codespan(text) {
    const className = this.getClassFor('codespan');
    return `<code${className}>{\`${unescape(text)}\`}</code>`;
  }

  code(code, lang, escaped) {
    const preClassName = this.getClassFor('pre');
    const codeClassName = this.options.mdv.classes.code || '';
    if (lang && this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        return `
        <pre${preClassName}>
          <code
            className="${lang} ${codeClassName}"
            dangerouslySetInnerHTML={{ __html: \`${out.replace(/"/g, '\\"')}\` }}
          />
        </pre>
        `;
      }
    }

    return `
    <pre${preClassName}>
      <code className="${lang} ${codeClassName}">
        ${escaped ? code : "{`" + escape(code) + "`}"}
      </code>
    </pre>
    `;
  }
}

const renderer = new JsxRenderer();
marked.Renderer.call(renderer);
module.exports = renderer;
