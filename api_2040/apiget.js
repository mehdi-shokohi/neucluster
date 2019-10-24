var router = require('router')()
router.all('/', (req, res) => {
  // console.log(req)
  res.end("Hello - "+(req.body.value))

})

module.exports = router