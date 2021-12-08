const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const app = require('../app');
const fs = require('fs')
const application =express();
var path=require('path');
var uuid= require('uuid')
var bcrypt= require('bcrypt')
var jwt= require('jsonwebtoken')
var axios = require('axios')

const db = require("../config/config");
const Op = db.Sequelize.Op;
const Notes= db.notes;

const users= []
 
var createNote= async (req,res)=>{

    if(req.body.name)
    {
        var data =req.body;
    await fs.appendFile(`notes/${data.name}`, `${data.note}`+"/n", function (err) {

        var notes={
            UId: uuid.v1(),
            name:data.name,
            path: `notes/${data.name}`
        }
         
        Notes.create(notes)
        .then(notedata=>{
    res.status(201).json(notedata)
    })
     }) }
else{
    res.status(400).send({
        message: "Contents cannot be empty!"
    })
}

}


 var getAllNotes= async(req,res)=>{

        Notes.findAll({
            attributes: ['name', 'UId']})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })

 }

var getNotesByName = async (req,res)=>
{
    var name=req.params.id
    fs.readFile(`notes/${name}`, 'utf8', function(err, data){
        res.status(201).send(data)
})
}


var getNotesByUId = async (req,res)=>
{
    var Id=req.params.id
    var path =await Notes.findAll({ raw: true,where:{UId:Id},attributes:['path']})
    fs.readFile(`${path[0].path}`, 'utf8', function(err, data){
        res.status(201).json(data)
})
}

var updateNotes=async (req,res)=>{
   
    var data =req.body;
    var fname=req.params.id
    var path =await Notes.findAll({ raw: true,where:{name:fname},attributes:['path','updateCount']})
      //console.log(`${path[0].path}`)
    fs.stat(`${path[0].path}`, function(err, stat) {
       
        if(err == null) {
            console.log('File exists');
            fs.appendFile(`${path[0].path}`, `${data}`+"\n", function (err) {
              //  console.log(typeof(`${path[0].updateCount}`))
                Notes.update({updateCount: parseInt(`${path[0].updateCount}`)+1},{
                    where: {name:fname}
                 })
                res.status(201).json("Updated Successfully")

                }) 
        } 
        else if (err.code === 'ENOENT'){
            res.status(400).send({
                message: "File not found"
            })}
        
      }); 


}

var renewNotes=async (req,res)=>{
    var data =req.body;
    var fname=req.params.id
    var path =await Notes.findAll({ raw: true,where:{name:fname},attributes:['path','updateCount']})
      //console.log(`${path[0].path}`)
    fs.stat(`${path[0].path}`, function(err, stat) {
       
        if(err == null) {
            console.log('File exists');
            fs.writeFile(`${path[0].path}`, `${data}`+"\n", function (err) {
              //  console.log(typeof(`${path[0].updateCount}`))
                Notes.update({updateCount: parseInt(`${path[0].updateCount}`)+1},{
                    where: {name:fname}
                 })
                res.status(201).json("Updated Successfully")

                }) 
        } 
        else if (err.code === 'ENOENT'){
            res.status(400).send({
                message: "File not found"
            })}
        
      }); 


}

var  deleteNotes=async  (req,res)=>
{
    var fname=req.params.id
    var path =await Notes.findAll({ raw: true,where:{name:fname},attributes:['path']})
    fs.stat(`${path[0].path}`, function(err, stat) {
    var data =req.body;
        if(err == null) {
            console.log('File exists');
            fs.unlink(`${path[0].path}`,function(err){
                Notes.destroy({where:{ name:fname}})
                res.status(201).send("File Deleted Succesfully")
           });  
        } 
        else if (err.code === 'ENOENT'){
            res.status(400).send({
                message: "File doesn't exist"
            })}
        
      })
    }

var user = async(req,res)=>{
        try{
            const hashedPassword= await bcrypt.hash(req.body.password,10)
            const user= {name: req.body.name, password: hashedPassword}
            users.push(user)
            console.log(users)
            res.status(201).send()
            }catch{res.status(500).send()
 
            }
        }
    

var login= (req,res)=>{
       // Mock User
        const user ={
            id:1,
            username:'ayush',
            email:'amehta@email.com'
        }
        jwt.sign({user},'secretkey', {expiresIn: '30s'}, (err, token)=>{
            res.json({
                token 
            })
         })
                }



 var loginjwt= async(req,res)=>{
              

                jwt.verify(req.token,'secretkey',(err,authData)=>{
                    if(err){
                        res.sendStatus(403)
                    }
                    else{ 
                        res.json({
                            message: 'Post Created',
                            authData 
                        
                        })
                    }
                })
            }

    function verifyToken (req,res,next){
        

        const  bearerHeader = req.headers['authorization'] 
        if(typeof bearerHeader !=='undefined')
    {
        const bearer= bearerHeader.split(' ')
        const bearerToken= bearer[1];
        req.token= bearerToken;
        next();
    }
    else{
        res.sendStatus(403)

    }

    } 

module.exports={createNote,getNotesByName, updateNotes,deleteNotes,getAllNotes, getNotesByUId, login, user,loginjwt, renewNotes, verifyToken}