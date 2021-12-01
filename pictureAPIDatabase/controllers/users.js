var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const app = require('../app');
const application =express();
var axios= require('axios')

var config = require('../dbconfig')
const sql= require('mssql')

var apiData= [];
var watchList=[];
var count=0;
var counts=0

async function addImage(image){
  try{
      let pool = await sql.connect(config)
      let information= await pool.request()
      .input('url', sql.VarChar,image.data.message)
      .query('Insert into Image (url) values (@url)')
      return information.recordsets
  }
  catch(err){
      console.log(err)
  }
}

const getPic= (req,res)=>{
   for(let i=0; i<5;i++)
  {
  axios.get('https://dog.ceo/api/breeds/image/random')
    //Returns data responded by api
    .then((response)=>{
      let image= response
      //apiData.push({id:++count,message:response.data.message})
      addImage(image)
      //.then(result=>{
        console.log(response.data)
        res.write(response.data.message)
      res.send({message: "Fetched"})
    //  setTimeout((res.send({message: "Fetched"})),5000)
    
    })
    .catch((error)=>{
      res.send(error.data)

   })
  }
    
  }

  async function getImageID(reqId){
    try{
        let pool = await sql.connect(config)
        let information= await pool.request()
        .input('input_parameter',sql.Int,reqId)
        .query("Select * from Image where id= @input_parameter");
        return information.recordsets
    }
    catch(error){
        console.log(error)
    }
}

async function getImage(){
  try{
      let pool = await sql.connect(config)
      let information= await pool.request()
      .query("Select * from Image");
      return information.recordsets
  }
  catch(error){
      console.log(error)
  }
}

async function addToWatchlist(reqId){
  try{
      let pool = await sql.connect(config)
      let information= await pool.request()
      .input('id',sql.Int,reqId)
      .query('Insert into Watchlist Select * from Image where id=@id')
      // .query('Delete from Image where id=@id')
      return information.recordsets
  }
  catch(err){
      console.log(err)
  }
}


   

  module.exports= {getPic, apiData, getImageID, addToWatchlist,getImage};



