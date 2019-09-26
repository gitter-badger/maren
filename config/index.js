const path = require('path');
const fse = require('fs-extra');

let json;

/**
 * Load maren.json
 */
module.exports = cwd => {
  if (!json) {
    json = fse.readJsonSync(
      path.resolve(cwd, 'maren.json'), { throws: false });
  }

  return json;
};
