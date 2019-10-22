var server=require("./component/HttpGenerator")
var compression  = require('compression')
var bodyParser   = require('body-parser')

// Loading Services Folder's Files , For using Service Class , Build It  Based On Sample Template ,
// those will be  accessible By File Name.
require('./component/service_loader')(__dirname+"/services")

let ControllerPath = __dirname+"/api";
var httpServer = new server(2030,ControllerPath,3);//Set Port and Controller Path Folder Name. and Cluster Instance Number
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