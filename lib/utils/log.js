const chalk = require('chalk')

const log = console.log
const hint = (...info) => {
  log(chalk.blue(info))
}

const error = (...info) => {
  log(chalk.red(info))
}

module.exports = {
  hint,
  error
}
