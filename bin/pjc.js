#!/usr/bin/env node

var cmd = require('commander')

cmd
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .parse(process.argv)
