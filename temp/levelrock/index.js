var db = require('./loader')


(async ()=>{
await db.rocksSet('name','mehdi')
let v = await db.rocksGet('name') 

console.log(v)
})()
