var memShm = require('mem-shm');
var mem = new memShm("mmicro","user_mem");
var memID='user_etc'

exports.shmGet=(key)=>{
  return mem.get(memID,key)
}


exports.shmSet=(key,value)=>{
  return mem.set(memID,key,value)
}