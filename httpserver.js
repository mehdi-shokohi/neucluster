var httpBuilder=require("./component/HttpBuilder")
var sch = require("./component/ScheduleBuilder")
var nativeHttp = require("./component/nativeHTTPBuilder")
var rpc_server = require("./component/rpcServer")
var rpc_client = require("./component/rpcClient")
var client = new rpc_client("ws://localhost:8080")
// Optional MiddleWares
var compression  = require('compression')
var bodyParser   = require('body-parser')
var url = require('url')




// Loading Services Folder's Files , For using Service Class , Build It  Based On Sample Template ,
// those will be  accessible By File Name.
require('./component/service_loader')(__dirname+"/services")

let ControllerPath = __dirname+"/api_2030";
var httpServer = new httpBuilder(2030,ControllerPath,1);//Set Port and Controller Path Folder Name. and Cluster Instance Number
var x=0;

//Use Middleware For Router Of Http Server
httpServer.getRouter().use(bodyParser.json());
httpServer.getRouter().use(compression())
//Run Server
httpServer.run();


// Event hook in Pre Route . This Function will Run Before Process Of any middleware and route .
// In This Sample xx variable Added To req , that is Accessible In Any Controller .

httpServer.on('pre_route',req=>{
  req.xx={alpha:++x}
})



// Job Scheduler
var job = new sch(__dirname+"/jobs",['job1','job2']) // Set Job's Folder and File's
job.run()


// Run second HttpServer with Port 2040 and related Controller Path
ControllerPath = __dirname+"/api_2040";
var httpServer2 = new httpBuilder(2040,ControllerPath,1);
httpServer2.run()



// Native Nodejs HTTP Protocol Without Any Middleware and Router
let nativeHTTP=new nativeHttp(2060,1);
nativeHTTP.run()
nativeHTTP.on('onRequest',(req,res)=>{

  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true).query;

  res.end(JSON.stringify({Value : q.value}));

})


// Initiate and Running RPC Server
var rpc = new rpc_server(8080,__dirname+'/rpcFunctions',1)
rpc.run()

//Rpc Client Sample  : call api_2030/message => http://localhost:2030/message


