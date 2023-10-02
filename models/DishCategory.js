
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DishCategory = sequelize.define("DishCategories",{
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

});

DishCategory.associate= function(models){
};
return DishCategory
};
