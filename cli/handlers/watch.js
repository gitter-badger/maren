const path = require('path');
const fse = require('fs-extra');
const chokidar = require('chokidar');

const build = require('../../build');
const themes = require('../../themes');
const render = require('../../markdown/render');

const initWatcher = (folder, persistent) => {
  const paths = [
    path.join(folder, 'documents', '**/*.md'),
    path.join(folder, 'draft', '**/*.md')
  ];

  const watchOptions = {
    awaitWriteFinish: {
      stabilityThreshold: 500
    },
  };

  const watcher = chokidar.watch(paths, { ...watchOptions, persistent });
  return watcher;
};

let count = 0;
const addchange = async (mdPath, outputPath, theme) => {
  const markdown = await fse.readFile(mdPath, 'utf-8');
  const output = await render(markdown, theme);
  await fse.outputFile(outputPath, output);

  count += 1;
  console.log('OUT %s', outputPath);
};

const unlink = (outputPath) => {
  fse.remove(outputPath, err => {
    if (err) return;
    console.log('DEL %s', outputPath);
  });
};

/**
 * Watch *.md and produce *.html
 */
module.exports = async argv => {
  const { folder, theme: themeName, once } = argv;
  const persistent = once ? false : true;

  let theme = await themes(folder, themeName);
  theme = await build.reinit(folder, theme);

  const watcher = initWatcher(folder, persistent);
  console.log(`Watching ${folder}, theme=${themeName}`);

  watcher.on('all', async (event, mdPath) => {
    const outputPath = build.buildPath(folder, mdPath);

    if (event === 'add' || event === 'change') {
      await addchange(mdPath, outputPath, theme);
    }

    if (event === 'unlink') {
      unlink(outputPath);
    }
  });

  process.on('exit', code => {
    if (!persistent) {
      console.log();
      console.log(`Finished! (${count} files)`);
    }
  });
};
