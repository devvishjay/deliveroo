
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers",{
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

Customers.associate= function(models){
};
return Customers
};
