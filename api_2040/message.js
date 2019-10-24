// handle `GET` requests to `/message`
var Router = require('router')
var router=Router()
router.all('/', function (req, res) {
  let serv = new serv_one();
  serv.job_run()

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end("hello World From 2040")
})

module.exports = router