// var sc =require('./component/ScheduleBuilder')
// var sch = new sc(__dirname+"/jobs",['job2','job1']);
// sch.runExec()
// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;
// let workers = [];
// if (cluster.isMaster) {
//   masterProcess();
// } else {
//   childProcess();
// }

// function masterProcess() {
//   console.log(`Master ${process.pid} is running`);
//
//   for (let i = 0; i < numCPUs; i++) {
//     console.log(`Forking process number ${i}...`);
//     cluster.fork();
//   }
//
//   process.exit();
// }
//
// function childProcess() {
//   console.log(`Worker ${process.pid} started and finished`);
//
//   process.exit();
// }
// function masterProcess() {
//   console.log(`Master ${process.pid} is running`);
//
//   // Fork workers
//   for (let i = 0; i < 2; i++) {
//     console.log(`Forking process number ${i}...`);
//
//     const worker = cluster.fork();
//     workers.push(worker);
//
//     // Listen for messages from worker
//     worker.on('message', function(message) {
//       console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
//     });
//   }
//
//   // Send message to the workers
//   workers.forEach(function(worker) {
//     console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
//     worker.send({ msg: `Message from master ${process.pid}` });
//   }, this);
// }
//
//
// function childProcess() {
//   console.log(`Worker ${process.pid} started`);
//
//   process.on('message', function(message) {
//     console.log(`Worker ${process.pid} recevies message '${JSON.stringify(message)}'`);
//   });
//
//   console.log(`Worker ${process.pid} sends message to master...`);
//   process.send({ msg: `Message from worker ${process.pid}` });
//
//   console.log(`Worker ${process.pid} finished`);
// }

const server = require('./component/serverBuilder')
const http = require('http')

class myCustomServer extends server{
  constructor (port,instance,option){
    super(port, instance)

  }


  serverInit(){
    this.server = http.createServer()
    this.server.listen(this.port)

    console.log(`My Custom Http Worker ${process.pid} started for Port ${this.port}`);
    this.server.on('request',(req,res)=>{
      this.emit('onRequest', req,res)
    })
  }

}


var launch = new myCustomServer(10010,2,null)
launch.run()

launch.on('onRequest',(req,res)=>{

  // console.log(req)
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify( req.headers))
  
})