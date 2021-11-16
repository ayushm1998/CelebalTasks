//3rd party module needs to be installed
const express = require('express');

const app = express();

app.all("*",(req,res)=>{

    res.send('<h1>"Hey Express"</h1>')
});
app.listen(3000)
console.log("The server is listening 3000")