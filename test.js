// if(typeof process.family === 'undefined') console.log('ok')
// process.prototype={name :"salam"}
// console.log(process.pid)
// console.log(process.prototype.name)

// const NodeCache = require( "node-cache" );
// const myCache = new NodeCache( );
//
// myCache.set( `${process.pid}`, {type:'http'} );
// let my = myCache.get(process.pid)
// console.log(my.ty)

//
// var memShm = require('mem-shm');
//
// var mem = new memShm("mmicro","workers");
//
// var memoryId = "test";
// var key = "test";
// var val = 1;
// for (let i=0;i<10;i++)
// mem.set(memoryId,i,{tId:i*2});
//
// var tmp = mem.get(memoryId,2);
// console.log(tmp);


var http = require('http');
var url = require('url');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var q = url.parse(req.url, true).query;
//   console.log(req.url)
//   console.log(q)
//     var re=req.url.match('[\\/]([^?\\/?]+)|([\\/]\\?\\w+)')
//   console.log(re)
//   if(re[1]==='mehdi')
//   var txt = q.year + " " + q.month;
// let f=re[1];
//   res.end(mehdi());
// }).listen(8080);
//
//
// function mehdi () {
//   return "Helllllllllllo"
// }

let db = {}
let path = require('path')
console.log(path.normalize(__dirname + '/./models/relations.js')=== path.join(__dirname,'models/relations.js'))