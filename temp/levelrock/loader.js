
var db = require('level-packager')(require('rocksdb'))('./storage')


exports.rocksPut = (key,value)=> {
  return new Promise((resolve,reject)=>{

    db.put(key, value, function (err) {
      if (err) reject(err)

      resolve(value)
    })


  })

}



exports.rocksGet = (key)=>{
  return new Promise((resolve,reject)=>{
    db.get(key, function (err, value) {
      if (err) reject(err)


      resolve(value)
    })

  })

}

