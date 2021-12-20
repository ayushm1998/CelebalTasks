var express = require('express');
var router = express.Router();
var fetch= require('node-fetch');
const cache =require('../cache.js')

router.get('/',cache(300),(req,res)=>{
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response=>response.json())
  .then(data=>res.send(data))
})

module.exports = router;
