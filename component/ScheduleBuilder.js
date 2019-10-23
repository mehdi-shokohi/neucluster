// import our modules
var EventEmitter = require('events')
const cluster = require('cluster');



class MMicrosSchedule extends EventEmitter{

  constructor(Job_path,files){
    super()

    this.jPath=Job_path
    this.files=files

  }

  run(){
    if (cluster.isMaster) {
      for (let i = 0; i < this.files.length; i++) {

        cluster.fork();
      }
    }else if(cluster.isWorker ){
      let index=(cluster.worker.id)-1;
      if(index<this.files.length && index>=0){
      let addressWorker = this.jPath + "/" + this.files[index];
      require(addressWorker).JobRunning();
      console.log(`Schedule Worker ${process.pid} For  Schedule System `);
    }
    }

  }

runExec(){
  const { exec } = require('child_process');

  const child = exec('node', [__dirname+'/../runner.js'], (a,b,c)=>{
    console.log(a)
    console.log(b)
    console.log(c)
  });
}




}

module.exports=MMicrosSchedule