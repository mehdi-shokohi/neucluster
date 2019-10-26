// handle `GET` requests to `/message`
var router = require('router')()


//RPC client initiate
var rpc_client = require("../component/rpcClient")
var client = new rpc_client("ws://localhost:8080")//create Nre connection To Rpc Server

router.all('/', async function (req, res) {
  let serv = new serv_one();
  serv.job_run()

//Rpc Client Call `sum` Function in Remote Server
 await client.call("sum",[10,30],total=>{
    console.log(total)
  })


  await client.call("sum",[2,30],total=>{
    console.log(total)
  })

//Rpc Client Call `openedNewsModule` Function in Notify Mode (no callback , no response - only run in server) to Remote Server
  await  client.notify("openedNewsModule",['Any things '])


  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end("hello World"+'\n' + req.xx.alpha)
})

module.exports = router