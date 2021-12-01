const express= require('express')

const app= express();

const port = 3000;

require('./config/config');
app.get('/',(req,res)=>{
    res.send("Home Page")
})

var userController= require('./controllers/users')

app.get('/add',userController.addUser)
app.listen(port , ()=>{
    console.log(`App is running at ${port}`)
})

app.get('/crud',userController.crudOperations)