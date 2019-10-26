var WebSocketServer = require('rpc-websockets').Server
const cluster = require('cluster');
var mem = require('./worker_mem')
var loader = require('./functions_loader')
// instantiate Server and start listening for requests
class rpcServer{
  constructor (port,funcPath,instance_Num){
    this.funcPath=funcPath
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
          console.log(`Http worker ${worker.process.pid} died`);
        });
      } else if(cluster.isWorker) {
        let my = mem.shmGet(cluster.worker.id);

        if (my.type === this.port) {
          this.server = new WebSocketServer({ port: this.port, host: '0.0.0.0' })
          loader(this.funcPath,this.server)

          console.log(`RPC Server Worker ${process.pid} started for Port ${this.port}`);
        }

      }

    }

  }
}

module.exports=rpcServer