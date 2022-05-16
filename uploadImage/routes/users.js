// var express = require('express');
// const { diskStorage } = require('multer');
// var router = express.Router();
// const path =  require ('path')
// //const apiImage = require('../controllers/users')
// var app=express();
// const multer= require("multer")
// var imageData=[];
// var count=0;
// var picsArray=[];
// var picName

// const storage = multer.diskStorage({destination:(req,file,cb)=>{
//   cb(null, 'controllers')
// },
// filename: (req,file,cb)=>{
//   picName=file.originalname
//   imageData.push({id:++count, name:picName })
//   //console.log(file)
//   console.log(imageData)
//   cb(null,file.originalname)
// }
// })

// const upload= multer({storage: storage})

// router.get("/",(req,res)=>{
//   res.render("index")
// })


// /**
//    * @swagger
//    * /users/:
//    *  post:
//    *      requestBody:
//    *          required: true
//    *          content:
//    *              multipart/form-data:
//    *                schema:
//    *                  type: object
//    *                  properties:
//    *                    file:
//    *                      type:   string
//    *                      format: binary                      
//    *      responses:
//    *          200:
//    *              description: Uploaded Successfully          
//    */



// router.post("/users",upload.single("file"),(req,res)=>
// {
//   //console.log(req.samplefile)
//   res.send("Image Uploaded")
//   // console.log(imageData[1].name)
// })



  

// //exports.imageData=imageData;
// module.exports ={ router, imageData};