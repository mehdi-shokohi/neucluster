var fs = require('fs');
  walkSync = function (dir,router) {
    files = fs.readdirSync(dir)
    files.forEach(function (file) {
        if (file.match(/\.js$/) !== null && file !== 'noname.js') {
          let name = file.replace('.js', '')
          address = dir.replace(dir + '/\/', '.') + '/' + name
          router.use('/' + name, require(address))
        }
    })
    return 0
  }

module.exports = walkSync
