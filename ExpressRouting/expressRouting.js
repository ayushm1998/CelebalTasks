const express = require('express');

const app= express();


app.get('/',(req,res)=>{

    res.send("<h1>Hello get  request</h1>")
})

app.post('/',(req,res)=>{

    res.send("<h1>Hello post </h1>")
})


app.listen(5500)