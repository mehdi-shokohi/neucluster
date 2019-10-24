// import our modules
var EventEmitter = require('events')
const cluster = require('cluster');
var mem = require('./worker_mem')



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

        mem.shmSet(worker.id,{type:'schedule',file:this.files[i]});
        // console.log(`Create Worker For Schedule JOB on ${worker.id} Process(${worker.process.pid})`)

      }
    }else if(cluster.isWorker ){

      let my = mem.shmGet(cluster.worker.id);
      if(my.type==='schedule'){
      let addressWorker = this.jPath + "/" + my.file;
      require(addressWorker).JobRunning();
      console.log(`Schedule Worker ${process.pid} For ${my.file}`);
    }
    }

  }


}

module.exports=MMicrosSchedule