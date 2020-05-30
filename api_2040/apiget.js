var router = require('router')()
router.all('/',  (req, res) => {
  console.log(req.body)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin' , '*')
  res.end(JSON.stringify(req.body))

})

module.exports = router