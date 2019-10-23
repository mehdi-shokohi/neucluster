// import our modules
var EventEmitter = require('events')
const cluster = require('cluster');
var memShm = require('mem-shm');
var mem = new memShm("mmicro","workers");
const memoryId='share_worker'


class MMicrosSchedule extends EventEmitter{

  constructor(Job_path,files){
    super()

    this.jPath=Job_path
    this.files=files

  }

  run(){
    if (cluster.isMaster) {
      for (let i = 0; i < this.files.length; i++) {

        var worker =  cluster.fork();
        mem.set(memoryId,worker.id,{type:'schedule',file:this.files[i]});
      }
    }else if(cluster.isWorker ){

      let my = mem.get(memoryId,cluster.worker.id);
      if(my.type==='schedule'){
      let addressWorker = this.jPath + "/" + my.file;
      require(addressWorker).JobRunning();
      console.log(`Schedule Worker ${process.pid} For  Schedule System `);
    }
    }

  }


}

module.exports=MMicrosSchedule