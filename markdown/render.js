const parse = require('./parse');

/**
 * Render markdown
 */
module.exports = async (markdown, theme) => {
  const {
    template,
    options,
    styles,
    scripts,
    beforeRender,
  } = theme;

  const parsed = parse(markdown);

  let data = {
    ...parsed,
    '_theme': {
      options,
      styles,
      scripts
    }
  };

  if (beforeRender) {
    data = beforeRender(data);
  }

  const html = await template(data);
  return html;
};
