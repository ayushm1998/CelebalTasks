const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sample", "myserver", "root123", {
  host: "localhost",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// sequelize.authenticate()
// .then(()=>{
//     console.log("Connected")

// })
// .catch(err=>{
//     console.log("Error"+err)
// })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, DataTypes);

db.tutor = require("./tutors")(sequelize, DataTypes);

db.tutorials.hasMany(db.tutor, { foreignKey: "courseid" });

module.exports = db;
