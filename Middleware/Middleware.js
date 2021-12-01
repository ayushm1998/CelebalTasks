const express= require('express');

const app=express();

function validateUser(req,res,next)
{
    res.locals.validated=true;
    console.log("Validated Ran")
    //next will take to another middleware function if not mentioned it will end execution
    next();
}
//All paths all methods
app.use(validateUser)
//admin path all methods
app.use('/admin', validateUser)
// on / path get method only
app.get('/',validateUser)

app.get('/',(req,res,next)=>{
    res.send("<h1>Middleware Main Page</h1>")})

app.get('/admin',(req,res,next)=>{
res.send("<h1>Middleware  Admin Page</h1>")
})

app.listen(3000)