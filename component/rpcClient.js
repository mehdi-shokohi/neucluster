
var Client=require("jsonrpc-websocket-client").default
class rpcClient{
constructor (address) {
  this.client = new Client(address)
  
}


 async call(func,params,cb){
   if(this.client.status!=='open'){
    await this.client.open()
     }
     let resp=await this.client.call(func, params)
  cb(resp)
 }

  async notify(notifyMethod,params){
    // console.log(this.client.status)
    if(this.client.status!=='open'){
      await this.client.open()
    }
    await this.client.notify(notifyMethod,params)

  }
  
async closeClient(){
    await this.client.close()
}



}

module.exports=rpcClient