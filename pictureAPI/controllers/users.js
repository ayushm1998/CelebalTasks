var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const app = require('../app');
const application =express();
var axios= require('axios')
var apiData= [];
var watchList=[];
var count=0;
var counts=0


const getPic= (req,res)=>{
  for(let i=0; i<5;i++)
  {
  axios.get('https://dog.ceo/api/breeds/image/random')
    //Returns data responded by api
    .then((response)=>{
      apiData.push({id:++count,message:response.data.message})
     // setTimeout((res.send({message: "Fetched"})),5000)
    })}
    setTimeout(()=>(console.log(apiData)),5000)
    }
    


  module.exports= {getPic, apiData};



