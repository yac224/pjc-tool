module.exports = function (projectName) {
  return [{
    type: 'input',
    message: 'Project name',
    default: projectName,
    name: 'name'
  }, {
    type: 'input',
    message: 'Project description',
    default: 'A project create from pjc-tool',
    name: 'description'
  }]
}

