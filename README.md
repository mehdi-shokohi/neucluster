## NeuCluster 

Router base Http ,WebSocket ,RPC and  Other Protocols Server Builder by Node.js


this project run only on linux os

*this project is an multi process server builder for backend and microservice's with below components :*



**http builder with router and middleware**

**scheduler Builder**

**native http builder**

**rpc server (websocket jsonrpc2.0) for inter microservice communication**

**rpc client**

**WebSocket Server Builder**



### Run Project 


\# npm install

\# npm start

## Sample Code 

*due to the fact that system is designed for microservices applications , included services and controller file structure .*

**you can set services folder by below line code .**


*Loading Services Folder's Files , For using Service Class , Build It  Based On Sample Template ,
those will be  accessible By File Name in global space .*
```js
require('./component/service_loader')(__dirname+"/services")
```
**Router Base HTTP Server**
```js
let ControllerPath = __dirname+"/api_2030";
//Set Port and Controller Path Folder Name. and Cluster Instance Number
var http_server = new httpBuilder(2030,ControllerPath,1);
var x=0;
````
*Use Middleware For Router Of Http Server*
```js
http_server.getRouter().use(bodyParser.json());
http_server.getRouter().use(compression())
//Run Http Server
http_server.run();
```
*Event hook in Pre Route . This Function will Run Before Process Of any middleware and route .
 In This Sample xx variable Added To req , that is Accessible In Any Controller .*
```js
http_server.on('pre_route', req=>{
  req.xx={alpha:++x}
})
```



**Job Scheduler**
```js
var job = new sch(__dirname+"/jobs",['job1','job2']) // Set Job's Folder and File's
job.run();
```

*Run second HttpServer with Port 2040 and related Controller Path*
```js
ControllerPath = __dirname+"/api_2040";
var httpServer2 = new httpBuilder(2040,ControllerPath,1);
httpServer2.run()
```
**Native Nodejs HTTP Protocol Without Any Middleware and Router**
```js
let nativeHTTP=new nativeHttp(2060,1);
nativeHTTP.run()
nativeHTTP.on('onRequest',(req,res)=>{

  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true).query;

  res.end(JSON.stringify({Value : q.value}));

})
````


**Initiate and Running RPC Server**
```js
var rpc = new rpc_server(8080,__dirname+'/rpcFunctions',1)
rpc.run()
```


**initiate WebSocket Server .**
```js
var ws = new websocket(3000,null,3)
ws.run();
ws.on('startServer',()=>{
  console.log("WebSocket Server  Started .")
})

ws.on('request',(req)=>{
//req.reject()  if (your logic.)
})

```



**Job Scheduler**
```js
var job = new sch(__dirname+"/jobs",['job1','job2']) // Set Job's Folder and File's
job.run();
```

*Run second HttpServer with Port 2040 and related Controller Path*
```js
ControllerPath = __dirname+"/api_2040";
var httpServer2 = new httpBuilder(2040,ControllerPath,1);
httpServer2.run()
```
**Native Nodejs HTTP Protocol Without Any Middleware and Router**
```js
let nativeHTTP=new nativeHttp(2060,1);
nativeHTTP.run()
nativeHTTP.on('onRequest',(req,res)=>{

  res.writeHead(200, {'Content-Type': 'application/json'});
  var q = url.parse(req.url, true).query;

  res.end(JSON.stringify({Value : q.value}));

})
````


**Initiate and Running RPC Server**
```js
var rpc = new rpc_server(8080,__dirname+'/rpcFunctions',1)
rpc.run()
```


**initiate WebSocket Server .**
```js
var ws = new websocket(3000,null,3)
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
```

*Web Socket Client*

```html
<script>
    var wsServer = 'ws://127.0.0.1:3000';
    
    var websocket = new WebSocket(wsServer); 
    websocket.onopen = function (evt) { 
        console.log("Connected to WebSocket server.");
    }; 
    
    websocket.onclose = function (evt) { 
        console.log("Disconnected"); 
    }; 
    
    websocket.onmessage = function (evt) { 
        console.log( evt.data); 
    
    }; 
    
    websocket.onerror = function (evt, e) {
        console.log('Error occured: ' + evt.data);
    };
    </script> 
```