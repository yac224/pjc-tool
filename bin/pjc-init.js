#!/usr/bin/env node

let fs = require('fs'),
  path = require('path'),
  exists = require('fs').existsSync,
  inquirer = require('inquirer'),
  cmd = require('commander'),
  copy = require('graceful-copy')
cmd.usage('<template-name> [project-name]')
cmd.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log('    # create a new project with a local template')
  console.log('    $ vue init template-name project-name')
  console.log()
})

function help() {
  cmd.parse(process.argv)
  if (cmd.args.length < 1) return cmd.help()
}
help()
process.on('exit', function () {
  console.log()
})
let template = cmd.args[0],
  project = cmd.args[1],
  hasSlash = template.indexOf('/') > -1,
  inPlace = !project || project === '.',
  name = inPlace ? path.relative('../', process.cwd()) : project,
  to = path.resolve(project || '.')
let data
template = hasSlash ? template : path.resolve(__dirname, '../template/' + template)
if (exists(template)) {
  if (exists(to)) {
    inquirer.prompt([{
      type: 'confirm',
      message: inPlace ? 'Generate project in current directory?' : 'Target directory exists. Continue?',
      name: 'ok'
    }]).then(function (answers) {
      if (answers.ok) {
        ask()
      }
    })
  } else {
    ask()
  }
} else {
  console.log('Template is not exist.')
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function ask() {
  try {
    let prompt = require(path.resolve(template, 'prompt.js'))(path.basename(to))
    inquirer.prompt(prompt).then(function (answers) {
      data = answers
      run()
    })
  } catch (e) {
    data = {}
    run()
  }
}

function run() {
  copy({
    src: path.resolve(template, 'template'),
    dest: path.resolve(process.cwd(), to),
    data: data
  }, err => {
    if (err) return console.log(err)
  })
}

