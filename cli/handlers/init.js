const path = require('path');
const fse = require('fs-extra');

const gitignoreContent = [
  'node_modules/',
  '_build/',
  'draft/',
  'images/',
  'themes/',
  ''
].join('\n');

/**
 * Initialize <folder> by creating .gitignore
 */
module.exports = async argv => {
  const { folder } = argv;

  console.log(`Initialize: ${folder}`);

  const gitignorePath = path.join(folder, '.gitignore');
  await fse.writeFile(gitignorePath, gitignoreContent);

  console.log('Done!');
};
