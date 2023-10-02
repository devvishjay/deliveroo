
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DishItems = sequelize.define("DishItems",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        itemType:{
            type:Sequelize.INTEGER,
            default: 0 // 0: basic, 1: Drink, 2: Dessert 3: First Base 4: Second Base 5: Third Base 6: Protein 7: Snack 
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        contains:{
            type:Sequelize.TEXT,
            allowNull:false,
        },    
        price:{
            type:Sequelize.FLOAT,
            allowNull:false
        },
        calorie:{
            type:Sequelize.FLOAT,
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
        dishId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Dishes",
                key: "id",
              },
        },
});

DishItems.associate= function(models){
    DishItems.belongsTo(models.Dishes, { foreignKey: "dishId" });
};
return DishItems
};
