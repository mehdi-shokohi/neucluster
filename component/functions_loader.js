let path = require('path'),
  fs = require('fs'),
  walkSync = function (dir,server) {
    files = fs.readdirSync(dir)
    files.forEach(function (file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        walkSync(path.join(dir, file))
      }
      else {
        // if (file.match(/\.js$/) !== null && file !== 'index.js') {
          let name = file.replace('.js', '')
          address = dir.replace(dir + '/\/', '.') + '/' + name
          exports[name] = require(address)(server)
        // }
      }
    })
    return 0
  }

module.exports = walkSync