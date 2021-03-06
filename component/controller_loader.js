var fs = require('fs');
  walkSync = function (dir,router,prePath) {
    files = fs.readdirSync(dir)
    files.forEach(function (file) {
        if (file.match(/\.js$/) !== null ) {
          let name = file.replace('.js', '')
          address = dir.replace(dir + '/\/', '.') + '/' + name
          router.use(prePath+'/' + name, require(address))
        }
    })
    return 0
  }

module.exports = walkSync
