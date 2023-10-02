
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },  
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password:{
            type:Sequelize.STRING,
        }
});

Users.associate= function(models){
};
return Users
};
