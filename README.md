# NeuCluster 
ExpressLess , Http And Other Protocols For MicroServices

this project run only on linux os

this project is an multi process server builder for backend and microservice's with below components :<br>
<b><br>
http builder with router and middleware<br>
scheduler Builder <br>
native http builder <br>
rpc server (websocket jsonrpc2.0) for inter microservice communication <br>
rpc client<br>
</b>


# run prject 

\# npm install<br>
\# npm start<br>

# Sample Code 

due to the fact that system is designed for microservices applications , included services and controller file structure .

<b>you can set services folder by below line code .</b>


// Loading Services Folder's Files , For using Service Class , Build It  Based On Sample Template ,<br>
// those will be  accessible By File Name in global space .<br>
require('./component/service_loader')(__dirname+"/services")<br>
<br>
let ControllerPath = __dirname+"/api_2030";<br>
<b>//Set Port and Controller Path Folder Name. and Cluster Instance Number<br></b>
var http_server = new httpBuilder(2030,ControllerPath,1);<br>
var x=0;<br><br>

//Use Middleware For Router Of Http Server<br>
http_server.getRouter().use(bodyParser.json());<br>
http_server.getRouter().use(compression())<br>
<b>//Run Http Server<br></b>
http_server.run();<br>
<br>
<br>
// Event hook in Pre Route . This Function will Run Before Process Of any middleware and route .<br>
// In This Sample xx variable Added To req , that is Accessible In Any Controller .<br>
<br>
http_server.on('pre_route', req=>{<br>
  req.xx={alpha:++x}<br>
})<br>



<b>// Job Scheduler<br></b>
var job = new sch(__dirname+"/jobs",['job1','job2']) // Set Job's Folder and File's<br>
job.run()<br>
<br>
<br>
<b>// Run second HttpServer with Port 2040 and related Controller Path<br></b>
ControllerPath = __dirname+"/api_2040";<br>
var httpServer2 = new httpBuilder(2040,ControllerPath,1);<br>
httpServer2.run()<br>
<br>
<br>
<br>
<b>// Native Nodejs HTTP Protocol Without Any Middleware and Router<br></b>
let nativeHTTP=new nativeHttp(2060,1);<br>
nativeHTTP.run()<br>
nativeHTTP.on('onRequest',(req,res)=>{<br>
<br>
  res.writeHead(200, {'Content-Type': 'application/json'});<br>
  var q = url.parse(req.url, true).query;<br>
<br>
  res.end(JSON.stringify({Value : q.value}));<br>
<br>
})
<br>
<br>
<b>// Initiate and Running RPC Server<br></b>
var rpc = new rpc_server(8080,__dirname+'/rpcFunctions',1)<br>
rpc.run()<br>