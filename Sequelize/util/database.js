const Sequelize = require("sequelize");

const sequelize = new Sequelize("sample","myserver","root",{
    dialect: "mssql",
    host: "localhost" 
})

module.exports=sequelize

