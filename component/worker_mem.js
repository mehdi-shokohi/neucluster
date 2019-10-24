var memShm = require('mem-shm');
var mem = new memShm("mmicro","workers");
var memID='workersID'

exports.shmGet=(key)=>{
  return mem.get(memID,key)
}

exports.shmSet=(key,value)=>{
  return mem.set(memID,key,value)
}