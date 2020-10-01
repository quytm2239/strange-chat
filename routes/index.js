var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
})

router.post('/check-age', function(req, res) {
  let year = req.body.year
  if (year == null || year == undefined || year.length == 0) {
    return res.status(400).send({
      success: false,
      error: 'Year is not valid, Try again!\nYour age required to be 16-120 to use this app!'
    })
  }
  var a = parseInt(year)
  if (a == null) {
    return res.status(400).send({
      success: false,
      error: 'Year is not valid, Try again!\nYour age required to be 16-120 to use this app!'
    })
  }
  if (a < 1900 || a > 2004) {
    return res.status(400).send({
      success: false,
      error: 'Year is not valid, Try again!\nYour age required to be 16-120 to use this app!'
    })
  }
  return res.status(200).send({
    success: true,
    error: 'Yeah! Welcome to Stranger Group Chat'
  })
})

module.exports = router;
