const connection = require('./models')
const express=require('express')
const app= express()
const path= require('path')
const {engine}= require('express-handlebars')
const bodyParser= require('body-parser')

const courseController= require('./courses')


app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('views',path.join(__dirname,"/views/")) 

app.engine("hbs",engine({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir:__dirname + "/views/layouts"

}))

app.set("view engine","hbs")

app.get('/',(req,res)=>{
   // res.send('<h1>Hello World</h1>')
    res.render("index",{})
})

app.use('/course',courseController)

app.listen('3000',()=>{
    console.log('Server Started')
})
