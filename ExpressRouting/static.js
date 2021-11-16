const express =require('express');
const path= require('path')

const app = express()

//app.use(express.static('public'))

app.all('/',(req,res)=>{
res.sendFile(path.join(__dirname + '/sample.html'))
})

app.listen(3000)