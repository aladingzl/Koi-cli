const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const log = require('./log')

const ejsComplie = (templatePath, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

const createDirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (createDirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error('the file already exists~')
    return
  }
  return fs.promises.writeFile(path, content)
}

module.exports = {
  ejsComplie,
  createDirSync,
  writeFile
}
