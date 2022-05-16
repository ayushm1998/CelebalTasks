const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test',(err)=>{
    if(!err)
    {
        console.log('Success connected')
    }
    else{
            
    console.log("Err",err)
    }
})


const Course= require('./course.models')