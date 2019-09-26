#!/usr/bin/env node

const cwd = process.cwd();

// Handlers
const init = require('./handlers/init');
const serve = require('./handlers/serve');
const watch = require('./handlers/watch');

const initCommand = [
  'init',
  'init current folder',
  {},
  init
];

const watchCommand = [
  'watch [--once]',
  'watch markdown files for changes in current folder and create html',
  yargs => {
    yargs.positional('once', {
      type: 'boolean',
      default: false,
      describe: 'watch only once, then quit'
    });
  },
  watch
];

const serveCommand = [
  'serve [--port]',
  'serve files for local preview',
  yargs => {
    yargs.positional('port', {
      type: 'number',
      default: 8080
    });
  },
  serve
];

const json = require('../config')(cwd);
const yargs = require('yargs').scriptName('maren');
yargs
  .config({
    folder: cwd,
    theme: (json && json.theme) || 'default'
  })
  .command(...initCommand)
  .command(...watchCommand)
  .command(...serveCommand);

const plugins = require('../plugins')(json, 'command', cwd);
for (const plugin of plugins) {
  yargs.command(...plugin.command);
}

yargs
  .demandCommand(1, 1, 'Command is required!')
  .help()
  .argv;
