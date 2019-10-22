// import our modules
var http         = require('http')
var Router       = require('router')
var finalHandler = require('finalhandler')
var EventEmitter = require('events')



class MMicrosHttp extends EventEmitter{

  constructor(port,controller_path){
    super()
    this.port = port
    this.router=Router()
    this.cPath=controller_path

  }


  getRouter(){
    return this.router
  }

  setRouter(my_router){
    this.router=my_router
  }
  run(){

    this.server= http.createServer()
    require('./controller_loader')(this.cPath,this.router)
    this.server.on("request",(req,res)=>{
      this.emit('pre_route',req)
    this.router(req, res, finalHandler(req, res))
    })
    this.server.listen(this.port)
  }




}

module.exports=MMicrosHttp