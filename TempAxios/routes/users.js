var express = require('express');
var router = express.Router();

var axios= require('axios')
var apiData= [];
var watchList=[];


const getPic= (req,res)=>{
  axios.get('https://dog.ceo/api/breeds/image/random')
    //Returns data responded by api
    .then((response)=>{
      res.send({id:++count,message:response.data.message})
     // setTimeout((res.send({message: "Fetched"})),5000)
    })}

module.exports = {router,getPic};
