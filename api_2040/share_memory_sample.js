var router = require('router')()
var mem = require('../tools').shmem
router.all('/', function (req, res) {

  let count =mem.shmGet('text')
  if(count){
    count= mem.shmGet('text').Count===null?0:mem.shmGet('text').Count

  }else{
    count=0
  }

  mem.shmSet("text",{Count:Number(count) +1,type:"Beta"})
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({data :"Share Memory Sample For Cluster Mode .",memory:mem.shmGet('text')}))
})

module.exports = router