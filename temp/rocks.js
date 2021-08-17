exports.rocksPut = (key,value)=> {
  return new Promise((resolve,reject)=>{
    const db = require('level-packager')(require('rocksdb'))('./storage')

    db.put(key, value, function (err) {
      if (err) reject(err)
      db.close()
      resolve(value)
    })


  })

}



exports.rocksGet = (key)=>{
  return new Promise((resolve,reject)=>{
    const db = require('level-packager')(require('rocksdb'))('./storage')
    db.get(key, function (err, value) {
      if (err) reject(err)

      db.close()
      resolve(value)
    })

  })

}
