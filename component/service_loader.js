let path = require('path'),
  fs = require('fs'),
  walkSync = function (dir) {
    files = fs.readdirSync(dir)
    files.forEach(function (file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        walkSync(path.join(dir, file))
      }
      else {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
          let name = file.replace('.js', '')
          address = dir.replace(dir + '/\/', '.') + '/' + name
          global[name] = require(address)
        }
      }
    })
    return 0
  }

module.exports = walkSync