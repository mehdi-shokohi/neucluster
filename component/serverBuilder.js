var EventEmitter = require('events')
const cluster = require('cluster');
var mem = require('./worker_mem')

class serverBuilder extends EventEmitter{


  constructor(port,instance_Num){
    super()
    this.port = port
    this.instanceNum=instance_Num <= 0 ? 1 :instance_Num

  }

  run(){

    if(this.instanceNum>0){

      if (cluster.isMaster ) {
        for (let i = 0; i < this.instanceNum; i++) {
          var worker =  cluster.fork();
          mem.shmSet(worker.id,{type:this.port});


        }

        cluster.on('exit', this.onExit)

      } else if(cluster.isWorker) {

        let my = mem.shmGet(cluster.worker.id);

        if (my.type === this.port) {

          this.serverInit()
          this.afterStart()
        }


      }
    }

  }

  afterStart(){
    console.log(`My Custom Server Worker ${process.pid} started for Port ${this.port}`);

  }


  serverInit(){
    console.log("Add 'serverInit' Method  For Your Custom Server ")
  }


  onExit(worker, code, signal) {
      console.log(`worker ${worker.process.pid} died`);
    }

}

module.exports=serverBuilder