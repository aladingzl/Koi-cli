const { program } = require('commander')

const { createProject, addComponent, addPage, addStore } = require('./action')

const createCommands = () => {
  program
    .command('create <project> [other...]')
    .description('clone a repo to create new directory')
    .action(createProject)

  program
    .command('addcpn <name>')
    .description('add vue component')
    .action((name) => addComponent(name, program.dest || 'src/components'))

  program
    .command('addpage <name>')
    .description('add vue page, eg: koi addpage Home [-d dest')
    .action((name) =>
      addPage(name, program.dest || `src/pages/${name.toLowerCase()}`)
    )

  program
    .command('addstore <name>')
    .description('add vue store')
    .action((name) =>
      addStore(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
    )
}

module.exports = createCommands
