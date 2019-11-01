const fs = require('fs'),
  path = require('path'),
  db={},
  Sequelize = require('sequelize')

walkSync = function (config,models_dir,relationFile) {

 let  sequelize = new Sequelize(config.database,config.username, config.password, config)



    files = fs.readdirSync(models_dir)
    files.forEach(function (file) {
      if (fs.statSync(path.join(models_dir, file)).isDirectory()) {
        walkSync(path.join(models_dir, file),relationFile)
      }
      else {
        if (path.join(models_dir, file) !== path.normalize(relationFile)) {
          const model = sequelize['import'](path.join(models_dir, file))
          db[model.name] = model
        }
      }
    })

    return require(relationFile)(db)
  }

module.exports = walkSync