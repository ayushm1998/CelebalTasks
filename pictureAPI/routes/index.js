var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  fs.readFile('watchlist.txt','utf-8',function (data, err) {
    if (err) return console.log(err);
    console.log(data);
  })

  res.render('index', { title: 'Express' });
});



module.exports = router;
