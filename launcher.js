var httpBuilder=require("./component/HttpBuilder")
var sch = require("./component/ScheduleBuilder")
var nativeHttp = require("./component/nativeHTTPBuilder")
var rpc_server = require("./component/rpcServer")
var websocket = require("./component/webSocketBuilder")
// Optional MiddleWares
var compression  = require('compression')
var bodyParser   = require('body-parser')
var url = require('url')
var fs = require('fs')
var path = require('path')




// Loading Services Folder's Files , For using Service Class , Build It  Based On Sample Template ,
// those will be  accessible By File Name.
require('./component/service_loader')(__dirname+"/services")

let ControllerPath = __dirname+"/api_2030";
var http_server = new httpBuilder(2030,null,ControllerPath,1);//Set Port and Controller Path Folder Name. and Cluster Instance Number
var x=0;

//Use Middleware For Router Of Http Server
http_server.getRouter().use(bodyParser.json());
http_server.getRouter().use(compression())
//Run Server
http_server.run();


// Event hook in Pre Route . This Function will Run Before Process Of any middleware and route .
// In This Sample xx variable Added To req , that is Accessible In Any Controller .

http_server.on('pre_route', req=>{
  req.xx={alpha:++x}
})



// Job Scheduler
// var job = new sch(__dirname+"/jobs",['job1','job2']) // Set Job's Folder and File's
// job.run()


// Run second HttpServer with Port 2040 and related Controller Path
ControllerPath = __dirname+"/api_2040";

let key = path.join(__dirname, 'server.key');
let cert = path.join(__dirname, 'server.crt');
var options = {
  key: fs.readFileSync(key),
  cert: fs.readFileSync(cert),
  requestCert: false,
  rejectUnauthorized: false,
  ciphers: [
    "ECDHE-RSA-AES256-SHA384",
    "DHE-RSA-AES256-SHA384",
    "ECDHE-RSA-AES256-SHA256",
    "DHE-RSA-AES256-SHA256",
    "ECDHE-RSA-AES128-SHA256",
    "DHE-RSA-AES128-SHA256",
    "HIGH",
    "!aNULL",
    "!eNULL",
    "!EXPORT",
    "!DES",
    "!RC4",
    "!MD5",
    "!PSK",
    "!SRP",
    "!CAMELLIA"
  ].join(':'),
  honorCipherOrder: true
};
var httpServer2 = new httpBuilder(2040,options,ControllerPath,1);
httpServer2.run()



// Native Nodejs HTTP Protocol Without Any Middleware and Router
let nativeHTTP=new nativeHttp(2060,options,1);
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

// initiate WebSocket Server .
var ws = new websocket(3000,options,2)
ws.run();

ws.on('startServer',()=>{
  console.log("WebSocket Server  Started .")
})

ws.on('request',(req)=>{
//req.reject()  if (your logic.)
})

ws.on('connection',(connection)=>{
  console.log(`Client ${connection.remoteAddress} Connected.`)

  connection.on('message', function(message) {

      console.log('Client Message is ' + message.utf8Data);
      connection.sendUTF(`Your Message Is ${message.utf8Data} . Thanx For Message`);


  });

  connection.on('close', function(closeCode, data) {
    console.log(connection.remoteAddress + ' disconnected.');
  });
})