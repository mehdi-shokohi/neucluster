// import our modules
var http         = require('http')
var Router       = require('router')
var finalHandler = require('finalhandler')
var EventEmitter = require('events')
const cluster = require('cluster');
var mem = require('./worker_mem')
class MMicrosHttp extends EventEmitter{

  constructor(port,controller_path,instance_Num){
    super()
    this.port = port
    this.router=Router()
    this.cPath=controller_path
    this.instanceNum=instance_Num <= 0 ? 1 :instance_Num

  }


  getRouter(){
    return this.router
  }

  setRouter(my_router){
    this.router=my_router
  }
  run(){
    require('./controller_loader')(this.cPath,this.router)

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

          this.server = http.createServer()

          this.server.on("request", (req, res) => {
            this.emit('pre_route', req)
            this.router(req, res, finalHandler(req, res))
          })
          this.server.listen(this.port)
          console.log(`Http Worker ${process.pid} started for Port ${this.port}`);
        }

      }

    }

  }




}

module.exports=MMicrosHttp