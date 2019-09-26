const path = require('path');
const express = require('express');

/**
 * /themes/themeName/scripts.min.js is having SourceMap header set to
 * /themes/themeName/scripts.min.js.map
 */
const addSourceMapHeader = (req, res, next) => {
  if (req.path.endsWith('scripts.min.js')) {
    const sourceMap = req.path.replace('scripts.min.js', 'scripts.min.js.map');
    res.set('SourceMap', sourceMap);
  }
  next();
};

/**
 * Serve <folder>/_build on [port] (8080)
 */
module.exports = argv => {
  const { folder, port } = argv;
  const root = path.join(folder, '_build');
  const notFound = path.join(root, '404.html');

  const app = express();
  app.use(addSourceMapHeader);
  app.use('/', express.static(root));
  app.use('/', express.static(root + '/draft'));
  app.use((req, res, next) => {
    res.status(404).sendFile(notFound);
  });

  app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`);
  });
};
