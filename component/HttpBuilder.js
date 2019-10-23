// import our modules
var http         = require('http')
var Router       = require('router')
var finalHandler = require('finalhandler')
var EventEmitter = require('events')
const cluster = require('cluster');
var memShm = require('mem-shm');
var mem = new memShm("mmicro","workers");
const memoryId='share_worker'
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

        console.log(`Http Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < this.instanceNum; i++) {
     var worker =  cluster.fork();
          mem.set(memoryId,worker.id,{type:'http'});


        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Http worker ${worker.process.pid} died`);
        });
      } else if(cluster.isWorker) {
        let my = mem.get(memoryId,cluster.worker.id);
        if (my.type === 'http') {

          this.server = http.createServer()

          this.server.on("request", (req, res) => {
            this.emit('pre_route', req)
            this.router(req, res, finalHandler(req, res))
          })
          this.server.listen(this.port)
          console.log(`Http Worker ${process.pid} started`);
        }

      }

    }

  }




}

module.exports=MMicrosHttp