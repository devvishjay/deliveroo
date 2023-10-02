
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Dishes = sequelize.define("Dishes",{
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
        description:{
            type:Sequelize.TEXT,
            allowNull:false
        },    
        contains:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        calories:{
            type:Sequelize.STRING,
            allowNull:false
        }, 
        price:{
            type:Sequelize.FLOAT,
            allowNull:false
        },
        image:{
            type:Sequelize.STRING,
            allowNull:false
        },
        activeStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: true, 
          },
        quantityPerOrder:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        restaurantId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Restaurants",
                key: "id",
              },
        },
        catgeory:{
            type:Sequelize.STRING,
            allowNull:false,
            references: {
                model: "DisheCategories",
                key: "id",
              },
        },
});

Dishes.associate= function(models){
    Dishes.belongsTo(models.Restaurants, { foreignKey: "restaurantId" });
    Dishes.belongsTo(models.DishCategories, { foreignKey: "catgeory" });
    Dishes.hasMany(models.DishItems, { foreignKey: "dishId" });
};
return Dishes
};
