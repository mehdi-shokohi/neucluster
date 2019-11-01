// handle `GET` requests to `/message`
var router = require('router')()

router.all('/', function (req, res) {
  let serv = new serv_one();
  serv.job_run()

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(JSON.stringify(driver))

})

module.exports = router