module.exports=(server)=>{


  server.register('minus',params=>{
    return params[0]-params[1]
  })

}