module.exports= (sequelize, DataTypes)=>{
    const Tutor= sequelize.define("tutor",{
        tutid:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING
        },
            courseid:{
                type:DataTypes.INTEGER
            }
                })

                return Tutor;
                
}