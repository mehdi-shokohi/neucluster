var Router = require('router')
var router=Router()
router.all('/', (req, res) => {
  // console.log(req)
  res.end("Hello - "+(req.body.value))

})

module.exports = router