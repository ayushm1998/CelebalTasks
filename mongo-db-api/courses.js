const express = require('express')
const mongoose= require('mongoose')

const courseModel= mongoose.model("Course")

const router = express.Router()

var course= new  courseModel()
course.courseName="Ayush Nodejs",
course.courseId= "2",
course.courseDuration="1",
course.courseFee= "100",
course.save()

router.get('/list',(req,res)=>{
    courseModel.find((err,docs)=>{
        if(!err)
        {
            console.log(docs)
            res.send("Course Controller") 
        }
        else
        {
            res.send("Error")
        }
    })
   
})


module.exports= router