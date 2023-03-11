const { program } = require('commander')

const helpOptions = () => {
  program.option(
    '-d --dest <dest>',
    'a destination folder, eg: -d src/pages, err: /src/pages'
  )
  program.option('-f --framwork <framework>', 'your framework name')

  program.on('--help', () => {
    console.log('usage')
    console.log('   koi -V')
  })
}

module.exports = helpOptions
