const path = require('path');
const fse = require('fs-extra');

const themes = {};

module.exports = (folder, themeName) => {
  if (themes[themeName]) {
    return themes[themeName];
  }

  const name = themeName;
  const location = path.join(folder, 'themes', themeName);
  let template;
  try {
    template = require(`${location}/template.js`);
  } catch (e) {
    console.log(`Unknown theme: ${themeName}`);
    process.exit(1);
  }

  let options;
  try {
    options = fse.readJsonSync(`${location}/options.json`);
  } catch (e) {}

  const styles = `/themes/${themeName}/styles.min.css`;
  const scripts = `/themes/${themeName}/scripts.min.js`;

  const theme = {
    name,
    location,
    template,
    options,
    styles,
    scripts
  };
  themes[themeName] = theme;

  return themes[themeName];
};
