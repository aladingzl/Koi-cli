const { promisify } = require('util')
const open = require('open')
const path = require('path')

const { hint } = require('../utils/log')
const terminal = require('../utils/terminal')
const repoConfig = require('../config/repo')
const path = require('path')
const { ejsComplie, createDirSync, writeFile } = require('../utils/file')
const downloadRepo = promisify(require('download-git-repo'))

const createProject = async (project, args) => {
  hint('The project is being created，please wait a moment~')

  await downloadRepo(repoConfig.repoOfVue, project, { clone: true })

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await terminal.spawnCommand(npm, ['install'], { cwd: `./${project}` })
  terminal.spawnCommand(npm, ['run', 'serve'], { cwd: `./${project}` })

  open('http://localhost:8080/')
}
const handleEjsToFile = (name, dest, template, filename) => {
  const templatePath = path.resolve(__dirname, template)
  const cpnPath =
    dest.replace('router', 'views').replace('src', '@') + `/${name}.vue`
  const routePath = dest.replace('/router', '').replace('src', '')

  const result = ejsComplie(
    templatePath,
    {
      name,
      lowerName: name.toLowerCase()
    },
    cpnPath,
    routePath
  )

  createDirSync(dest)
  const targetPath = path.resolve(dest, filename)
  writeFile(targetPath, result)
}

const addComponent = (name, dest) => {
  handleEjsToFile(name, dest, '../template/component.vue.ejs', `${name}.vue`)
}

const addPage = (name, dest) => {
  addComponent(name, dest)
  handleEjsToFile(name, dest, '../template/vue-router.js.ejs', 'router.js')
}

const addStore = (name, dest) => {
  handleEjsToFile(name, dest, '../template/vue-store.js.ejs', 'index.js')
  handleEjsToFile(name, dest, '../template/vue-types.js.ejs', 'types.js')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addStore
}
