
class rocksDb {


  constructor (path){
   this.path=path

  }

   open(){
    this.db= require('level-packager')(require('rocksdb'))(this.path)
  }


  rocksPut (key, value)  {
    return new Promise((resolve, reject) => {

      this.db.put(key, value, function (err) {
        if (err) reject(err)

        resolve(value)
      })

    })

  }


  rocksGet  (key)  {
    return new Promise((resolve, reject) => {
      this.db.get(key, function (err, value) {
        if (err) reject(err)

        resolve(value)
      })

    })

  }
}

module.exports=rocksDb