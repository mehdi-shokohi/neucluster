module.exports=(server)=>{
//Register Function For Remote Client
  server.register('sum',params=>{
    return Number(params[0])+Number(params[1])
  })


  server.register('openedNewsModule',  (u)=>{
    console.log("Notify From Client ." , u[0])
  })

//On new Client Connection To this RPC Server
  server.on('connection',(sock,mess)=>{
    console.log(mess.rawHeaders)
  })
}