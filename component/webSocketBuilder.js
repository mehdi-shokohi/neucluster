const cluster = require('cluster');
var mem = require('./worker_mem')
var WebSocketServer = require('websocket').server;
var EventEmitter = require('events')
var http = require('http');

class webSocketBuilder extends EventEmitter{
  constructor(port,options,instanceNum){
    super()
    this.port=port
    this.options=options||{}
    this.instanceNum=instanceNum
  }



  run(){

    let _self = this;

    if(this.instanceNum>0){

      if (cluster.isMaster ) {


        // Fork workers.
        for (let i = 0; i < this.instanceNum; i++) {
          var worker =  cluster.fork();
          mem.shmSet(worker.id,{type:this.port});


        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`WebSocket worker ${worker.process.pid} died`);
        });
      } else if(cluster.isWorker) {
        let my = mem.shmGet(cluster.worker.id);

        if (my.type === this.port) {

          this.httpserver = http.createServer(function(request, response) {
            response.end();
          });
          this.httpserver.listen(this.port, function() {
            _self.emit('startServer')
          });


          this.options.httpServer=this.httpserver
          this.wsServer = new WebSocketServer(this.options);


          this.wsServer.on('request', function(request) {
            _self.emit('request',request)

            var connection = request.accept(null,request.origin);
            _self.emit('connection',connection)

          });


          console.log(`WebSocket Server Worker ${process.pid} started for Port ${this.port}`);
        }

      }

    }




  }


}

module.exports=webSocketBuilder

