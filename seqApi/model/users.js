module.exports= (sequelize,DataTypes)=>{
    const Users= sequelize.define('users',{
        name: DataTypes.STRING,
        email:{
            type: DataTypes.STRING,
            default:"test@gmail.com"
        },
        gender:DataTypes.STRING

    })
    return Users;
}
