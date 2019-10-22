// import our modules
var http         = require('http')
var Router       = require('router')
var finalHandler = require('finalhandler')
var EventEmitter = require('events')
const cluster = require('cluster');



class MMicrosHttp extends EventEmitter{

  constructor(port,controller_path,instance_Num){
    super()
    this.port = port
    this.router=Router()
    this.cPath=controller_path
    this.instanceNum=instance_Num

  }


  getRouter(){
    return this.router
  }

  setRouter(my_router){
    this.router=my_router
  }
  run(){
    require('./controller_loader')(this.cPath,this.router)

    if(this.instanceNum>1){

      if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < this.instanceNum; i++) {
          cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
        });
      } else {
        this.server = http.createServer()

        this.server.on("request", (req, res) => {
          this.emit('pre_route', req)
          this.router(req, res, finalHandler(req, res))
        })
        this.server.listen(this.port)

        console.log(`Worker ${process.pid} started`);
      }

    }else {
      this.server = http.createServer()

      this.server.on("request", (req, res) => {
        this.emit('pre_route', req)
        this.router(req, res, finalHandler(req, res))
      })
      this.server.listen(this.port)

    }
  }




}

module.exports=MMicrosHttp