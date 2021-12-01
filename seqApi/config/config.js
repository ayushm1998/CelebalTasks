const {Sequelize, DataTypes}= require('sequelize')
const  sequelize= new Sequelize('sample', 'myserver', 'root',{
    host:'localhost',
    dialect: 'mssql',
    pool:{max:5,min:0,idle:10000}
})

sequelize.authenticate()
.then(()=>{
    console.log("Connected")

})
.catch(err=>{
    console.log("Error"+err)
})

const db={};

db.Sequelize= Sequelize
db.sequelize= sequelize
 
db.sequelize.sync()
.then(()=>{
console.log("Yes Re-sync")
})

db.users= require('../model/users')(sequelize,DataTypes)    
module.exports=db;