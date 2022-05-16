const mongoose = require('mongoose')

var CourseSchema=   new mongoose.Schema({
    courseName : {
        type: String,
        required:"Required"
    },
    courseId:{
        type: String,
        required: "Required"
    },
    courseDuration:{
        type: String,
        required: "Required"
    },
    courseFee:{
        type: String,
        required: "Required"
    }
})

mongoose.model ("Course", CourseSchema)
