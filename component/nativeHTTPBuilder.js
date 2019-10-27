// import our modules
var http         = require('http')
var EventEmitter = require('events')
const cluster = require('cluster');
var mem = require('./worker_mem')
class NativeHttpBuilder extends EventEmitter{

  constructor(port,instance_Num){
    super()
    this.port = port
    this.instanceNum=instance_Num <= 0 ? 1 :instance_Num

  }

  run(){

    if(this.instanceNum>0){

      if (cluster.isMaster ) {


        // Fork workers.
        for (let i = 0; i < this.instanceNum; i++) {
     var worker =  cluster.fork();
          mem.shmSet(worker.id,{type:this.port});
          // console.log(`Create Worker For HTTP Server On ${worker.id} Process(${worker.process.pid})`)


        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`native Http worker ${worker.process.pid} died`);
        });
      } else if(cluster.isWorker) {
        let my = mem.shmGet(cluster.worker.id);

        if (my.type === this.port) {

          this.server = http.createServer()

          this.server.on("request", (req, res) => {
            this.emit('onRequest', req,res)
          })
          this.server.listen(this.port)
          console.log(`Native Http Worker ${process.pid} started for Port ${this.port}`);
        }

      }

    }

  }




}

module.exports=NativeHttpBuilder